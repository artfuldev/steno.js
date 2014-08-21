/*
    steno.js - A javascript library to write shorthand HTML 
    Copyright (C) 2014  Kenshin The Battōsai (Sudarsan Balaji)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/agpl-3.0.html>.

    */


(function (window) {

    //'use strict';

    // Required variables
    var steno = {},

        // Shorts
        objProto = Object.prototype,
        hasOwn = objProto.hasOwnProperty,

        // For IE, to prevent Invalid Calling Object error on toString.call(obj)
        toString = objProto.toString,

        // Shorts
        isNan = isNaN,
        rX = RegExp,
        math = Math,
        getInt = parseInt,

        // String Literals
        strString = 'string',
        strBoolean = 'boolean',
        strNull = 'null',
        strOr = '|',
        strUndefined = 'undefined',
        strNullOrUndefined = strNull+strOr+strUndefined,
        strEmpty = '',
        strDiv = 'div',
        strClass = 'class',
        strObject = 'object',
        strArray = 'array',
        strPlainObject = 'plain object',
        strNumber = 'number',
        strSpace = ' ',
        strGt = '>',
        strFunction = 'function',

        // Regexes
        // RegEx-es thanks to http://regexpal.com/
        // And RegEx Magic http://www.regexmagic.com/

        // Capture Groups:
        // 1        2           3       4                   5       6   7       8           9       10
        // Match    Operator    Closing ClosingMuliplier    Name    Id  Classes Attributes  Content Multiplier
        rxElement = /(( |\+|\^|>|\()|(\))(?:\*(\d+))?|([a-z0-9_]+)?(?:#([a-z-_]+))?((?:\.[a-z-_]+)*)((?:\[(?:[a-z-_]+(?:="(?:\\.|[^\n\r"\\])*")?[\t ]?)+\])*)(?:\{((?:\\.|[^\n\r\\}])*)\})?(?:\*(\d+))?)/g,

        // Capture Group: ClassName
        rxClasses = /\.([a-z-_]+)/g,

        // Capture Groups: Name, Value
        rxAttributes = /([a-z-_]+)(?:="((?:\\.|[^\n\r"\\])*)")?/g,
        rxTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Empty Steno Element
        emptyStenoElement = {
            parent: null,
            name: strEmpty,
            attributes: {},
            children: [],
            text: strEmpty,
            multiplier: 1
        };

    // Core functions start with steno

    // Returns the classes found in a classes steno string partial as an array
    // Input-Output sample '.menu.dropdown' : ['menu','dropdown']
    function stenoClasses(string) {

        // Return Matches
        var regEx = new rX(rxClasses),
            matches = [],
            match;
        while (match = regEx.exec(string)) {
            matches.push(match[1]);
        }
        return matches.join(strSpace);
    };

    // Returns attributes found in an attributes steno string partial as an object with key value pairs
    function stenoAttributes(string) {

        // Return Matches
        var regEx = new rX(rxAttributes),
            matches = {},
            match;
        while (match = regEx.exec(string)) {
            matches[match[1]] = match[2];
        }

        // Convert all non matches to empty strings
        invalidToValue(matches, strEmpty);

        return matches;
    };

    // Returns an element from a steno string of a single html element
    function stenoElement(string, pure) {

        // Returns pure {name:'', attributes{}} object if true
        // Otherwise returns an extended one
        if (is(strNullOrUndefined, pure)) {
            pure = false;
        }

        // Match RegEx to retrieve element
        var regEx = new rX(rxElement),
            // Find only first match - FOR NOW
            match = regEx.exec(string),
            zClasses,
            zAttributes,
            multiplier;

        // Convert all non matches to empty strings
        invalidToValue(match, strEmpty);

        // If no element name is found, it should be div
        if (match[5] === strEmpty)
            match[5] = strDiv;

        // Get Classes
        zClasses = stenoClasses(match[7]);

        // Get Attributes
        zAttributes = stenoAttributes(match[8]);

        // Make id as an attribute, id specified takes precedence over that in attributes tag
        if (match[6])
            zAttributes.id = match[6];

        // If zClasses is non-empty, make class as an attribute and add classes. Duplicates not removed.
        if (zClasses) {
            if (!zAttributes[strClass]) {
                zAttributes[strClass] = zClasses;
            } else {
                zAttributes[strClass] = zClasses + strSpace + zAttributes[strClass];
            }
        }
        
        // Multiplier
        multiplier = match[10];
        if (!multiplier) {
            multiplier = 1;
        } else {
            multiplier = getInt(multiplier);
            if (isNan(multiplier))
                multiplier = 1;
        }

        // Build and return the element, now that the name and attributes are done
        if (!pure)
            return extend(true, {}, emptyStenoElement, {
                name: match[5],
                attributes: zAttributes,
                text: match[9],
                multiplier: multiplier
            });
        return {
            name: match[5],
            attributes: zAttributes,
            text: match[9],
            multiplier: multiplier
        };
    };

    // Returns a custom dom object from a steno string of a html dom
    function stenoDom(string) {

        // Initialize
        var i,
            dom,
            match,
            element,
            parent,
            multiplier,
            temp,
            regEx = new rX(rxElement),
            matches = [];

        // Retreive Elements and Operators
        while (match = regEx.exec(string)) {

            // Convert all non matches to empty strings
            invalidToValue(match, strEmpty);

            // If match cycle has ended, break the loop
            // Have to do it this way for IE
            if (match[0] === strEmpty)
                break;

            // Retreive matches
            matches.push(match);
        }

        // If you came this far, create first element and add to dom
        dom = extend(true, {}, emptyStenoElement);
        element = stenoAdd(dom);

        // Loop through matches
        // Don't use for..in loop
        // because we need to be able to manipulate the i
        for (i = 0; i < matches.length; i++) {
            var current = matches[i][1];
            switch (current.charAt(0)) {

                // Descend, Group
            case strSpace:
            case strGt:
            case '(':
                element = stenoAdd(element);
                break;

            // Add
            case '+':
                if (is(strNullOrUndefined, element.parent))
                    element.parent = extend(true, {}, emptyStenoElement);
                element = stenoAdd(element.parent);
                break;

            // Ascend
            case '^':
                parent = element.parent || element;
                element = stenoAdd(parent.parent || parent);
                break;

            // Close Group
            case ')':

                // Climb up till the element's parent has no name
                parent = element.parent;
                while (parent.name !== strEmpty) {
                    temp = element.parent;
                    parent = temp.parent;
                }

                // Set multiplier
                multiplier = matches[i][4];
                if (!multiplier) {
                    multiplier = 1;
                } else {
                    multiplier = getInt(multiplier);
                    if (isNan(multiplier))
                        multiplier = 1;
                }
                parent.multiplier = multiplier;
                element = parent || temp || element;
                break;

            // The element should be extended
            // This allows for chaining ascends, etc
            default:
                extend(element, stenoElement(current, true));
            }
        }

        // Return element if dom is just an empty holder,
        // otherwise return dom
        if (dom.name === strEmpty && dom.children.length === 1) {
            dom = dom.children[0];
            dom.parent = null;
        }

        return stenoRedo(dom);
    };

    // Restructures a dom so that the parent is returned
    function stenoRedo(dom) {

        var temp = dom,
            parent = temp.parent;
        while (parent != null) {
            temp = parent;
            parent = temp.parent;
        }
        return temp;
    };

    // Adds a child to a $Z dom element
    function stenoAdd(element, child) {

        // Add empty child if not provided
        if (is(strNullOrUndefined, child)) {
            child = extend(true, {}, emptyStenoElement);
        }

        // Add child-parent links
        child.parent = element;
        element.children.push(child);

        return child;
    };

    // Returns the html of a $Z dom element
    function stenoHtml(dom) {

        if (is(strString, dom))
            return stenoHtml(stenoDom(dom));

        // Variables
        var i,
            prefix = strEmpty,
            inner = strEmpty,
            suffix = strEmpty,
            name = dom.name,
            attributes = dom.attributes,
            multiplier = dom.multiplier,
            text = dom.text,
            children = dom.children,
            html = strEmpty;

        // Form html
        // If name is available, add dom html
        if (name) {
            prefix += '<' + name;
            for (i in attributes) {
                prefix += strSpace + i + '="' + attributes[i] + '"';
            }
            prefix += strGt;
            suffix = '</' + name + strGt + suffix;
        }
        // Add contents if children are not present, else add children
        inner += text;
        for (i in children) {
            inner += stenoHtml(children[i]);
        }

        // Multiplier
        for (i = 0; i < multiplier; i++) {
            html += prefix + inner + suffix;
        }

        // Return string
        return html;
    };

    // Check if Object Has Key
    function has(key, obj) {
        return hasOwn.call(obj, key);
    };

    // Safe object type checking
    function is(type, obj) {
        var types = type.toString().split(strOr),
            match = false;
        for (var i in types) {
            if (types[i] === strPlainObject) {

                // Not plain objects
                // - Any object or value whose internal [[Class]] property is not "[object Object]"
                // - DOM nodes
                // - window
                if (objectType(obj)!==strObject || obj.nodeType || obj===obj.window) {
                    continue;
                }
                if (obj.constructor &&
                        !has('isPrototypeOf',obj.constructor.prototype)) {
                    continue;
                }

                // If the function hasn't returned already, we're confident that
                // |obj| is a plain object, created by {} or constructed with new Object
                match = true;
                break;
            } else if (objectType(obj) === types[i]) {
                match = true;
                break;
            }
        }
        return match;
    };

    // Object Type
    function objectType(obj) {
        if (typeof obj === strUndefined) {
            return strUndefined;
        }

        // Consider: typeof null === object
        if (obj === null) {
            return strNull;
        }

        var match = toString.call(obj).match(/^\[object\s(.*)\]$/),
            type = match && match[1] || strEmpty;

        switch (type) {
            case "Number":
                if (isNan(obj)) {
                    return "nan";
                }
                return strNumber;
            case "String":
            case "Boolean":
            case "Array":
            case "Date":
            case "RegExp":
            case "Function":
                return type.toLowerCase();
        }
        if (typeof obj === strObject) {
            return strObject;
        }
        return undefined;
    };

    // Trim
    function trim(text) {
        if (is(strNullOrUndefined, text))
            return strEmpty;
        return text.toString().replace(rxTrim, strEmpty);
    };

    // Invlaid to Value (Nullify to Value)
    function invalidToValue(obj, value) {
        if (!is(strObject+strOr+strArray, obj))
            return obj;
        for (var i in obj)
            if (is(strNullOrUndefined, obj[i]))
                obj[i] = value;
        return obj;
    };

    // Random
    function random(array) {
        return array[math.floor(math.random() * array.length)];
    };

    // Extend
    function extend() {
        var extension,
            key,
            src,
            copy,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle deep copy
        if (is(strBoolean, target)) {
            deep = target;

            // Move on to next argument
            target = arguments[i++] || {};
        }

        // If target is not a primitive, create empty object
        if (typeof target !== strObject && !is(strFunction, target)) {
            target = {};
        }

        // Maybe introduce at a later date?
        // Extend zQuery when only one argument is passed
        //if (i === length) {
        //    target = this;
        //    i--;
        //}

        // Iterate for all arguments
        for (; i < length; i++) {
            extension = arguments[i];

            // Weed out null and undefined arguments
            if (extension != null) {

                // Extend the target
                for (key in extension) {
                    src = target[key];
                    copy = extension[key];

                    // Prevent recursive references from creating an infinite loop
                    if (copy === target) {
                        continue;
                    }

                    // Recurse for objects and arrays
                    if (deep && copy && (is(strPlainObject+strOr+strArray, copy))) {

                        // If array, create array, else create empty object
                        if (is(strArray, copy))
                            clone = src && is(strArray, src) ? src : [];
                        else
                            clone = src && (is(strPlainObject, src)) ? src : {};

                        // Clone objects
                        target[key] = extend(deep, clone, copy);

                        // If primitive or shallow copy,
                        // Set value unless undefined (preserve nulls)
                    } else if (copy !== undefined) {
                        target[key] = copy;
                    }
                }
            }
        }

        // Return the extended object
        return target;
    };

    // Add stuff to zQuery
    extend(steno, {

        // Core
        classes: stenoClasses,
        attributes: stenoAttributes,
        element: stenoElement,
        dom: stenoDom,
        html: stenoHtml,
        redo: stenoRedo,
        add: stenoAdd,

        // Element
        el: emptyStenoElement,

        // Utilities
        extend: extend,
        has: has,
        is: is,
        objectType: objectType,
        trim: trim,

        // Array Helpers
        random: random,
        nullify: invalidToValue
    });

    // For browser, export only steno as global
    if (typeof window !== strUndefined && window != null) {
        (function () {
            var
                // Map over zQuery in case of overwrite
                _steno = window.steno;

            steno.noConflict = function (deep) {
                if (deep && window.steno === steno) {
                    window.steno = _steno;
                }
                return steno;
            };

            window.steno = steno;
            return steno;
        })();
    }

    // Get a reference to the global object, like window in browsers
}((function () {
    return this;
})()));
/*
    * This file is part of "zQuery", (c) Kenshin The Battōsai (Sudarsan Balaji), 2014.
    * 
    * "zQuery" is free software: you can redistribute it and/or modify
    * it under the terms of the GNU General Public License as published by
    * the Free Software Foundation, either version 3 of the License, or
    * (at your option) any later version.
    * 
    * "zQuery" is distributed in the hope that it will be useful,
    * but WITHOUT ANY WARRANTY; without even the implied warranty of
    * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    * GNU General Public License for more details.
    * 
    * You should have received a copy of the GNU General Public License
    * along with "zQuery".  If not, see <http://www.gnu.org/licenses/>.
    * 
    */


(function (window) {

    //'use strict';

    // Required variables
    var zQuery = {},

        // Short for prototypes
        objProto = Object.prototype,

        // Shortform for native methodss
        hasOwn = objProto.hasOwnProperty,

        // For IE, to prevent Invalid Calling Object error on toString.call(obj)
        toString = objProto.toString,

        // Regexes
        // RegEx-es thanks to http://regexpal.com/
        // And RegEx Magic http://www.regexmagic.com/

        // Capture Groups:
        // 1        2           3       4                   5       6   7       8           9       10
        // Match    Operator    Closing ClosingMuliplier    Name    Id  Classes Attributes  Content Multiplier
        rxElement = /(( |\+|\^|>|\()|(\))(?:\*(\d+))?|([a-z]+[0-9]?)?(?:#([a-z-]+))?((?:\.[a-z-]+)*)((?:\[(?:[a-z-]+(?:="(?:\\.|[^\n\r"\\])*")?[\t ]?)+\])*)(?:\{((?:\\.|[^\n\r\\}])*)\})?(?:\*(\d+))?)/g,

        // Capture Group: ClassName
        rxClasses = /\.([a-z-]+)/g,

        // Capture Groups: Name, Value
        rxAttributes = /([a-z-]+)(?:="((?:\\.|[^\n\r"\\])*)")?/g,
        rxTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Empty Zen Element
        emptyZenElement = {
            parent: null,
            name: '',
            attributes: {},
            children: [],
            text: '',
            multiplier: 1
        };

    // Core functions start with zen

    // Returns the classes found in a classes zencoding string partial as an array
    // Input-Output sample '.menu.dropdown' : ['menu','dropdown']
    function zenClasses(string) {

        // Validate Arguments
        validateArgs(arguments, ['string']);

        // Return Matches
        var regEx = new RegExp(rxClasses),
            matches = [],
            match;
        while (match = regEx.exec(string)) {
            matches.push(match[1]);
        }
        return matches.join(' ');
    };

    // Returns attributes found in an attributes zencoding string partial as an object with key value pairs
    function zenAttributes(string) {

        // Validate Arguments
        validateArgs(arguments, ['string']);

        // Return Matches
        var regEx = new RegExp(rxAttributes),
            matches = {},
            match;
        while (match = regEx.exec(string)) {
            matches[match[1]] = match[2];
        }

        // Convert all non matches to empty strings
        invalidToValue(matches, '');

        return matches;
    };

    // Returns an element from a zen coding string of a single html element
    function zenElement(string, pure) {

        // Returns pure {name:'', attributes{}} object if true
        // Otherwise returns an extended one
        if (is('undefined|null', pure)) {
            arguments[1] = false;
            arguments.length++;
            pure = false;
        }

        //Validate Arguments
        validateArgs(arguments, ['string', 'boolean']);

        // Match RegEx to retrieve element
        var regEx = new RegExp(rxElement),
            // Find only first match - FOR NOW
            match = regEx.exec(string),
            zClasses,
            zAttributes,
            multiplier;

        // Convert all non matches to empty strings
        invalidToValue(match, '');

        // If no element name is found, it should be div
        if (match[5] === '')
            match[5] = 'div';

        // Get Classes
        zClasses = zenClasses(match[7]);

        // Get Attributes
        zAttributes = zenAttributes(match[8]);

        // Make id as an attribute, id specified takes precedence over that in attributes tag
        if (match[6])
            zAttributes.id = match[6];

        // If zClasses is non-empty, make class as an attribute and add classes. Duplicates not removed.
        if (zClasses) {
            if (!zAttributes['class']) {
                zAttributes['class'] = zClasses;
            } else {
                zAttributes['class'] = zClasses + ' ' + zAttributes['class'];
            }
        }
        
        // Multiplier
        multiplier = match[10];
        if (!multiplier) {
            multiplier = 1;
        } else {
            multiplier = parseInt(multiplier);
            if (isNaN(multiplier))
                multiplier = 1;
        }

        // Build and return the element, now that the name and attributes are done
        if (!pure)
            return extend(true, {}, emptyZenElement, {
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

    // Returns a custom dom object from a zen coding string of a html dom
    function zenDom(string) {

        //Validate Arguments
        validateArgs(arguments, ['string']);

        // Initialize
        var i,
            dom,
            match,
            element,
            parent,
            multiplier,
            temp,
            regEx = new RegExp(rxElement),
            matches = [];

        // Retreive Elements and Operators
        while (match = regEx.exec(string)) {

            // Convert all non matches to empty strings
            invalidToValue(match, '');

            // If match cycle has ended, break the loop
            // Have to do it this way for IE
            if (match[0] === '')
                break;

            // Retreive matches
            matches.push(match);
        }

        // If you came this far, create first element and add to dom
        dom = extend(true, {}, emptyZenElement);
        element = zenAdd(dom);

        // Loop through matches
        // Don't use for..in loop
        // because we need to be able to manipulate the i
        for (i = 0; i < matches.length; i++) {
            var current = matches[i][1];
            switch (current[0]) {

                // Descend, Group
            case ' ':
            case '>':
            case '(':
                element = zenAdd(element);
                break;

                // Add
            case '+':
                if (is('null|undefined', element.parent))
                    element.parent = extend(true, {}, emptyZenElement);
                element = zenAdd(element.parent);
                break;

                // Ascend
            case '^':
                parent = element.parent || element;
                element = zenAdd(parent.parent || parent);
                break;

                // Close Group
            case ')':
                if (element == null)
                    throw 'Invalid zen string';

                // Climb up till the element's parent has no name
                parent = element.parent;
                while (parent.name !== '') {
                    temp = element.parent;
                    parent = temp.parent;
                }

                // Set multiplier
                multiplier = matches[i][4];
                if (!multiplier) {
                    multiplier = 1;
                } else {
                    multiplier = parseInt(multiplier);
                    if (isNaN(multiplier))
                        multiplier = 1;
                }
                parent.multiplier = multiplier;
                element = parent || temp || element;
                break;

                // The element should be extended
                // This allows for chaining ascends, etc
            default:
                extend(element, zenElement(current, true));
            }
        }

        // Return element if dom is just an empty holder,
        // otherwise return dom
        if (dom.name === '' && dom.children.length === 1) {
            dom = dom.children[0];
            dom.parent = null;
        }

        return zenRedo(dom);
    };

    // Restructures a dom so that the parent is returned
    function zenRedo(dom) {
        validateArgs(arguments, ['zen dom']);

        var temp = dom,
            parent = temp.parent;
        while (parent != null) {
            temp = parent;
            parent = temp.parent;
        }
        return temp;
    };

    // Adds a child to a $Z dom element
    function zenAdd(element, child) {

        // Add empty child if not provided
        if (is('undefined|null', child)) {
            child = extend(true, {}, emptyZenElement);
            arguments[1] = child;
            arguments.length++;
        }

        // Validate
        validateArgs(arguments, ['zen dom', 'zen dom']);

        // Add child-parent links
        child.parent = element;
        element.children.push(child);

        return child;
    };

    // Returns the html of a $Z dom element
    function zenHtml(dom) {

        // Validate
        validateArgs(arguments, ['string|zen dom']);

        if (is('string', dom))
            return zenHtml(zenDom(dom));

        // Variables
        var i,
            prefix = '',
            inner = '',
            suffix = '',
            name = dom.name,
            attributes = dom.attributes,
            multiplier = dom.multiplier,
            text = dom.text,
            children = dom.children,
            html = '';

        // Form html
        // If name is available, add dom html
        if (name) {
            prefix += '<' + name;
            for (i in attributes) {
                prefix += ' ' + i + '="' + attributes[i] + '"';
            }
            prefix += '>';
            suffix = '</' + name + '>' + suffix;
        }
        // Add contents if children are not present, else add children
        inner += text;
        for (i in children) {
            inner += zenHtml(children[i]);
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
        var types = type.toString().split('|'),
            match = false;
        for (var i in types) {
            if (types[i] === 'plain object') {

                // Not plain objects
                // - Any object or value whose internal [[Class]] property is not "[object Object]"
                // - DOM nodes
                // - window
                if (objectType(obj)!=='object' || obj.nodeType || obj===obj.window) {
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
            } else if (types[i] === 'zen dom') {

                // $Z dom object
                if (is('plain object', obj)
                        && has('children', obj) && is('array', obj.children)
                        && has('parent', obj) && is('null|object', obj.parent)
                        && has('name', obj) && is('string', obj.name)
                        && has('attributes', obj) && is('object', obj.attributes)) {
                    match = true;
                    break;
                }
                    
            } else if (objectType(obj) === types[i]) {
                match = true;
                break;
            }
        }
        return match;
    };

    // Object Type
    function objectType(obj) {
        if (typeof obj === "undefined") {
            return "undefined";
        }

        // Consider: typeof null === object
        if (obj === null) {
            return "null";
        }

        var match = toString.call(obj).match(/^\[object\s(.*)\]$/),
            type = match && match[1] || "";

        switch (type) {
            case "Number":
                if (isNaN(obj)) {
                    return "nan";
                }
                return "number";
            case "String":
            case "Boolean":
            case "Array":
            case "Date":
            case "RegExp":
            case "Function":
                return type.toLowerCase();
        }
        if (typeof obj === "object") {
            return "object";
        }
        return undefined;
    };

    // Validate Arguments
    function validateArgs(args, types, doesThrow) {

        if (doesThrow === undefined || doesThrow === null || !is('boolean', doesThrow))
            doesThrow = true;

        // Handle special case when arguments is undefined and type contains undefined
        if (is('object', args) && args.length == 0 && is('array', types) && types[0].toString().indexOf('undefined') > -1)
            return true;

        if (!is('object', args) || !is('array', types) || types.length != args.length) {
            if (doesThrow) {
                throw 'Invalid Function Call';
            } else {
                return false;
            }
        }
        for (var i in args) {
            if (!is(types[i], args[i])) {
                if (doesThrow) {
                    throw 'Invalid Function Call';
                } else {
                    return false;
                }
            }
        }
        return true;
    };

    // Trim
    function trim(text) {
        if (validateArgs(arguments, ['null|undefined'], false))
            return '';
        validateArgs(arguments, ['string|boolean|number']);
        return text.toString().replace(rxTrim, "");
    };

    // Invlaid to Value (Nullify to Value)
    function invalidToValue(obj, value) {
        if (!is('object|array', obj))
            return obj;
        for (var i in obj)
            if (is('undefined|null', obj[i]))
                obj[i] = value;
        return obj;
    };

    // Random
    function random(array) {
        validateArgs(arguments, ['array']);
        return array[Math.floor(Math.random() * array.length)];
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
        if (is('boolean', target)) {
            deep = target;

            // Move on to next argument
            target = arguments[i++] || {};
        }

        // If target is not a primitive, create empty object
        if (typeof target !== 'object' && !is('function', target)) {
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
                    if (deep && copy && (is('plain object', copy) || is('array', copy))) {

                        // If array, create array, else create empty object
                        if (is('array', copy))
                            clone = src && is('array', src) ? src : [];
                        else
                            clone = src && (is('plain object', src)) ? src : {};

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
    extend(zQuery, {

        // Core
        classes: zenClasses,
        attributes: zenAttributes,
        element: zenElement,
        dom: zenDom,
        html: zenHtml,
        redo: zenRedo,
        add: zenAdd,

        // Element
        el: emptyZenElement,

        // Utilities
        extend: extend,
        has: has,
        is: is,
        objectType: objectType,
        trim: trim,
        validate: validateArgs,

        // Array Helpers
        random: random,
        nullify: invalidToValue
    });

    // For browser, export only select globals
    if (typeof window !== "undefined" && window != null) {
        (function () {
            var
                // Map over zQuery in case of overwrite
                _zQuery = window.zQuery,

                // Map over the $Z in case of overwrite
                _$Z = window.$Z;

            zQuery.noConflict = function (deep) {
                if (window.$Z === zQuery) {
                    window.$Z = _$Z;
                }
                if (deep && window.zQuery === zQuery) {
                    window.zQuery = _zQuery;
                }
                return zQuery;
            };

            window.zQuery = window.$Z = zQuery;
            return zQuery;
        })();
    }

    // Get a reference to the global object, like window in browsers
}((function () {
    return this;
})()));
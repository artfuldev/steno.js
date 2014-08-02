﻿/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
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


(function(window) {

    //'use strict';

    // Required variables
    var zQuery = {},
        config,

        // Short for prototypes
        objProto = Object.prototype,

        // Shortform for native methodss
        hasOwn = objProto.hasOwnProperty,

        // For IE, to prevent Invalid Calling Object error on toString.call(obj)
        toString = objProto.toString;


    // Core functions start with zen

    // Returns the classes found in a classes zencoding string partial as an array
    // Input-Output sample '.menu.dropdown' : ['menu','dropdown']
    function zenClasses(string) {

        // Validate Arguments
        validateArgs(arguments, ['string']);

        // Return Matches
        var regEx = new RegExp(config.matches.element.classes),
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
        var regEx = new RegExp(config.matches.element.attributes),
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
        validateArgs(arguments, ['string','boolean']);

        // Match RegEx to retrieve element
        var regEx = new RegExp(config.matches.element.complete),
            // Find only first match - FOR NOW
            match = regEx.exec(string),
            zClasses,
            zAttributes;

        // Convert all non matches to empty strings
        invalidToValue(match, '');

        // If no element name is found, it should be div
        if (match[2] == '')
            match[2] = 'div';

        // Get Classes
        zClasses = zenClasses(match[4]);

        // Get Attributes
        zAttributes = zenAttributes(match[5]);

        // Make id as an attribute, id specified takes precedence over that in attributes tag
        if (match[3])
            zAttributes.id = match[3];

        // If zClasses is non-empty, make class as an attribute and add classes. Duplicates not removed.
        if (zClasses) {
            if (!zAttributes['class']) {
                zAttributes['class'] = zClasses;
            } else {
                zAttributes['class'] = zClasses + ' ' + zAttributes['class'];
            }
        }

        // Build and return the element, now that the name and attributes are done
        if(!pure)
        return extend(true, {}, config.element, {
            name: match[2],
            attributes: zAttributes
        });
        return {
            name: match[2],
            attributes: zAttributes
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
            regEx = new RegExp(config.matches.element.complete),
            matches = [],
            invalid = false,
            lastIndex;

        // Retreive Elements and Operators
        while (match = regEx.exec(string)) {

            // Convert all non matches to empty strings
            invalidToValue(match, '');

            // Check for last index to break infinite loop
            // Also delete the last empty match element
            if (match.index === lastIndex) {
                matches.splice(matches.length - 1, 1);
                break;
            }

            // Retreive matches
            matches.push(match);

            // Store lastIndex
            lastIndex = match.index;
        }

        // If even number of matches is found, the dom is invalid
        // Because, dom can only be of the form [element][operator][element]...[operator][element]
        // If the dom starts with or ends with an operator
        // then the dom is again invalid
        if (matches.length % 2 === 0) {
            invalid = true;
        }
        if(!invalid) {
            for (i = 0; i < matches.length; i+=2) {
                if ((matches[i][0].length === 1) && (' +>^'.indexOf(matches[i][0]) > -1)) {
                    invalid = true;
                    break;
                }
            }
        }
        if (invalid)
            throw 'Invalid Zen String';

        // If you came this far, create first element and add to dom
        dom = extend(true, {}, config.element);
        element = zenAdd(dom);
        element = extend(true, element, zenElement(matches[0][1], true));

        // Loop through to create dom
        // Don't use for...in loop
        // We need to manipulate the i iterator
        for (i = 1; i < matches.length-1; i++) {
            switch (matches[i][0]) {

                // Child
                case ' ':
                case '>':
                    element = zenAdd(element, zenDom(matches[++i][1]));
                    break;

                // Sibling
                case '+':
                    if (is('null|undefined', element.parent))
                        element.parent = extend(true, {}, config.element);
                    element = zenAdd(element.parent, zenDom(matches[++i][1]));
                    break;

                // Up One level
                case '^':
                    var parent = element.parent || element;
                    element = zenAdd(parent.parent || parent, zenDom(matches[++i][1]));
                    break;

                // If none found, throw error
                // This should never happen
                default:
                    throw 'Invalid Dom Structure';
            }
        }

        // Return Generated Dom
        return dom;
    };

    // Cleans Up a $Z dom object
    function cleanUp(dom) {
        validateArgs(arguments, ['plain object']);

        var parent = dom.parent;
        if(parent!=null)
            if (parent.children.length === 1 && parent.name === '')
                parent = dom;

        return parent;

    };

    // Adds a child to an element
    function zenAdd(element, child) {
        if (is('undefined|null', child)) {
            child = extend(true, {}, config.element);
            arguments[1] = child;
            arguments.length++;
        }
        validateArgs(arguments, ['object', 'object']);
        child.parent = element;
        element.children.push(child);
        return child;
    };

    // Check if Object Has Key
    function has(key, obj) {
        if (!validateArgs(arguments, ['string|number', 'object|array'], false))
            return false;
        return hasOwn.call(obj, key);
    };

    // Safe object type checking
    function is(type, obj) {
        var types = type.toString().split('|'),
            match = false;
        for (var i in types) {
            if (types[i] === 'plain object') {

                // Not plain objects:
                // From jQuery
                // - Any object or value whose internal [[Class]] property is not "[object Object]"
                // - DOM nodes
                // - window
                if (!is('object', obj) || obj.nodeType || obj === obj.window) {
                    return false;
                }

                if (obj.constructor &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }

                // If the function hasn't returned already, we're confident that
                // |obj| is a plain object, created by {} or constructed with new Object
                return true;
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
        return text.toString().replace(config.matches.trim, "");
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

    // Make Array (List)
    function makeArray( obj ) {
        var arr = [];
        if ( !is('null|undefined',obj) ) {
            for (var i in obj)
                arr[i] = obj[i];
        }
        return arr;
    };

    // Extend
    function extend() {
        var extension,
            key,
            src,
            copy,
            clone,
            target = arguments[0]|| {},
            i=1,
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
                    if (deep && copy && (is('plain object',copy) || is('array', copy))) {

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

    // Config
    config = {
        // RegEx-es thanks to http://regexpal.com/
        // And RegEx Magic http://www.regexmagic.com/
        matches: {
            element: {
                // Capture Groups:
                    // Operator
                    // Element, Name, Id, Classes with dots, Attributes
                complete: /( |\+|\^|>|([a-z]+)?(?:#([a-z-]+))?((?:\.[a-z-]+)*)((?:\[(?:[a-z-]+(?:="(?:\\.|[^\n\r"\\])*")?[\t ]?)+\])*))/g,
                // Capture Group: ClassName
                classes: /\.([a-z-]+)/g,
                // Capture Groups: Name, Value
                attributes: /([a-z-]+)(?:="((?:\\.|[^\n\r"\\])*)")?/g
            },
            trim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
        },
        element: {
            parent: null,
            name: '',
            attributes: {},
            children: []
        }
    };

    // Add stuff to zQuery
    extend(zQuery, {

        // Core
        classes: zenClasses,
        attributes: zenAttributes,
        element: zenElement,
        dom: zenDom,
        add: zenAdd,

        // Config
        config: config,

        // Utilities
        extend: extend,
        has: has,
        is: is,
        objectType: objectType,
        trim: trim,
        validate: validateArgs,

        // Array Helpers
        random: random,
        nullify: invalidToValue,
        list: makeArray
    });

    // For browser, export only select globals
    if (typeof window !== "undefined" && window != null) {
        (function() {
            var
                // Map over zQuery in case of overwrite
                _zQuery = window.zenQuery,

                // Map over the $Z in case of overwrite
                _$Z = window.$Z;

            zQuery.noConflict = function(deep) {
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
}((function() {
    return this;
})()));
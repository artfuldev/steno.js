/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/*
 * This file is part of "ZenQuery", (c) Kenshin The Battōsai (Sudarsan Balaji), 2014.
 * 
 * "ZenQuery" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * "ZenQuery" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with "ZenQuery".  If not, see <http://www.gnu.org/licenses/>.
 * 
 */


(function (window) {

    //'use strict';

    var ZenQuery,
        config,
        // For IE, to prevent Invalid Calling Object error on toString.call(obj)
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty;

    ZenQuery = {

        // Returns the element name found in the zencoding string
        name: function (string) {
            if (arguments.length !== 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            var matches = config.matches,
                names = string.match(matches.name);
            if (ZenQuery.is('null', names)) {
                return 'div';
            }
            return names.join('');
        },

        // Returns the zencoding string with attributes removed
        // Helpful because data in the attributes might interfere with selection
        // eg: [href="http://thebattosai.in/#"]
        noAttributes: function (string) {
            if (arguments.length !== 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            var matches = config.matches;
            return string.replace(matches.attributes.all, '');
        },

        // Returns the classes found in the zencoding string as an array
        classes: function (string) {
            if (arguments.length !== 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            var matches = config.matches,
                classes = ZenQuery.noAttributes(string).match(matches.classes);
            if (ZenQuery.is('null', classes)) {
                return [];
            }
            classes = classes.join(' ').replace(/\./g, '').split(' ');
            return classes;
        },

        // Returns the id string found in the zencoding string
        id: function (string) {
            if (arguments.length !== 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            var matches = config.matches,
                id = ZenQuery.noAttributes(string).match(matches.id);
            if (ZenQuery.is('null', id)) {
                return '';
            }
            id = id.join(' ').replace('#', '');
            return id;
        },

        // Returns attributes found in the zencoding string as an object with key value pairs
        attributes: function (string) {
            if (arguments.length !== 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            var matches = config.matches.attributes,
                attributes = string.match(matches.all),
                array = [],
                key = '',
                name = matches.name,
                value = '',
                data = matches.value;
            if (ZenQuery.is('null', attributes)) {
                return {};
            }
            attributes = attributes.join('').replace(/\]\[/g, ' ');
            array = attributes.match(matches.single);
            if (ZenQuery.is('null', array)) {
                return {};
            }
            attributes = {};
            for (var i in array) {
                array[i] = ZenQuery.trim(array[i]);
                key = array[i].match(name);
                if (ZenQuery.is('null', key)) {
                    continue;
                }
                value = array[i].match(data);
                if (ZenQuery.is('null', value)) {
                    value = [''];
                }
                attributes[key.join('')] = value.join('').replace(/^('|")/, '').replace(/('|")$/, '');
            }
            return attributes;
        },

        // Returns an element from a zen coding string
        element: function(string) {
            if (arguments.length !== 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            var element = {},
                defaults = ZenQuery.config.element;
            element.name = ZenQuery.name(string);
            element.id = ZenQuery.id(string);
            element.classes = ZenQuery.classes(string);
            element.attributes = ZenQuery.attributes(string);
            return ZenQuery.extend(true, {}, defaults, element);
        },

        // Returns a dom from a zen coding string
        dom: function(string) {
            if (arguments.length != 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            // Needs implementation
        },

        // Returns the string representation of html of a dom
        html: function (dom) {
            // Needs implementation
        },

        // Renders a given zen coding string as html
        render: function (string) {
            if (arguments.length !== 1) {
                ZenQuery.incorrectArgs();
            }
            if (!ZenQuery.is('string', string)) {
                ZenQuery.invalidArgs();
            }
            return ZenQuery.html(ZenQuery.dom(string));
        },
    };

    // We use the prototype to distinguish between properties that should
    // be exposed as globals (and in exports) and those that shouldn't
    (function () {
        function F() {};

        F.prototype = ZenQuery;
        ZenQuery = new F();

        // Make F QUnit's constructor so that we can add to the prototype later
        ZenQuery.constructor = F;
    }());

    // Check if Object Has Key
    function has (key, object) {
        if (!ZenQuery.is('array', object) && !ZenQuery.is('object', object)) {
            return false;
        }
        return hasOwn.call(object, key);
    };

    // Safe object type checking
    function is (type, obj) {
        return objectType(obj) === type;
    };

    // Object Type
    function objectType (obj) {
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

    // Extend
    function extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !is('function', target)) {
            target = {};
        }

        // extend ZenQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (is('object', copy) || (copyIsArray = is('array', copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && is('array', src) ? src : [];

                        } else {
                            clone = src && is('object', src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    // Config
    config = {
        // RegEx-es thanks to http://regexpal.com/
        matches: {
            name: /^[a-z-]+/,
            id: /#[a-z-]+/,
            classes: /\.[a-z-]+/g,
            attributes: {
                all: /\[(\s?[a-z-]+(=('.*'|".*"))?){1,}\]/ig,
                single: /\s??[a-z-]+(=('[^']*'|"[^"]*"){1})?\s??/ig,
                name: /^[a-z-]+/,
                value: /'[^']*'|"[^"]*"/,
            },
            trim: /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        },
        html: {
            prefix: '',
            suffix: '',
        },
        element: {
            name: 'div',
            id: '',
            classes: [],
            attributes: {},
            children: [],
        },
        pairs: {
            '[': ']',
            '(': ')',
            '{': '}'
        }
    };

    // Dom Class
    function Dom() {

        // Properties
        this.parent = null; // Holds parent node
        this.children = [];
        this.attributes = {};
        this.name = '';
        this.text = '';

        // Zen String
        this.zen = '';

        // Output
        this.start = '';
        this.end = '';
    };
    Dom.prototype = {

        // Adds a child at position
        addChild: function (child, position) {
            child = child || new Dom();
            child.parent = this;

            if (is('undefined',position)) {
                this.children.push(child);
            } else {
                this.children.splice(position, 0, child);
            }

            return child;
        },

    };

    // Add stuff to ZenQuery
    extend(ZenQuery, {

        // Trim
        trim: function (text) {
            return text == null ?
                "" :
                (text + "").replace(config.matches.trim, "");
        },

        // Errors
        incorrectArgs: function() {
            throw new Error('Incorrect Number of Arguments');
        },
        invalidArgs: function () {
            throw new Error('Invalid Arguments');
        },

        // Additions
        extend: extend,
        config: config,
        has: has,
        is: is,
        objectType: objectType,
    });

    // For browser, export only select globals
    if (typeof window !== "undefined" && window != null) {
        (function() {
            var
                // Map over ZenQuery in case of overwrite
                _ZenQuery = window.ZenQuery,

                // Map over the $Z in case of overwrite
                _$Z = window.$Z;

            ZenQuery.noConflict = function(deep) {
                if (window.$Z === ZenQuery) {
                    window.$Z = _$Z;
                }
                if (deep && window.ZenQuery === ZenQuery) {
                    window.ZenQuery = _ZenQuery;
                }
                return ZenQuery;
            };

            window.ZenQuery = window.$Z = ZenQuery;
            return ZenQuery;
        })();
    }

    // Get a reference to the global object, like window in browsers
}((function () {
    return this;
})()));
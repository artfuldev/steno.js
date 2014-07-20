/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />

/*
 * This file is part of "ZenQuery", (c) Kenshin Himura, 2013.
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
    var ZenQuery,
        config,
        hasOwn = Object.prototype.hasOwnProperty;
    ZenQuery = {
        //Renders a given zen coding string as html
        render: function (string) {
            if (arguments.length != 1)
                throw new Error('Incorrect Number of Arguments');
            if (!ZenQuery.is('string',string))
                throw new Error('Invalid Arguments');
            var matches = config.matches;
            //If no element, make div the default element
            var element = string.match(matches.element);
            if (!element)
                element = 'div';
            var classes = string.match(matches.classes);
            if (classes && classes.length > 0)
                classes = ' class="' + classes.join(' ').replace(/\./g, '') + '"';
            var id = string.match(matches.id);
            if (id && id.length > 0)
                id = ' id="' + id.join('').replace('#', '') + '"';
            var prefix = '<' + element;
            if (id && id.length > 0)
                prefix += id;
            if (classes && classes.length > 0)
                prefix += classes;
            prefix += '>';
            var suffix = '</' + element + '>';
            var html = prefix + suffix;
            return html;
        },
    };

    // We use the prototype to distinguish between properties that should
    // be exposed as globals (and in exports) and those that shouldn't
    (function () {
        function F() { };
        F.prototype = ZenQuery;
        ZenQuery = new F();

        // Make F QUnit's constructor so that we can add to the prototype later
        ZenQuery.constructor = F;
    }());

    //Extend - from jQuery
    function extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    //Config
    config = {
        matches: {
            element: /^[a-z-]+/,
            id: /#[a-z-]+/,
            classes: /\.[a-z-]+/g
        },
        html: {
            prefix: '',
            suffix: ''
        }
    };

    //Add stuff to ZenQuery
    extend(ZenQuery, {

        //config object
        config: config,

        // Safe object type checking - from QUnit
        is: function (type, obj) {
            return QUnit.objectType(obj) === type;
        },
        objectType: function (obj) {
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
        },

        //extend
        extend: extend,
    });

    // Add private stuff to ZenQuery
    extend(ZenQuery.constructor.prototype, {

        // Complex render method
        html: function (string, options) {
            var html = '';
            if (hasOwn.call(options, 'prefix') || hasOwn.call(options, 'suffix')) {
                var defaults = ZenQuery.config.html;
                html = extend({}, defaults, options);
            }
            return html;
        }
    });

    // For browser, export only select globals
    if (typeof window !== "undefined" && window != null) {
        (function() {
            var i,
                l,
                keys = [
                ];
            for (i = 0, l = keys.length; i < l; i++) {
                window[keys[i]] = QUnit[keys[i]];
            }
        })();
        window.ZenQuery = ZenQuery;
    }

    // Get a reference to the global object, like window in browsers
}((function () {
    return this;
})()));

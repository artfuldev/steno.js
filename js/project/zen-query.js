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
    var ZenQuery;
    ZenQuery = {

    };

    // We use the prototype to distinguish between properties that should
    // be exposed as globals (and in exports) and those that shouldn't
    (function () {
        function F() { }
        F.prototype = ZenQuery;
        ZenQuery = new F();

        // Make F QUnit's constructor so that we can add to the prototype later
        ZenQuery.constructor = F;
    }());

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

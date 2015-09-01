# API Reference

## noConflict
###### steno.noConflict([deep])

A `noConflict()` method is added to allow you to remap the namespaces, just like `jQuery`. The namespace names can be used interchangeably.

## html
###### steno.html(stenoString[, context])

This is the core method of the library. It takes a `steno string`, a string made up of CSS selectors and simple operators, which represents a dom tree (or a single element). The `steno string` representation is largely based off of [Emmet](http://emmet.io). However, this library is streamlined only for HTML while Emmet has a larger and broader vision. Also, there are a few important differences. Refer to the `Steno String Representation` section of the Wiki for more info.
````
    var stenoString = 'div.has-menu ul.dropdown-menu.dropdown.menu ' +
            'li.option*4>a.no-link',
        tempDomTree = steno.html(stenoString);
    console.log(tempDomTree);
````
will output (padding and line breaks added for clarity):
````
    <div class="has-menu">
        <ul class="dropdown-menu dropdown menu">
            <li class="option"><a class="no-link"></a></li>
            <li class="option"><a class="no-link"></a></li>
            <li class="option"><a class="no-link"></a></li>
            <li class="option"><a class="no-link"></a></li>
        </ul>
    </div>
````

## compile
###### steno.compile(stenoString)

Some systems/libraries/engines provide or use what are known as <q>precompiled templates</q>. As an example, Bloodhound, Typeahead's suggestion engine, requires precompiled templates. For this reason, they are included with *steno.js*.

> A precompiled template is a function which takes an object as its only argument and returns a string which matches a template with the provided object as context.

To create a precompiled template, you simply pass the stenoString to the compile method instead of the html method. Then, the precompiled template can output multiple result sets by passing in varied context objects.
````
    var stenoString = 'ul>li{\\name}\\items',
        precompiled = steno.compile(stenoString);
````

## render
###### template(context), template.render(context)

A precompiled template is used to render a stenoString with varied contexts by passing in a context object as an argument. *steno.js* supports both types of rendering, calling the precompiled template itself as a method, or calling the render method on the precompiled template.
````
    var stenoString = 'ul.options>li.option{\\name}\\items',
        precompiled = steno.compile(stenoString),
        context1 = { items: [ { name: 'Tom' }, { name: 'Harry' } ] },
        context2 = { items: [ { name: 'United States (US)' }, { name: 'United Kingdom (UK)' } ] },
        // <ul class="options"><li class="option">Tom</li><li class="option">Harry</li></ul>
        output1 = precompiled(context1),
        // <ul class="options"><li class="option">United States (US)</li><li class="option">United Kingdom (UK)</li></ul>
        output2 = precompiled.render(context2);
````

## extend
###### steno.extend([deep ], target, object1[, objectN])

Almost identical to `jQuery.extend`, when two or more object arguments are supplied to `steno.extend()`, properties from all of the objects are added to the target object. Arguments that are null or undefined are ignored.

If only one argument is supplied to `steno.extend()`, this means the target argument was omitted. In this case, nothing happens, unlike in `jQuery`, where the jQuery object itself is extended.

Keep in mind that the target object (first argument) will be modified, and will also be returned from `steno.extend()`. If, however, you want to preserve both of the original objects, you can do so by passing an empty object as the target:

`var object = steno.extend({}, object1, object2);`

The merge performed by `steno.extend()` is not recursive by default; if a property of the first object is itself an object or array, it will be completely overwritten by a property with the same key in the second or subsequent object. The values are not merged. However, by passing true for the first function argument, objects will be recursively merged.

_Warning: Passing false for the first argument is not supported._

Undefined properties are not copied. However, properties inherited from the object's prototype will be copied over. Properties that are an object constructed via `new MyCustomObject(args)`, or built-in JavaScript types such as `Date` or `RegExp`, are not re-constructed and will appear as `plain Object`s in the resulting object or array.

On a deep extend, Object and Array are extended, but object wrappers on primitive types such as String, Boolean, and Number are not. Deep-extending a cyclical data structure will result in an error, and some known cyclical data structures are avoided in the code itself. Examples would be `document`, `window`, and `steno dom`.

For needs that fall outside of this behavior, write a custom extend method instead, or use a library like [lodash](http://lodash.com).

## has
###### steno.has(key, obj)

This method returns true if an array or object has a particular key. Bear in mind that the value of that key may be `undefined` or `null`, even if the method returns `true`. If the input object is not an array or object, and the skey is not a string or number, a `false` is returned as a fail safe.

## is
###### steno.is(type, obj)

This method returns true if the `obj` passed is of the specified `type`. The `type` argument is a string representing the type of the object, including 'array', 'null' and 'undefined'. You can include the `|` operator to specify possible types.
````
    var s = [1,2,3,4];
    steno.is('array|string', s);    // true
    s = 'hello';
    steno.is('array|string', s);    // true
    s = 1;
    steno.is('array|string', s);    // false
````

## trim
###### steno.trim(string)

This function trims away leading and trailing whitespaces and newlines, much like in `jQuery`. Will be useful for a variety of purposes.

## random
###### steno.random(array)

This function simply returns a random element from an array. You will find it quite useful in many cases, as have I, especially in unit testing, mocking, dynamic presentations, etc.

## nullify
###### steno.nullify(obj, value)

This function takes an object or array, and sets the value of each key with undefined or null values to the provided value. It might come in handy at times you can't be sure of now. As an example usage,
````
    var s = ['hey', null, undefined, 'hello'];
    steno.nullify(s,'hi');
    console.log(s);
    // outputs
    ['hey','hi','hi','hello']
````

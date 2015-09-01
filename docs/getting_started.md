## Getting Started

### Introduction
###### What and Why?

The internet is no more a collection of web pages. As with everything, the internet and its technologies have evolved, to be a vast data source. Web APIs have changed the way dynamic websites behave, and have introduced a single service to mulitple devices with different client configurations. Hence the need to consume such data has grown. You can write your own frontend for any service/platform, with an API. It's the power and flexibility this system allows that has made it the end point of the current cycle of evolution for the ineternet.

If you had all the data facebook has, for example, you could design your own front end for it. And all you need to have all the data that facebook has, is an API. Rest APIs now have a common place in a website architecture, and it is wise to make use of them. But how to consume mere data?

The data from the API provides a convenient way to do the presentation at the front-end, and not mix data with presentation. To take advantage of it, you can call the APIs on the server side and render the HTML. Or, you can do it on the client side, with [client-side templating](http://www.smashingmagazine.com/2012/12/05/client-side-templating/). It is simply a way to the templating on the client side rather than on the server side. Returning only data in the response instead of entire HTML also helps reducing response size and therefore increases speed. Also, today's clients are more performant.

To help transform data into HTML on the client side, you need client side templating engines. *steno.js* is one such, and offers logicless templating. Because, as we all know, templates are merely rules for presentation, and the less logic that is present there, the better separation of concerns we can have.

### Installation
###### How to

Simply include `//cdn.jsdelivr.net/steno.js/latest/steno.min.js` in your project. *steno.js* is dependency-free and can be included anywhere, either before or after all your scripts. It's just 4 KB of minified code, making it also, the smallest such library to take care of your templating needs.

## Syntax

### Element
###### li#home.option.item[title="Home"]{Home}

*steno.js* has a particular syntax which makes it not only the smallest templating library, but also the one with the smallest size of templates. And it's too easy, we use a syntax extremely similar to CSS selectors.

Every part of the syntax is optional, but the order in which they appear is important. An element is written as its CSS selector, with a few cool additions of our own. An explanation of the various parts follows.

### Name

An element name is written as itself. So a `div` is written as `div`, etc. When no element names are provided, it is assumed to be a `div`.

### Id
###### \#id

The element name is optionally followed by an id. This can be specified by prefixing the id name with the `#` symbol, just like in CSS. `<div id="some-id"></div>` is written as `div#some-id`. Since if there is no element name it is interpreted as a div, it can also be written simply as `#some-id`.

### Classes
###### .class

Third in line is the optional classes. These can be specified by prefixing the class name with the `.` symbol, just like in CSS. `<ul id="menu" class="dropdown filter"></div>` is written as `ul#menu.filter.dropdown`.

### Attributes
###### [key="value"]

Fourth in line is the optional attributes. These can be specified by following the CSS syntax `[key="value"]`. Note that there is no space between the key, the equals sign, and the quotes, and also there's no space between the start annd end square braces and the inside text.

*steno.js* has a rigid syntax and does not allow unquoted values. For multiple key-value pairs, you can use the Sizzle syntax (`[key1="value"][key2="value"]`), or Emmet syntax (`[key1="value" key2="value"]`). *steno.js* understands both variants fine.

As an example, `<a href="http://google.com" title="Google" disabled><a>` is written as `a[href="http://google.com" title="Google" disabled]`.

### Text
###### {texts go here}

Fifth in line is the optional text, which represents the innerHtml of the element. It can be specified by following the syntax of `{text goes here}`.

As an example, `*steno.js*` is written as `span.brand{steno.js}`.


## Operators

### Descend
###### >

This operator introduces a child for an element. Useful for specifying children.

`div>ul>li` and `div ul li`, both, will produce (padding and line breaks added for clarity)
````
    <div>
        <ul>
            <li></li>
        </ul>
    </div>
````

### Add
###### +

Use the `+` operator to add elements after the previous one, on the same level:

`div+p+section` will output (padding and line breaks added for clarity):
````
    <div></div>
    <p></p>
    <section></section>
````

### Ascend
###### ^

With the `>` operator, you’re descending down the generated tree and positions of all sibling elements will be resolved against the most deepest element:

`div+div>p>span+em` will be expanded to
````
    <div></div>
    <div>
        <p><span></span><em></em></p>
    </div>
````

With the `^` operator, you can climb one level up the tree and change context where the following elements should appear:

`div+div>p>span+em^section` outputs to
````
    <div></div>
    <div>
        <p><span></span><em></em></p>
        <section></section>
    </div>
````

You can use as many `^` operators as you like, each operator will move one level up:

`div+div>p>span+em^^^section` will output to
````
    <div></div>
    <div>
        <p><span></span><em></em></p>
    </div>
    <section></section>
````

### Transcend
###### *

With the `*` operator, you can define how many times element should be outputted. The repetition occurs on an element, so until the context comes out of the element.

`ul.menu>li.option*5` outputs to
````
    <ul class="menu">
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
    </ul>
````

### Group
###### ()

Parentheses are used to group sub-trees in complex `steno string`s:

`div>(header>ul>li*2>a[href])+footer>p` expands to
````
    <div>
        <header>
            <ul>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
            </ul>
        </header>
        <footer>
            <p></p>
        </footer>
    </div>
````

If you’re working with the browser’s DOM, you may think of groups as Document Fragments: each group contains a `steno string` sub-tree and all the following elements are inserted at the same level as the first element of group.

You can nest groups inside each other and combine them with the multiplication `*` operator:

`(div>dl>(dt+dd)*3)+footer>p` produces
````
    <div>
        <dl>
            <dt></dt>
            <dd></dd>
            <dt></dt>
            <dd></dd>
            <dt></dt>
            <dd></dd>
        </dl>
    </div>
    <footer>
        <p></p>
    </footer>
````

### Context
###### \

To provide context, one can use `\`. When included in a string, since `\` is used to escape other characters, `\\` should be used instead.

To learn more about contexts, proceed to templating.

## Templating

### Expansion

*steno.js* supports simple expansion, with no contexts. `steno.html('ul.options>li.option.active+li.option*4')` will output:
````
    <ul class="options">
        <li class="option active"></li>
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
    </ul>
````

### Contexts

Besides expansion, *steno.js* supports templating by providing contexts. There are multiple ways in which context can be used.

A context is a particular data context for a template in which certain sections can be replaced with data from the context. Contexts can be provided for an element or its values, and cause the expansion / template rendering to behave differently.

It's easier to discuss with an example. Take the following steno string: `ul.options>li.option\items>a[href="\link"]{Click here for \name!}`. Since we already know that `\` is the context operator, both `\items` and `\link` are contexts.

In `li.option\items`, the context for the element li is provided as a variable named `items`. This means that a single `li.option` element will be rendered for an instance of the object items present in the context. In case the variable `items` is an array, then the element will be rendered once for each element in the array. Since it has children, all children will be rendered for each rendering of a single li element.

In `a[href="\link"]`, the context for the value of the a element contains a context variable which will be substituted. This means that for every rendered a element, the href attributes value will contain link. Its content will contain text that susbtitutes `\name` for the value in the context.

As an example, when provided a context object like:
````
    var context = { items: [
            { name: 'Google', link: 'http://google.com' },
            { name: 'Yahoo', link: 'http://yahoo.com' }
        ] };
````
The steno string mentioned above, `ul.options>li.option\items>a[href="\link"]{Click here for \name!}` will render as:
````
    <ul class="options">
        <li class="option">
            <a href="http://google.com">Click here for Google!</a>
        </li>
        <li class="option">
            <a href="http://yahoo.com">Click here for Yahoo!</a>
        </li>
    </ul>
````

The context for a steno string can be provided in two ways, using html method, or precompile-render method. Read on to find out more.

### Compilation

When expanding an abbreviation with *steno.js*, you can use `steno.html` method as outlined in the docs. Sometimes, you will have to use the same template over and over, but with different contexts. Say you have multiple sections of data in a report. Each section can be templated in a particular way, and you need not repeat the `steno string` for every `steno.html` call with varied contexts. Instead, you can compile a template - this process is called precompiling - into a variable. This variable can simply be provided a context and it will render the template for that particular context.

Compilation is achieved in `steno.js` using `steno.compile(stenoString)` and `template(context)`/`template.render(context)` methods. Read on to follow.

## API Reference

### noConflict
###### steno.noConflict([deep])

A `noConflict()` method is added to allow you to remap the namespaces, just like `jQuery`. The namespace names can be used interchangeably.

### html
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

### compile
###### steno.compile(stenoString)

Some systems/libraries/engines provide or use what are known as <q>precompiled templates</q>. As an example, Bloodhound, Typeahead's suggestion engine, requires precompiled templates. For this reason, they are included with *steno.js*.

> A precompiled template is a function which takes an object as its only argument and returns a string which matches a template with the provided object as context.

To create a precompiled template, you simply pass the stenoString to the compile method instead of the html method. Then, the precompiled template can output multiple result sets by passing in varied context objects.
````
    var stenoString = 'ul>li{\\name}\\items',
        precompiled = steno.compile(stenoString);
````

### render
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

### extend
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

### has
###### steno.has(key, obj)

This method returns true if an array or object has a particular key. Bear in mind that the value of that key may be `undefined` or `null`, even if the method returns `true`. If the input object is not an array or object, and the skey is not a string or number, a `false` is returned as a fail safe.

### is
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

### trim
###### steno.trim(string)

This function trims away leading and trailing whitespaces and newlines, much like in `jQuery`. Will be useful for a variety of purposes.

### random
###### steno.random(array)

This function simply returns a random element from an array. You will find it quite useful in many cases, as have I, especially in unit testing, mocking, dynamic presentations, etc.

### nullify
###### steno.nullify(obj, value)

This function takes an object or array, and sets the value of each key with undefined or null values to the provided value. It might come in handy at times you can't be sure of now. As an example usage,
````
    var s = ['hey', null, undefined, 'hello'];
    steno.nullify(s,'hi');
    console.log(s);
    // outputs
    ['hey','hi','hi','hello']
````

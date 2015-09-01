# Templating

## Expansion

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

## Contexts

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

## Compilation

When expanding an abbreviation with *steno.js*, you can use `steno.html` method as outlined in the docs. Sometimes, you will have to use the same template over and over, but with different contexts. Say you have multiple sections of data in a report. Each section can be templated in a particular way, and you need not repeat the `steno string` for every `steno.html` call with varied contexts. Instead, you can compile a template - this process is called precompiling - into a variable. This variable can simply be provided a context and it will render the template for that particular context.

Compilation is achieved in `steno.js` using `steno.compile(stenoString)` and `template(context)`/`template.render(context)` methods. Read on to follow.

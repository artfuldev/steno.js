#steno.js

* Author: Kenshin The Battōsai *(Sudarsan Balaji)*
* License: [GNU Affero GPL v3](http://www.gnu.org/licenses/agpl-3.0.html)
* Library Version: v1.5.0
* Last Updated: 2014-08-26
* ReadMe Version: 1.1

##Description

The smallest independent javascript library for logic-less HTML templating.

The main idea is that you should be able to do something like this:

````
steno.html('#main-menu.main[role="menu"]>((a>span{\\text})+(ul.dropdown>li{\\text}\\items))',
    {
        text: 'Some text here',
        items:  [
                    {
                        text: 'All'
                    },
                    {
                        text: 'Fall'
                    },
                    {
                        text: 'Down'
                    }
                ]
    });
````

should output

````
<div id="main-menu" class="main" role="menu">
    <a>
        <span>Some text here</span>
    </a>
    <ul class="dropdown">
        <li>All</li>
        <li>Fall</li>
        <li>Down</li>
    </ul>
</div>
````

so that you can then do:

`jQuery('.insert-here').append(steno.html('ul>(li>a{Click Here})*4'));`

or, like this:

````
window.steno = steno.html;
$('#insert-here').append(steno('ul>(li>a{Click Here})*4'));
````

or any other way you'd like to use the steno.html function.

Need precompiled templates? We've got you covered. Try:

````
var precompiled = steno.compile('ul>li{\\index}\\items'),
    context = { items: [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }] };
console.log(precompiled(context));
````

will output

````
<ul>
    <li>0</li>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
````

You can also try

````
precompiled.render(context);
````

which will render the same output. `steno.js` works with both types of usage!

For more detailed documentation, refer the [wiki](https://github.com/kenshinthebattosai/steno.js/wiki)

##Features

* Quickly add dom elements or innerHTML to a document.
* Small but powerful logic-less templates!
* Precompiled Templates
* Compatiable with IE7.
* No dependencies.
* Comes with utilities, like `extend, is, has, trim, random and nullify`.

##Goals

###Short Term
* Respond to feature requests
* Build a site/wiki for documentation and/or promotion.

##Thanks

To wonderful authors of libraries like [jQuery](http://jquery.com), [qUnit](http://qunitjs.com),
[underscore](http://underscorejs.org) and [backbone](http://backbonejs.org),
whose annotated source code was invaluable. Without such libraries, this project would
never even have started, and this piece of code would have never seen the light of day.

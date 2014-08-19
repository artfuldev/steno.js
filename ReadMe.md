#steno.js

* Author: Kenshin The Battōsai *(Sudarsan Balaji)*
* License: [GNU Affero GPL v3](http://www.gnu.org/licenses/agpl-3.0.html)
* Library Version: v1.2.0
* Last Updated: 2014-08-19
* ReadMe Version: 1.1

##Description

A javascript library to write shorthand HTML, using CSS selectors (and more).

The main idea is that you should be able to do something like this:

`steno.html('#main-menu.main[role="menu"]>((a>span{Selected})+(ul.dropdown>li*4))')`

should output

```
<div id="main-menu" class="main" role="menu">
    <a>
        <span>Selected</span>
    </a>
    <ul class="dropdown">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
```

so that you can then do:

`jQuery('.insert-here').append(steno.html('ul>(li>a{Click Here})*4'));`

or, like this:

```
window.steno = steno.html;
$('#insert-here').append(steno('ul>(li>a{Click Here})*4'));
```

or any other way you'd like to use the steno.html function.

For more detailed documentation, refer the [wiki](https://github.com/kenshinthebattosai/steno.js/wiki)

##Features

* Can use Zen Coding and Sizzle selectors interchangeably
eg: `[title="" href=""]` and `[title=""][href=""]`
* Quickly add dom elements or innerHTML to a document.
* No dependencies, use with or without jQuery.
* Comes with utilities, like `extend, is, has, trim, random and nullify`. 

Should be able to:

* Create quick clientside templates when done.
* Extend to other engines like Handlebars.js.

##Goals

###Long Term

* To keep working on this as and when time allows

###Short Term

* To add whatever possible for now.
* Add templating options
* Add a jQuery plugin version with much lesser file size (if possible)

##Thanks

To wonderful authors of libraries like [jQuery](http://jquery.com), [qUnit](http://qunitjs.com),
[underscore](http://underscorejs.org) and [backbone](http://backbonejs.org),
whose annotated source code was invaluable. Without such libraries, this project would
never even have started, and this piece of code would have never seen the light of day.

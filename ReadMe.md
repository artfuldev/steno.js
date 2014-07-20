#ZenQuery
* Author: Kenshin The Battōsai *(Sudarsan Balaji)*
* License: *GNU GPL v3* (see COPYING.txt)
* Last Updated: 20/07/2014
* ReadMe Version: 0.2

##Description

A work-in-progress library/jquery plugin of sorts to use zen coding (now Emmet) with jquery.
The main idea is that you should be able to do something like this:

`$Z.render('#main-menu.main[role="menu"]>((a>span{Selected})+(ul.dropdown>li*4))')`

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

`jQuery('.insert-here').append($Z.render(zenCodingString));`

or, like how I'd like it to be done:

```
$Z = $Z.dom; //OR $Z.render
$('#insert-here').append($Z(zenCodingString));
```

##Features
Nothing yet, but should encompass:
* Can use Zen Coding and Sizzle selectors interchangeably
* Can create quick clientside templates when done.
* Plans to extend to other engines like Handlebars.js

##Goals

###Long Term
* To keep working on this as and when time allows

###Short Term
* To add whatever possible for now.
* Complete Basic element, classname, id detection
* Add attributes
* Allow switching between attributes in sizzle format and zen coding format
* Expand to sibling and child selectors
* Add grouping selectors

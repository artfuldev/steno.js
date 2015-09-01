# Syntax

## Element
###### li#home.option.item[title="Home"]{Home}

*steno.js* has a particular syntax which makes it not only the smallest templating library, but also the one with the smallest size of templates. And it's too easy, we use a syntax extremely similar to CSS selectors.

Every part of the syntax is optional, but the order in which they appear is important. An element is written as its CSS selector, with a few cool additions of our own. An explanation of the various parts follows.

## Name

An element name is written as itself. So a `div` is written as `div`, etc. When no element names are provided, it is assumed to be a `div`.

## Id
###### \#id

The element name is optionally followed by an id. This can be specified by prefixing the id name with the `#` symbol, just like in CSS. `<div id="some-id"></div>` is written as `div#some-id`. Since if there is no element name it is interpreted as a div, it can also be written simply as `#some-id`.

## Classes
###### .class

Third in line is the optional classes. These can be specified by prefixing the class name with the `.` symbol, just like in CSS. `<ul id="menu" class="dropdown filter"></div>` is written as `ul#menu.filter.dropdown`.

## Attributes
###### [key="value"]

Fourth in line is the optional attributes. These can be specified by following the CSS syntax `[key="value"]`. Note that there is no space between the key, the equals sign, and the quotes, and also there's no space between the start annd end square braces and the inside text.

*steno.js* has a rigid syntax and does not allow unquoted values. For multiple key-value pairs, you can use the Sizzle syntax (`[key1="value"][key2="value"]`), or Emmet syntax (`[key1="value" key2="value"]`). *steno.js* understands both variants fine.

As an example, `<a href="http://google.com" title="Google" disabled><a>` is written as `a[href="http://google.com" title="Google" disabled]`.

## Text
###### {texts go here}

Fifth in line is the optional text, which represents the innerHtml of the element. It can be specified by following the syntax of `{text goes here}`.

As an example, `<span class="brand">steno.js</span>` is written as `span.brand{steno.js}`.

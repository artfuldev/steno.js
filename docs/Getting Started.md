# Getting Started

## Introduction
###### What and Why?

The internet is no more a collection of web pages. As with everything, the internet and its technologies have evolved, to be a vast data source. Web APIs have changed the way dynamic websites behave, and have introduced a single service to mulitple devices with different client configurations. Hence the need to consume such data has grown. You can write your own frontend for any service/platform, with an API. It's the power and flexibility this system allows that has made it the end point of the current cycle of evolution for the ineternet.

If you had all the data facebook has, for example, you could design your own front end for it. And all you need to have all the data that facebook has, is an API. Rest APIs now have a common place in a website architecture, and it is wise to make use of them. But how to consume mere data?

The data from the API provides a convenient way to do the presentation at the front-end, and not mix data with presentation. To take advantage of it, you can call the APIs on the server side and render the HTML. Or, you can do it on the client side, with [client-side templating](http://www.smashingmagazine.com/2012/12/05/client-side-templating/). It is simply a way to the templating on the client side rather than on the server side. Returning only data in the response instead of entire HTML also helps reducing response size and therefore increases speed. Also, today's clients are more performant.

To help transform data into HTML on the client side, you need client side templating engines. *steno.js* is one such, and offers logicless templating. Because, as we all know, templates are merely rules for presentation, and the less logic that is present there, the better separation of concerns we can have.

## Installation
###### How to

Simply include `//cdn.jsdelivr.net/steno.js/latest/steno.min.js` in your project. *steno.js* is dependency-free and can be included anywhere, either before or after all your scripts. It's just 4 KB of minified code, making it also, the smallest such library to take care of your templating needs.

/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />

$Q = QUnit;

var classes = ['','.dropdown', '.menu.dropdown','.dropdown-menu'];
var ids = ['','#menu'];
var elements = ['', 'div', 'p'];
var attributes = [
    '', '[data-attribute]', '[for=""]', '[href="github.com/#"]', '[title="Something about ZenQuery\'s Awesomeness"]',
    '[filter][title="Something about ZenQuery\'s Awesomeness"]', '[filter title="Something about ZenQuery\'s Awesomeness"]'
];
var attributesObjects = [
    {}, { 'data-attribute': '' }, { 'for': '' }, { href: 'github.com/#' }, { title: "Something about ZenQuery\'s Awesomeness" },
    { filter: '', title: "Something about ZenQuery\'s Awesomeness" }, { filter: '', title: "Something about ZenQuery\'s Awesomeness" }
];

var selectors = [];
for (var i in elements)
    for (var j in ids)
        for (var k in classes)
            for (var l in attributes) {
                var classArray = $Z.trim(classes[k].replace(/\./g, ' ')).split(' ');
                if (classArray.length === 1 && classArray[0] === '')
                    classArray = [];
                selectors.push({
                    string: elements[i] + ids[j] + classes[k] + attributes[l],
                    name: elements[i] == '' ? 'div' : elements[i],
                    id: ids[j].replace('#', ''),
                    classes: classArray,
                    attributes: attributesObjects[l],
                    element: {
                        name: elements[i] == '' ? 'div' : elements[i],
                        id: ids[j].replace('#', ''),
                        classes: classArray,
                        attributes: attributesObjects[l],
                        children: [],
                    }
                }); // Correct Order
                selectors.push({
                    string: elements[i] + attributes[l] + classes[k] + ids[j],
                    name: elements[i] == '' ? 'div' : elements[i],
                    id: ids[j].replace('#', ''),
                    classes: classArray,
                    attributes: attributesObjects[l],
                    element: {
                        name: elements[i] == '' ? 'div' : elements[i],
                        id: ids[j].replace('#', ''),
                        classes: classArray,
                        attributes: attributesObjects[l],
                        children: [],
                    }
                }); // Random Order
            }
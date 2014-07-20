/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />

$Q = QUnit;
$Z = ZenQuery;

var classes = ['','.dropdown', '.menu.dropdown','.dropdown-menu'];
var ids = ['','#menu'];
var elements = ['', 'div', 'p'];
var attributes = [
    '', '[data-attribute]', '[for=""]', '[href="github.com/#"]', '[title="Something about ZenQuery\'s Awesomeness"]',
    '[filter][title="Something about ZenQuery\'s Awesomeness"]', '[filter title="Something about ZenQuery\'s Awesomeness"]'
];

var selectors = [];
for (var i in elements)
    for (var j in ids)
        for (var k in classes)
            for (var l in attributes) {
                selectors.push({
                    string: elements[i] + ids[j] + classes[k] + attributes[l],
                    element: elements[i] == '' ? 'div' : elements[i],
                    id: ids[j].replace('#', ''),
                    classes: $Z.trim(classes[k].replace(/\./g, ' ')),
                    attributes: $Z.trim(attributes[l].replace(/\]\[/g, ' ').replace(']', '').replace('[', ''))
                }); // Correct Order
                selectors.push({
                    string: elements[i] + attributes[l] + classes[k] + ids[j],
                    element: elements[i] == '' ? 'div' : elements[i],
                    id: ids[j].replace('#', ''),
                    classes: $Z.trim(classes[k].replace(/\./g, ' ')),
                    attributes: $Z.trim(attributes[l].replace(/\]\[/g, ' ').replace(']', '').replace('[', ''))
                }); // Random Order
            }
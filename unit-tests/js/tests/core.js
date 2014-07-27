/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js" />

// TODO: Rewrite without helpers

$Q.module('Core', {
    setup: function () {
        window.classes = $H.classes;
        window.attributes = $H.attributes;
        window.elements = $H.elements;
    },
    teardown: function () {
        delete window.classes;
        delete window.attributes;
        delete window.elements;
    }
});
$Q.test('Classes', function (assert) {
    for (var i in classes)
        assert.deepEqual($Z.classes(i), classes[i], 'Classes in \'' + i + '\' are \'' + classes[i] + '\'');
});
$Q.test('Attributes', function (assert) {
    for (var i in attributes)
        assert.deepEqual($Z.attributes(i), attributes[i], 'Attributes in \'' + i + '\' are \'' + JSON.stringify(attributes[i]) + '\'');
});
$Q.test('Elements', function (assert) {
    for (var i in elements)
        assert.deepEqual($Z.element(i), elements[i], 'Elements in \'' + i + '\' retreived successfully as ' + JSON.stringify(elements[i]));
});
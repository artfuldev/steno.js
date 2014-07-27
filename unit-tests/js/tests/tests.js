/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />
/// <reference path="../tests/helpers.js" />

$Q.module('Utilities', {
    setup: function() {},
    teardown: function() {},
});

$Q.test('Validate Arguments', function (assert) {
    assert.throws(function () { $Z.validate(); }, 'Invalid Function Call', 'Error thrown when no arguments are passed');
    assert.throws(function () { $Z.validate(1); }, 'Invalid Function Call', 'Error thrown when less than 2 arguments is passed');
    assert.throws(function () { $Z.validate(1, 2, 3); }, 'Invalid Function Call', 'Error thrown when more than 2 arguments is passed');
    assert.throws(function () { $Z.validate(1, 2); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate([1], 2); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate(1, [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate([1], [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate($H.arguments(1), [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate($H.arguments(1,2), [2]); }, 'Invalid Function Call', 'Error thrown when length of arguments is not equal to length of types');
    assert.ok($Z.validate($H.arguments(1), ['number']), 'Number identified correctly');
    assert.ok($Z.validate($H.arguments('string'), ['string']), 'String identified correctly');
    assert.ok($Z.validate($H.arguments({}), ['object']), 'Object identified correctly');
    assert.ok($Z.validate($H.arguments([]), ['array']), 'Array identified correctly');
    assert.ok($Z.validate($H.arguments(1, {}), ['number', 'object']), 'Works for more than 1 argument');
});

$Q.module('Single Element Extractors', {
    setup: function() {
        window.classes = $H.classes;
        window.attributes = $H.attributes;
        window.elements = $H.elements;
    },
    teardown: function() {
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
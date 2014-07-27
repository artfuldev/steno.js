/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />
/// <reference path="../tests/helpers.js" />


$Q.module('Utilities', {
    setup: function() {
        window.types = $H.types;
        window.obj = $H.obj;
        window.arr = $H.arr;
    },
    teardown: function() {
        delete window.types;
        delete window.obj;
        delete window.arr;
    },
});
$Q.test('Object Type', function(assert) {
    for (var i in types)
        assert.ok($Z.objectType(types[i]) === i, i + ' identified correctly');
});
$Q.test('Is', function(assert) {
    for (var i in types)
        assert.ok($Z.is(i, types[i]) === true, 'typeof ' + JSON.stringify(types[i]) + ' identified correctly as ' + i);
});
$Q.test('Has', function(assert) {
    assert.ok($Z.has('key', obj) === true, 'Matches for Object');
    assert.ok($Z.has('key-two', obj) === true, 'Matches for Object');
    assert.ok($Z.has('key-three', obj) === false, 'Returns false for bad key of Object');
    assert.ok($Z.has('1', arr) === true, 'Matches for Array - String Index');
    assert.ok($Z.has('0', arr) === true, 'Matches for Array');
    assert.ok($Z.has(1, arr) === true, 'Matches for Array - Numeric Index');
    assert.ok($Z.has(0, arr) === true, 'Matches for Array');
    assert.ok($Z.has(2, arr) === false, 'Returns false for bad key of Array');
    assert.ok($Z.has('key', arr) === true, 'Matches for Array');
    assert.ok($Z.has('key-three', arr) === false, 'Returns false for bad key of Array');
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
$Q.test('Trim', function(assert) {
    assert.expect(0);
});
$Q.test('Nullify', function (assert) {
    assert.expect(0);
});
$Q.test('Random', function (assert) {
    assert.expect(0);
});
$Q.test('Extend', function (assert) {
    assert.expect(0);
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
/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />
/// <reference path="../tests/helpers.js" />

// TODO: Remove helpers.js
// TODO: Split Modules into separate JS files

$Q.module('Requirements');
$Q.test('Basic Requirements', function (assert) {
    assert.ok(typeof window !== 'undefined', 'Window reference is obtainable');
    assert.ok(window !== null, 'Window is not null');
    assert.ok(Array.prototype, 'Array.prototype is defined');
    assert.ok(Object.prototype, 'Object.prototype is defined');
    assert.ok(Object.prototype.hasOwnProperty, 'Object.prototype.hasOwnProperty is defined');
    assert.ok(Object.prototype.toString, 'Object.prototype.toString is defined');
    assert.ok(Array.prototype.push, 'Array.prototype.push is defined');
    assert.ok(Function.prototype.apply, 'Function.prototype.apply is defined');
    assert.ok(RegExp, 'RegExp is defined');
    assert.ok(zQuery, 'zQuery is defined');
    assert.ok($Z, '$Z is defined');
});

$Q.module('Utilities', {
    setup: function() {
        window.types = $H.types;
        window.obj = $H.obj;
        window.arr = $H.arr;
        window.trim = $H.trim;
        window.validate = $H.validate;
        window.nullify = $H.nullify;
        window.random = $H.random;
        window.extend = $H.extend;
    },
    teardown: function() {
        delete window.types;
        delete window.obj;
        delete window.arr;
        delete window.trim;
        delete window.validate;
        delete window.nullify;
        delete window.random;
        delete window.extend;
    },
});
$Q.test('Object Type', function(assert) {
    for (var i in types)
        if (i.toString().indexOf('|') === -1)
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
    for (var i in validate.arguments)
        assert.ok($Z.validate(validate.arguments[i], validate.types[i]) === true, '\'' + validate.arguments[i] + '\' validated as \'' + validate.types[i] + '\'');
    assert.ok($Z.validate($H.arguments(1, {}), ['number', 'object']), 'Works for more than 1 argument');
    assert.ok($Z.validate($H.arguments(1), ['number|string']), 'Works for multiple types');
    assert.ok($Z.validate($H.arguments(1, 2), [2], false) === false, 'Returns false instead of throwing error when canThrow is passed as false');
});
$Q.test('Trim', function(assert) {
    for (var i in trim)
        assert.ok($Z.trim(i) === trim[i], '\'' + i + '\' trimmed to \'' + trim[i] + '\'');
});
$Q.test('Nullify', function (assert) {
    for (var i in nullify)
        assert.deepEqual($Z.nullify.apply(null, nullify[i].arguments), nullify[i].result, nullify[i].message);
});
$Q.test('Random', function (assert) {
    for(var j=0;j<5;j++)
        for (var i in random)
            assert.ok(random[i].test($Z.random(random[i].array)), 'Correct Random Element Selection from ' + random[i].array);
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
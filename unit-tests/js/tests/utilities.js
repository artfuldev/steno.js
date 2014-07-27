/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js"/>

$Q.module('Utilities');
$Q.test('$Z.objectType', function (assert) {
    assert.expect(22);
    assert.ok($Z.objectType(null) === 'null', 'null identified correctly');
    assert.ok($Z.objectType(undefined) === 'undefined', 'undefined identified correctly');
    assert.ok($Z.objectType() === 'undefined', 'Empty identified correctly as undefined');
    assert.ok($Z.objectType(1) === 'number', 'number identified correctly');
    assert.ok($Z.objectType(new Number(1)) === 'number', 'Number identified correctly as number');
    assert.ok($Z.objectType(parseInt('a')) === 'nan', 'nan identified correctly');
    assert.ok($Z.objectType('') === 'string', 'empty string identified correctly');
    assert.ok($Z.objectType('ha ha ha') === 'string', 'string identified correctly');
    assert.ok($Z.objectType(new String('ha ha ha')) === 'string', 'String identified correctly as string');
    assert.ok($Z.objectType({}) === 'object', 'empty object identified correctly as object');
    assert.ok($Z.objectType({ key: 'value' }) === 'object', 'object identified correctly');
    assert.ok($Z.objectType(new Object()) === 'object', 'Object identified correctly as object');
    assert.ok($Z.objectType([]) === 'array', 'empty array identified correctly as array');
    assert.ok($Z.objectType([1, '2', function() {}, { key: 'value' }]) === 'array', 'array identified correctly as array');
    assert.ok($Z.objectType(new Array()) === 'array', 'Array identified correctly as array');
    assert.ok($Z.objectType(function (){}) === 'function', 'function identified correctly');
    assert.ok($Z.objectType(new Function()) === 'function', 'Function identified correctly as function');
    assert.ok($Z.objectType(/regex/igm) === 'regexp', 'regexp identified correctly');
    assert.ok($Z.objectType(new RegExp("hell", "g")) === 'regexp', 'RegExp identified correctly as regexp');
    assert.ok($Z.objectType(new Date()) === 'date', 'Date identified correctly as date');
    assert.ok($Z.objectType(true) === 'boolean', 'boolean identified correctly');
    assert.ok($Z.objectType(new Boolean()) === 'boolean', 'Boolean identified correctly as boolean');
});
$Q.test('$Z.is', function(assert) {
    assert.expect(24);
    assert.ok($Z.is('null', null), 'null identified correctly');
    assert.ok($Z.is('undefined', undefined), 'undefined identified correctly');
    assert.ok($Z.is('undefined'), 'Empty identified correctly as undefined');
    assert.ok($Z.is('number', 1), 'number identified correctly');
    assert.ok($Z.is('number', new Number(1)), 'Number identified correctly as number');
    assert.ok($Z.is('nan', parseInt('a')), 'nan identified correctly');
    assert.ok($Z.is('string', ''), 'empty string identified correctly');
    assert.ok($Z.is('string', 'ha ha ha'), 'string identified correctly');
    assert.ok($Z.is('string', new String('ha ha ha')), 'String identified correctly as string');
    assert.ok($Z.is('object', {}), 'empty object identified correctly as object');
    assert.ok($Z.is('object', { key: 'value' }), 'object identified correctly');
    assert.ok($Z.is('object', new Object()), 'Object identified correctly as object');
    assert.ok($Z.is('array', []), 'empty array identified correctly as array');
    assert.ok($Z.is('array', [1, '2', function() {}, { key: 'value' }]), 'array identified correctly as array');
    assert.ok($Z.is('array', new Array()), 'Array identified correctly as array');
    assert.ok($Z.is('function', $Q.test), 'function identified correctly');
    assert.ok($Z.is('function', new Function()), 'Function identified correctly as function');
    assert.ok($Z.is('regexp', /regex/igm), 'regexp identified correctly');
    assert.ok($Z.is('regexp', new RegExp("hell", "g")), 'RegExp identified correctly as regexp');
    assert.ok($Z.is('date', new Date()), 'Date identified correctly as date');
    assert.ok($Z.is('boolean', true), 'boolean identified correctly');
    assert.ok($Z.is('boolean', new Boolean()), 'Boolean identified correctly as boolean');
    assert.ok($Z.is('number|string', 1), 'Multi-Type Checking: 1 identified correctly as number|string');
    assert.ok($Z.is('number|string', '1'), 'Multi-Type Checking: \'1\' identified correctly as number|string');
});
$Q.test('$Z.has', function (assert) {
    assert.expect(10);
    var obj =  {
        'key': 'value',
        'key-two': 'value-two'
    }
    var arr = [1, 2];
    arr['key'] = 'value';
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
$Q.test('$Z.validate', function (assert) {
    assert.expect(14);
    var args = function () { return arguments; };
    assert.throws(function () { $Z.validate(); }, 'Invalid Function Call', 'Error thrown when not enough arguments are passed');
    assert.throws(function () { $Z.validate(1); }, 'Invalid Function Call', 'Error thrown when less than 2 arguments is passed');
    assert.throws(function () { $Z.validate(1, 2, 3); }, 'Invalid Function Call', 'Error thrown when more than 2 arguments is passed');
    assert.throws(function () { $Z.validate(1, 2); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate([1], 2); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate(1, [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate([1], [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate(args(1), [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function () { $Z.validate(args(1, 2), [2]); }, 'Invalid Function Call', 'Error thrown when length of arguments is not equal to length of types');
    assert.ok($Z.validate(args(1), ['number']), 'Works for 1 argument');
    assert.ok($Z.validate(args(1, {}), ['number', 'object']), 'Works for more than 1 argument');
    assert.ok($Z.validate(args(1), ['number|string']), 'Works for multiple types');
    assert.ok($Z.validate(args(1, 2), [2], false) === false, 'Returns false instead of throwing error when canThrow is passed as false');
    assert.ok($Z.validate(args(), ['undefined'], false) === true, 'undefined works for empty arguments');
});
$Q.test('$Z.trim', function (assert) {
    assert.expect(13);
    var nbsp = String.fromCharCode(160);
    assert.equal($Z.trim("hello  "), "hello", "trailing space");
    assert.equal($Z.trim("  hello"), "hello", "leading space");
    assert.equal($Z.trim("  hello   "), "hello", "space on both sides");
    assert.equal($Z.trim("  " + nbsp + "hello  " + nbsp + " "), "hello", "&nbsp;");
    assert.equal($Z.trim(), "", "Nothing in.");
    assert.equal($Z.trim(undefined), "", "Undefined");
    assert.equal($Z.trim(null), "", "Null");
    assert.equal($Z.trim(5), "5", "Number");
    assert.equal($Z.trim(false), "false", "Boolean");
    assert.equal($Z.trim(" "), "", "space should be trimmed");
    assert.equal($Z.trim("ipad\xA0"), "ipad", "nbsp should be trimmed");
    assert.equal($Z.trim("\uFEFF"), "", "zwsp should be trimmed");
    assert.equal($Z.trim("\uFEFF \xA0! | \uFEFF"), "! |", "leading/trailing should be trimmed");
});
$Q.test('$Z.nullify', function (assert) {
    assert.expect(10);
    assert.deepEqual($Z.nullify([null, 0, 12], 8), [8, 0, 12], 'Can insert number');
    assert.deepEqual($Z.nullify([null, 0, 12], '8'), ['8', 0, 12], 'Can insert string');
    assert.deepEqual($Z.nullify([null, 0, 12], true), [true, 0, 12], 'Can insert boolean');
    assert.deepEqual($Z.nullify([null, 0, 12], { key: 'value' }), [{ key: 'value' }, 0, 12], 'Can insert object');
    assert.deepEqual($Z.nullify([null, 0, 12], ['value']), [['value'], 0, 12], 'Can insert array');
    assert.deepEqual($Z.nullify([null, 0, 12], $Q.test), [$Q.test, 0, 12], 'Can insert function');
    assert.deepEqual($Z.nullify([null, 0, 12], 8), [8, 0, 12], 'Works with null');
    assert.deepEqual($Z.nullify([undefined, 0, 12], 8), [8, 0, 12], 'Works with undefined');
    assert.deepEqual($Z.nullify([null, undefined, 0, 12], 8), [8, 8, 0, 12], 'Works with both');
    assert.deepEqual($Z.nullify([null, undefined, 0, 12, undefined, null], 8), [8, 8, 0, 12, 8, 8], 'Works with both, in repetition and in disorder');
});
$Q.test('$Z.random', function (assert) {
    assert.expect(2);
    assert.ok($Z.random([1])==1, 'Identity');
    assert.ok(0 < $Z.random([1, 2, 3, 4, 5]) < 6, 'Correct Random Element Selection');
});
$Q.test("$Z.extend", function (assert) {
    assert.expect(1);
    assert.ok(true, 'Derived from the heavily-tested jQuery.extend, so skipped');
});

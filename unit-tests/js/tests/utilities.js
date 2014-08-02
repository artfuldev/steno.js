/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js"/>

$Q.module('Utilities');
$Q.test('$Z.objectType', function(assert) {
    assert.expect(22);
    assert.strictEqual($Z.objectType(null), 'null', 'null identified correctly');
    assert.strictEqual($Z.objectType(undefined), 'undefined', 'undefined identified correctly');
    assert.strictEqual($Z.objectType(), 'undefined', 'Empty identified correctly as undefined');
    assert.strictEqual($Z.objectType(1), 'number', 'number identified correctly');
    assert.strictEqual($Z.objectType(new Number(1)), 'number', 'Number identified correctly as number');
    assert.strictEqual($Z.objectType(parseInt('a')), 'nan', 'nan identified correctly');
    assert.strictEqual($Z.objectType(''), 'string', 'empty string identified correctly');
    assert.strictEqual($Z.objectType('ha ha ha'), 'string', 'string identified correctly');
    assert.strictEqual($Z.objectType(new String('ha ha ha')), 'string', 'String identified correctly as string');
    assert.strictEqual($Z.objectType({}), 'object', 'empty object identified correctly as object');
    assert.strictEqual($Z.objectType({ key: 'value' }), 'object', 'object identified correctly');
    assert.strictEqual($Z.objectType(new Object()), 'object', 'Object identified correctly as object');
    assert.strictEqual($Z.objectType([]), 'array', 'empty array identified correctly as array');
    assert.strictEqual($Z.objectType([1, '2', function() {}, { key: 'value' }]), 'array', 'array identified correctly as array');
    assert.strictEqual($Z.objectType(new Array()), 'array', 'Array identified correctly as array');
    assert.strictEqual($Z.objectType(function() {}), 'function', 'function identified correctly');
    assert.strictEqual($Z.objectType(new Function()), 'function', 'Function identified correctly as function');
    assert.strictEqual($Z.objectType(/regex/igm), 'regexp', 'regexp identified correctly');
    assert.strictEqual($Z.objectType(new RegExp("hell", "g")), 'regexp', 'RegExp identified correctly as regexp');
    assert.strictEqual($Z.objectType(new Date()), 'date', 'Date identified correctly as date');
    assert.strictEqual($Z.objectType(true), 'boolean', 'boolean identified correctly');
    assert.strictEqual($Z.objectType(new Boolean()), 'boolean', 'Boolean identified correctly as boolean');
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
$Q.test('$Z.has', function(assert) {
    assert.expect(10);
    var obj = {
        'key': 'value',
        'key-two': 'value-two'
    }
    var arr = [1, 2];
    arr['key'] = 'value';
    assert.strictEqual($Z.has('key', obj), true, 'Matches for Object');
    assert.strictEqual($Z.has('key-two', obj), true, 'Matches for Object');
    assert.strictEqual($Z.has('key-three', obj), false, 'Returns false for bad key of Object');
    assert.strictEqual($Z.has('1', arr), true, 'Matches for Array - String Index');
    assert.strictEqual($Z.has('0', arr), true, 'Matches for Array');
    assert.strictEqual($Z.has(1, arr), true, 'Matches for Array - Numeric Index');
    assert.strictEqual($Z.has(0, arr), true, 'Matches for Array');
    assert.strictEqual($Z.has(2, arr), false, 'Returns false for bad key of Array');
    assert.strictEqual($Z.has('key', arr), true, 'Matches for Array');
    assert.strictEqual($Z.has('key-three', arr), false, 'Returns false for bad key of Array');
});
$Q.test('$Z.validate', function(assert) {
    assert.expect(14);
    var args = function() { return arguments; };
    assert.throws(function() { $Z.validate(); }, 'Invalid Function Call', 'Error thrown when not enough arguments are passed');
    assert.throws(function() { $Z.validate(1); }, 'Invalid Function Call', 'Error thrown when less than 2 arguments is passed');
    assert.throws(function() { $Z.validate(1, 2, 3); }, 'Invalid Function Call', 'Error thrown when more than 2 arguments is passed');
    assert.throws(function() { $Z.validate(1, 2); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function() { $Z.validate([1], 2); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function() { $Z.validate(1, [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function() { $Z.validate([1], [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function() { $Z.validate(args(1), [2]); }, 'Invalid Function Call', 'Error thrown when 2 arguments of invalid type are passed');
    assert.throws(function() { $Z.validate(args(1, 2), [2]); }, 'Invalid Function Call', 'Error thrown when length of arguments is not equal to length of types');
    assert.ok($Z.validate(args(1), ['number']), 'Works for 1 argument');
    assert.ok($Z.validate(args(1, {}), ['number', 'object']), 'Works for more than 1 argument');
    assert.ok($Z.validate(args(1), ['number|string']), 'Works for multiple types');
    assert.strictEqual($Z.validate(args(1, 2), [2], false), false, 'Returns false instead of throwing error when canThrow is passed as false');
    assert.strictEqual($Z.validate(args(), ['undefined'], false), true, 'undefined works for empty arguments');
});
$Q.test('$Z.trim', function(assert) {
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
$Q.test('$Z.nullify', function(assert) {
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
$Q.test('$Z.random', function(assert) {
    assert.expect(2);
    assert.strictEqual($Z.random([1]), 1, 'Identity');
    assert.ok(0 < $Z.random([1, 2, 3, 4, 5]) < 6, 'Correct Random Element Selection');
});
$Q.test("$Z.extend", function(assert) {
    assert.expect(30);

    var empty, optionsWithLength, optionsWithDate, myKlass,
		customObject, optionsWithCustomObject, MyNumber, ret,
		nullUndef, target, recursive, obj,
		defaults, defaultsCopy, options1, options1Copy, options2, options2Copy, merged2,
		settings = { "xnumber1": 5, "xnumber2": 7, "xstring1": "peter", "xstring2": "pan" },
		options = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" },
		optionsCopy = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" },
		merged = { "xnumber1": 5, "xnumber2": 1, "xstring1": "peter", "xstring2": "x", "xxx": "newstring" },
		deep1 = { "foo": { "bar": true } },
		deep2 = { "foo": { "baz": true }, "foo2": document },
		deep2copy = { "foo": { "baz": true }, "foo2": document },
		deepmerged = { "foo": { "bar": true, "baz": true }, "foo2": document },
		arr = [1, 2, 3],
		nestedarray = { "arr": arr };

    $Z.extend(settings, options);
    assert.deepEqual(settings, merged, "Check if extended: settings must be extended");
    assert.deepEqual(options, optionsCopy, "Check if not modified: options must not be modified");

    $Z.extend(settings, null, options);
    assert.deepEqual(settings, merged, "Check if extended: settings must be extended");
    assert.deepEqual(options, optionsCopy, "Check if not modified: options must not be modified");

    $Z.extend(true, deep1, deep2);
    assert.deepEqual(deep1["foo"], deepmerged["foo"], "Check if foo: settings must be extended");
    assert.deepEqual(deep2["foo"], deep2copy["foo"], "Check if not deep2: options must not be modified");
    assert.equal(deep1["foo2"], document, "Make sure that a deep clone was not attempted on the document");

    assert.ok($Z.extend(true, {}, nestedarray)["arr"] !== arr, "Deep extend of object must clone child array");

    assert.ok($Z.is('array',$Z.extend(true, { "arr": {} }, nestedarray)["arr"]), "Cloned array has to be an Array");
    assert.ok($Z.is('plain object', $Z.extend(true, { "arr": arr }, { "arr": {} })["arr"]), "Cloned object has to be an plain object");

    empty = {};
    optionsWithLength = { "foo": { "length": -1 } };
    $Z.extend(true, empty, optionsWithLength);
    assert.deepEqual(empty["foo"], optionsWithLength["foo"], "The length property must copy correctly");

    empty = {};
    optionsWithDate = { "foo": { "date": new Date() } };
    $Z.extend(true, empty, optionsWithDate);
    assert.deepEqual(empty["foo"], optionsWithDate["foo"], "Dates copy correctly");

    /** @constructor */
    myKlass = function () { };
    customObject = new myKlass();
    optionsWithCustomObject = { "foo": { "date": customObject } };
    empty = {};
    $Z.extend(true, empty, optionsWithCustomObject);
    assert.ok(empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly (no methods)");

    // Makes the class a little more realistic
    myKlass.prototype = { "someMethod": function () { } };
    empty = {};
    $Z.extend(true, empty, optionsWithCustomObject);
    assert.ok(empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly");

    MyNumber = Number;

    ret = $Z.extend(true, { "foo": 4 }, { "foo": new MyNumber(5) });
    assert.ok(parseInt(ret.foo, 10) === 5, "Wrapped numbers copy correctly");

    nullUndef = $Z.extend({}, options, { "xnumber2": null });
    assert.ok(nullUndef["xnumber2"] === null, "Check to make sure null values are copied");

    nullUndef = $Z.extend({}, options, { "xnumber2": undefined });
    assert.ok(nullUndef["xnumber2"] === options["xnumber2"], "Check to make sure undefined values are not copied");

    nullUndef = $Z.extend({}, options, { "xnumber0": null });
    assert.ok(nullUndef["xnumber0"] === null, "Check to make sure null values are inserted");

    target = {};
    recursive = { foo: target, bar: 5 };
    $Z.extend(true, target, recursive);
    assert.deepEqual(target, { bar: 5 }, "Check to make sure a recursive obj doesn't go into a  never-ending loop by not copying it over");

    ret = $Z.extend(true, { foo: [] }, { foo: [0] }); // 1907
    assert.equal(ret.foo.length, 1, "Check to make sure a value with coercion 'false' copies over when necessary to fix #1907");

    ret = $Z.extend(true, { foo: "1,2,3" }, { foo: [1, 2, 3] });
    assert.ok(typeof ret.foo !== "string", "Check to make sure values equal with coercion (but not actually equal) overwrite correctly");

    ret = $Z.extend(true, { foo: "bar" }, { foo: null });
    assert.ok(typeof ret.foo !== "undefined", "Make sure a null value doesn't crash with deep extend, for #1908");

    obj = { foo: null };
    $Z.extend(true, obj, { foo: "notnull" });
    assert.equal(obj.foo, "notnull", "Make sure a null value can be overwritten");

    function func() { }
    $Z.extend(func, { key: "value" });
    assert.equal(func.key, "value", "Verify a function can be extended");

    defaults = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" };
    defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" };
    options1 = { xnumber2: 1, xstring2: "x" };
    options1Copy = { xnumber2: 1, xstring2: "x" };
    options2 = { xstring2: "xx", xxx: "newstringx" };
    options2Copy = { xstring2: "xx", xxx: "newstringx" };
    merged2 = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "xx", xxx: "newstringx" };

    settings = $Z.extend({}, defaults, options1, options2);
    assert.deepEqual(settings, merged2, "Check if extended: settings must be extended");
    assert.deepEqual(defaults, defaultsCopy, "Check if not modified: options1 must not be modified");
    assert.deepEqual(options1, options1Copy, "Check if not modified: options1 must not be modified");
    assert.deepEqual(options2, options2Copy, "Check if not modified: options2 must not be modified");

    var result, initial = {
        array: [1, 2, 3, 4],
        object: {}
    };

    result = $Z.extend(true, {}, initial);

    assert.deepEqual(result, initial, "The [result] and [initial] have equal shape and values");
    assert.ok(!$Z.is('array', result.object), "result.object wasn't paved with an empty array");
});

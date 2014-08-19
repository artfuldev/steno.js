/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/steno.js" />
/// <reference path="../tests/tests.js"/>

$Q.module('Utilities');
$Q.test('steno.objectType', function(assert) {
    assert.expect(22);
    assert.strictEqual(steno.objectType(null), 'null', 'null identified correctly');
    assert.strictEqual(steno.objectType(undefined), 'undefined', 'undefined identified correctly');
    assert.strictEqual(steno.objectType(), 'undefined', 'Empty identified correctly as undefined');
    assert.strictEqual(steno.objectType(1), 'number', 'number identified correctly');
    assert.strictEqual(steno.objectType(new Number(1)), 'number', 'Number identified correctly as number');
    assert.strictEqual(steno.objectType(parseInt('a')), 'nan', 'nan identified correctly');
    assert.strictEqual(steno.objectType(''), 'string', 'empty string identified correctly');
    assert.strictEqual(steno.objectType('ha ha ha'), 'string', 'string identified correctly');
    assert.strictEqual(steno.objectType(new String('ha ha ha')), 'string', 'String identified correctly as string');
    assert.strictEqual(steno.objectType({}), 'object', 'empty object identified correctly as object');
    assert.strictEqual(steno.objectType({ key: 'value' }), 'object', 'object identified correctly');
    assert.strictEqual(steno.objectType(new Object()), 'object', 'Object identified correctly as object');
    assert.strictEqual(steno.objectType([]), 'array', 'empty array identified correctly as array');
    assert.strictEqual(steno.objectType([1, '2', function() {}, { key: 'value' }]), 'array', 'array identified correctly as array');
    assert.strictEqual(steno.objectType(new Array()), 'array', 'Array identified correctly as array');
    assert.strictEqual(steno.objectType(function() {}), 'function', 'function identified correctly');
    assert.strictEqual(steno.objectType(new Function()), 'function', 'Function identified correctly as function');
    assert.strictEqual(steno.objectType(/regex/igm), 'regexp', 'regexp identified correctly');
    assert.strictEqual(steno.objectType(new RegExp("hell", "g")), 'regexp', 'RegExp identified correctly as regexp');
    assert.strictEqual(steno.objectType(new Date()), 'date', 'Date identified correctly as date');
    assert.strictEqual(steno.objectType(true), 'boolean', 'boolean identified correctly');
    assert.strictEqual(steno.objectType(new Boolean()), 'boolean', 'Boolean identified correctly as boolean');
});
$Q.test('steno.is', function(assert) {
    assert.expect(24);
    assert.ok(steno.is('null', null), 'null identified correctly');
    assert.ok(steno.is('undefined', undefined), 'undefined identified correctly');
    assert.ok(steno.is('undefined'), 'Empty identified correctly as undefined');
    assert.ok(steno.is('number', 1), 'number identified correctly');
    assert.ok(steno.is('number', new Number(1)), 'Number identified correctly as number');
    assert.ok(steno.is('nan', parseInt('a')), 'nan identified correctly');
    assert.ok(steno.is('string', ''), 'empty string identified correctly');
    assert.ok(steno.is('string', 'ha ha ha'), 'string identified correctly');
    assert.ok(steno.is('string', new String('ha ha ha')), 'String identified correctly as string');
    assert.ok(steno.is('object', {}), 'empty object identified correctly as object');
    assert.ok(steno.is('object', { key: 'value' }), 'object identified correctly');
    assert.ok(steno.is('object', new Object()), 'Object identified correctly as object');
    assert.ok(steno.is('array', []), 'empty array identified correctly as array');
    assert.ok(steno.is('array', [1, '2', function() {}, { key: 'value' }]), 'array identified correctly as array');
    assert.ok(steno.is('array', new Array()), 'Array identified correctly as array');
    assert.ok(steno.is('function', $Q.test), 'function identified correctly');
    assert.ok(steno.is('function', new Function()), 'Function identified correctly as function');
    assert.ok(steno.is('regexp', /regex/igm), 'regexp identified correctly');
    assert.ok(steno.is('regexp', new RegExp("hell", "g")), 'RegExp identified correctly as regexp');
    assert.ok(steno.is('date', new Date()), 'Date identified correctly as date');
    assert.ok(steno.is('boolean', true), 'boolean identified correctly');
    assert.ok(steno.is('boolean', new Boolean()), 'Boolean identified correctly as boolean');
    assert.ok(steno.is('number|string', 1), 'Multi-Type Checking: 1 identified correctly as number|string');
    assert.ok(steno.is('number|string', '1'), 'Multi-Type Checking: \'1\' identified correctly as number|string');
});
$Q.test('steno.has', function(assert) {
    assert.expect(10);
    var obj = {
        'key': 'value',
        'key-two': 'value-two'
    }
    var arr = [1, 2];
    arr['key'] = 'value';
    assert.strictEqual(steno.has('key', obj), true, 'Matches for Object');
    assert.strictEqual(steno.has('key-two', obj), true, 'Matches for Object');
    assert.strictEqual(steno.has('key-three', obj), false, 'Returns false for bad key of Object');
    assert.strictEqual(steno.has('1', arr), true, 'Matches for Array - String Index');
    assert.strictEqual(steno.has('0', arr), true, 'Matches for Array');
    assert.strictEqual(steno.has(1, arr), true, 'Matches for Array - Numeric Index');
    assert.strictEqual(steno.has(0, arr), true, 'Matches for Array');
    assert.strictEqual(steno.has(2, arr), false, 'Returns false for bad key of Array');
    assert.strictEqual(steno.has('key', arr), true, 'Matches for Array');
    assert.strictEqual(steno.has('key-three', arr), false, 'Returns false for bad key of Array');
});
$Q.test('steno.trim', function(assert) {
    assert.expect(13);
    var nbsp = String.fromCharCode(160);
    assert.equal(steno.trim("hello  "), "hello", "trailing space");
    assert.equal(steno.trim("  hello"), "hello", "leading space");
    assert.equal(steno.trim("  hello   "), "hello", "space on both sides");
    assert.equal(steno.trim("  " + nbsp + "hello  " + nbsp + " "), "hello", "&nbsp;");
    assert.equal(steno.trim(), "", "Nothing in.");
    assert.equal(steno.trim(undefined), "", "Undefined");
    assert.equal(steno.trim(null), "", "Null");
    assert.equal(steno.trim(5), "5", "Number");
    assert.equal(steno.trim(false), "false", "Boolean");
    assert.equal(steno.trim(" "), "", "space should be trimmed");
    assert.equal(steno.trim("ipad\xA0"), "ipad", "nbsp should be trimmed");
    assert.equal(steno.trim("\uFEFF"), "", "zwsp should be trimmed");
    assert.equal(steno.trim("\uFEFF \xA0! | \uFEFF"), "! |", "leading/trailing should be trimmed");
});
$Q.test('steno.nullify', function(assert) {
    assert.expect(10);
    assert.deepEqual(steno.nullify([null, 0, 12], 8), [8, 0, 12], 'Can insert number');
    assert.deepEqual(steno.nullify([null, 0, 12], '8'), ['8', 0, 12], 'Can insert string');
    assert.deepEqual(steno.nullify([null, 0, 12], true), [true, 0, 12], 'Can insert boolean');
    assert.deepEqual(steno.nullify([null, 0, 12], { key: 'value' }), [{ key: 'value' }, 0, 12], 'Can insert object');
    assert.deepEqual(steno.nullify([null, 0, 12], ['value']), [['value'], 0, 12], 'Can insert array');
    assert.deepEqual(steno.nullify([null, 0, 12], $Q.test), [$Q.test, 0, 12], 'Can insert function');
    assert.deepEqual(steno.nullify([null, 0, 12], 8), [8, 0, 12], 'Works with null');
    assert.deepEqual(steno.nullify([undefined, 0, 12], 8), [8, 0, 12], 'Works with undefined');
    assert.deepEqual(steno.nullify([null, undefined, 0, 12], 8), [8, 8, 0, 12], 'Works with both');
    assert.deepEqual(steno.nullify([null, undefined, 0, 12, undefined, null], 8), [8, 8, 0, 12, 8, 8], 'Works with both, in repetition and in disorder');
});
$Q.test('steno.random', function(assert) {
    assert.expect(2);
    assert.strictEqual(steno.random([1]), 1, 'Identity');
    assert.ok(0 < steno.random([1, 2, 3, 4, 5]) < 6, 'Correct Random Element Selection');
});
$Q.test("steno.extend", function(assert) {
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

    steno.extend(settings, options);
    assert.deepEqual(settings, merged, "Check if extended: settings must be extended");
    assert.deepEqual(options, optionsCopy, "Check if not modified: options must not be modified");

    steno.extend(settings, null, options);
    assert.deepEqual(settings, merged, "Check if extended: settings must be extended");
    assert.deepEqual(options, optionsCopy, "Check if not modified: options must not be modified");

    steno.extend(true, deep1, deep2);
    assert.deepEqual(deep1["foo"], deepmerged["foo"], "Check if foo: settings must be extended");
    assert.deepEqual(deep2["foo"], deep2copy["foo"], "Check if not deep2: options must not be modified");
    assert.equal(deep1["foo2"], document, "Make sure that a deep clone was not attempted on the document");

    assert.ok(steno.extend(true, {}, nestedarray)["arr"] !== arr, "Deep extend of object must clone child array");

    assert.ok(steno.is('array',steno.extend(true, { "arr": {} }, nestedarray)["arr"]), "Cloned array has to be an Array");
    assert.ok(steno.is('plain object', steno.extend(true, { "arr": arr }, { "arr": {} })["arr"]), "Cloned object has to be an plain object");

    empty = {};
    optionsWithLength = { "foo": { "length": -1 } };
    steno.extend(true, empty, optionsWithLength);
    assert.deepEqual(empty["foo"], optionsWithLength["foo"], "The length property must copy correctly");

    empty = {};
    optionsWithDate = { "foo": { "date": new Date() } };
    steno.extend(true, empty, optionsWithDate);
    assert.deepEqual(empty["foo"], optionsWithDate["foo"], "Dates copy correctly");

    /** @constructor */
    myKlass = function () { };
    customObject = new myKlass();
    optionsWithCustomObject = { "foo": { "date": customObject } };
    empty = {};
    steno.extend(true, empty, optionsWithCustomObject);
    assert.ok(empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly (no methods)");

    // Makes the class a little more realistic
    myKlass.prototype = { "someMethod": function () { } };
    empty = {};
    steno.extend(true, empty, optionsWithCustomObject);
    assert.ok(empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly");

    MyNumber = Number;

    ret = steno.extend(true, { "foo": 4 }, { "foo": new MyNumber(5) });
    assert.ok(parseInt(ret.foo, 10) === 5, "Wrapped numbers copy correctly");

    nullUndef = steno.extend({}, options, { "xnumber2": null });
    assert.ok(nullUndef["xnumber2"] === null, "Check to make sure null values are copied");

    nullUndef = steno.extend({}, options, { "xnumber2": undefined });
    assert.ok(nullUndef["xnumber2"] === options["xnumber2"], "Check to make sure undefined values are not copied");

    nullUndef = steno.extend({}, options, { "xnumber0": null });
    assert.ok(nullUndef["xnumber0"] === null, "Check to make sure null values are inserted");

    target = {};
    recursive = { foo: target, bar: 5 };
    steno.extend(true, target, recursive);
    assert.deepEqual(target, { bar: 5 }, "Check to make sure a recursive obj doesn't go into a  never-ending loop by not copying it over");

    ret = steno.extend(true, { foo: [] }, { foo: [0] }); // 1907
    assert.equal(ret.foo.length, 1, "Check to make sure a value with coercion 'false' copies over when necessary to fix #1907");

    ret = steno.extend(true, { foo: "1,2,3" }, { foo: [1, 2, 3] });
    assert.ok(typeof ret.foo !== "string", "Check to make sure values equal with coercion (but not actually equal) overwrite correctly");

    ret = steno.extend(true, { foo: "bar" }, { foo: null });
    assert.ok(typeof ret.foo !== "undefined", "Make sure a null value doesn't crash with deep extend, for #1908");

    obj = { foo: null };
    steno.extend(true, obj, { foo: "notnull" });
    assert.equal(obj.foo, "notnull", "Make sure a null value can be overwritten");

    function func() { }
    steno.extend(func, { key: "value" });
    assert.equal(func.key, "value", "Verify a function can be extended");

    defaults = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" };
    defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" };
    options1 = { xnumber2: 1, xstring2: "x" };
    options1Copy = { xnumber2: 1, xstring2: "x" };
    options2 = { xstring2: "xx", xxx: "newstringx" };
    options2Copy = { xstring2: "xx", xxx: "newstringx" };
    merged2 = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "xx", xxx: "newstringx" };

    settings = steno.extend({}, defaults, options1, options2);
    assert.deepEqual(settings, merged2, "Check if extended: settings must be extended");
    assert.deepEqual(defaults, defaultsCopy, "Check if not modified: options1 must not be modified");
    assert.deepEqual(options1, options1Copy, "Check if not modified: options1 must not be modified");
    assert.deepEqual(options2, options2Copy, "Check if not modified: options2 must not be modified");

    var result, initial = {
        array: [1, 2, 3, 4],
        object: {}
    };

    result = steno.extend(true, {}, initial);

    assert.deepEqual(result, initial, "The [result] and [initial] have equal shape and values");
    assert.ok(!steno.is('array', result.object), "result.object wasn't paved with an empty array");
});

/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js"/>

$Q.module('Requirements');
$Q.test('Basic Requirements', function(assert) {
    assert.expect(11);
    assert.notStrictEqual(typeof window, 'undefined', 'Window reference is obtainable');
    assert.notStrictEqual(window, null, 'Window is not null');
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
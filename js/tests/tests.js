/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />
/// <reference path="../tests/helpers.js" />

$Q.module("Single Element Extractors", {
    setup: function() {
        window.testObjects = initForSingle();
    },
    teardown: function() {
        window.testObjects = [];
    }
});

$Q.test('Name', function (assert) {
    assert.throws(function () { $Z.name(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.name(1, 2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.name(undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.name(null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.name([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.name({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object');
    assert.throws(function () { $Z.name(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.name('work'), 'work', 'Proper reply when valid arguments are passed - string');
    assert.deepEqual($Z.name(new String('work')), 'work', 'Proper reply when valid arguments are passed - String');
    for (var i in testObjects)
        assert.deepEqual($Z.name(testObjects[i].string), testObjects[i].name, 'Element in \'' + testObjects[i].string + '\' is \'' + testObjects[i].name + '\'');
});
$Q.test('Id', function (assert) {
    assert.throws(function () { $Z.id(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.id(1, 2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.id(undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.id(null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.id([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.id({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object');
    assert.throws(function () { $Z.id(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.id('work'), '', 'Proper reply when valid arguments are passed - string');
    assert.deepEqual($Z.id(new String('work')), '', 'Proper reply when valid arguments are passed - String');
    for (var i in testObjects)
        assert.deepEqual($Z.id(testObjects[i].string), testObjects[i].id, 'Id in \'' + testObjects[i].string + '\' is \'' + testObjects[i].id + '\'');
});
$Q.test('Classes', function (assert) {
    assert.throws(function () { $Z.classes(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.classes(1, 2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.classes(undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.classes(null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.classes([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.classes({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object');
    assert.throws(function () { $Z.classes(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.classes('work'), [], 'Proper reply when valid arguments are passed - string');
    assert.deepEqual($Z.classes(new String('work')), [], 'Proper reply when valid arguments are passed - String');
    for (var i in testObjects)
        assert.deepEqual($Z.classes(testObjects[i].string), testObjects[i].classes, 'Classes in \'' + testObjects[i].string + '\' are \'' + testObjects[i].classes + '\'');
});
$Q.test('Attributes', function (assert) {
    assert.throws(function () { $Z.attributes(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.attributes(1, 2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.attributes(undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.attributes(null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.attributes([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.attributes({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object');
    assert.throws(function () { $Z.attributes(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.attributes('work'), {}, 'Proper reply when valid arguments are passed - string');
    assert.deepEqual($Z.attributes(new String('work')), {}, 'Proper reply when valid arguments are passed - String');
    for (var i in testObjects)
        assert.deepEqual($Z.attributes(testObjects[i].string), testObjects[i].attributes, 'Attributes in \'' + testObjects[i].string + '\' are \'' + testObjects[i].attributes + '\'');
});
$Q.test('Elements', function (assert) {
    assert.throws(function () { $Z.element(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.element(1, 2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.element(undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.element(null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.element([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.element({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object');
    assert.throws(function () { $Z.element(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.element('work'), {
        parent: null,
        name: 'work',
        attributes: {},
        children: [],
    }, 'Proper reply when valid arguments are passed - string');
    assert.deepEqual($Z.element(new String('work')), {
        parent: null,
        name: 'work',
        attributes: {},
        children: [],
    }, 'Proper reply when valid arguments are passed - String');
    for (var i in testObjects)
        assert.deepEqual($Z.element(testObjects[i].string), testObjects[i].element, 'Elements in \'' + testObjects[i].string + '\' retreived successfully');
});
$Q.test('Html', function(assert) {
    assert.throws(function () { $Z.html(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.html(1,2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.html(undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.html(null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.html([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.html({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Empty Object');
    assert.throws(function () { $Z.html({something:''}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object with not the right parameters');
    assert.throws(function () { $Z.html(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.html($Z.element('work')), '<work></work>', 'Proper reply when valid arguments are passed - element');
    assert.deepEqual($Z.html($Z.element(new String('work'))), '<work></work>', 'Proper reply when valid arguments are passed - element');
    for (var i in testObjects)
        assert.deepEqual($Z.html($Z.element(testObjects[i].string)), testObjects[i].html,
                            'Elements in \'' + testObjects[i].string + '\' have html \'' + testObjects[i].html + '\'');  
});

$Q.module("Multiple Element Extractors")
/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />
/// <reference path="../tests/helpers.js" />

$Q.module("Single Element Extractors");

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
    for (var i in selectors)
        assert.deepEqual($Z.name(selectors[i].string), selectors[i].name, 'Element in \'' + selectors[i].string + '\' is \'' + selectors[i].name + '\'');
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
    for (var i in selectors)
        assert.deepEqual($Z.id(selectors[i].string), selectors[i].id, 'Id in \'' + selectors[i].string + '\' is \'' + selectors[i].id + '\'');
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
    for (var i in selectors)
        assert.deepEqual($Z.classes(selectors[i].string), selectors[i].classes, 'Classes in \'' + selectors[i].string + '\' are \'' + selectors[i].classes + '\'');
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
    for (var i in selectors)
        assert.deepEqual($Z.attributes(selectors[i].string), selectors[i].attributes, 'Attributes in \'' + selectors[i].string + '\' are \'' + selectors[i].attributes + '\'');
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
        name: 'work',
        id: '',
        classes: [],
        attributes: {},
        children: [],
    }, 'Proper reply when valid arguments are passed - string');
    assert.deepEqual($Z.element(new String('work')), {
        name: 'work',
        id: '',
        classes: [],
        attributes: {},
        children: [],
    }, 'Proper reply when valid arguments are passed - String');
    for (var i in selectors)
        assert.deepEqual($Z.element(selectors[i].string), selectors[i].element, 'Elements in \'' + selectors[i].string + '\' retreived successfully');
});
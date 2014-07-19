/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />

$Q = QUnit;
$Z = ZenQuery;

//Tests to come here

$Q.module("Single Element Extractors");

$Q.test('Element', function(assert) {
    assert.expect(8);
    assert.throws(function () { $Z.render(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.render(1,2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.render([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.render({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.render(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.render('work'), '<work></work>', 'Proper HTML reply when valid arguments are passed - string');
    assert.deepEqual($Z.render(new String('work')), '<work></work>', 'Proper HTML reply when valid arguments are passed - String');
    assert.deepEqual($Z.render(''), '<div></div>', 'Empty Elements mean divs');
});
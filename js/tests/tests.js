/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />

$Q = QUnit;
$Z = ZenQuery;

//Tests to come here

$Q.module("Single Element Extractors");

$Q.test('Html', function (assert) {
    assert.expect(19);
    assert.throws(function () { $Z.html(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.html(1, 2, 3); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 2 inputs are passed');
    assert.throws(function () { $Z.html(undefined, undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.html(null, null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.html([],[]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.html({}, {}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object');
    assert.throws(function () { $Z.html(1,2); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.html('work', {}), '<work></work>', 'Proper HTML reply when valid arguments are passed - string');
    assert.deepEqual($Z.html(new String('work'), {}), '<work></work>', 'Proper HTML reply when valid arguments are passed - String');
    assert.deepEqual($Z.html('', {}), '<div></div>', 'Empty Elements mean divs');
    assert.deepEqual($Z.html('work#menu', {}), '<work id="menu"></work>', 'Proper HTML when id is passed');
    assert.deepEqual($Z.html('work.menu', {}), '<work class="menu"></work>', 'Proper HTML when class is passed');
    assert.deepEqual($Z.html('work.dropdown.dropdown-menu', {}), '<work class="dropdown dropdown-menu"></work>', 'Proper HTML when multiple classes are passed');
    assert.deepEqual($Z.html('work#menu.dropdown.dropdown-menu', {}), '<work id="menu" class="dropdown dropdown-menu"></work>', 'Proper HTML when id and classes are passed together');
    assert.deepEqual($Z.html('work.dropdown#menu.dropdown-menu', {}), '<work id="menu" class="dropdown dropdown-menu"></work>', 'Proper HTML when order is not maintained');
    assert.deepEqual($Z.html('.dropdown#menu.dropdown-menu', {}), '<div id="menu" class="dropdown dropdown-menu"></div>', 'Empty Elements mean divs when classes and id are provided');
    assert.deepEqual($Z.html('work', {prefix:'<div>'}), '<div><work></work>', 'Proper HTML reply when prefix is passed');
    assert.deepEqual($Z.html('work#menu', { suffix: '</div>' }), '<work id="menu"></work></div>', 'Proper HTML reply when suffix is passed');
    assert.deepEqual($Z.html('work.dropdown#menu.dropdown-menu',
        {
            prefix: '<div class="prefix">',
            suffix: '</div>'
        }), '<div class="prefix"><work id="menu" class="dropdown dropdown-menu"></work></div>', 'Proper HTML when both prefix and suffix are passed');
});
$Q.test('Render', function(assert) {
    assert.expect(16);
    assert.throws(function () { $Z.render(); }, new Error('Incorrect Number of Arguments'), 'Error thrown when no input is passed');
    assert.throws(function () { $Z.render(1, 2); }, new Error('Incorrect Number of Arguments'), 'Error thrown when more than 1 input is passed');
    assert.throws(function () { $Z.render(undefined); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Undefined');
    assert.throws(function () { $Z.render(null); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Null');
    assert.throws(function () { $Z.render([]); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Array');
    assert.throws(function () { $Z.render({}); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Object');
    assert.throws(function () { $Z.render(1); }, new Error('Invalid Arguments'), 'Error thrown when invalid input is passed - Number');
    assert.deepEqual($Z.render('work'), '<work></work>', 'Proper HTML reply when valid arguments are passed - string');
    assert.deepEqual($Z.render(new String('work')), '<work></work>', 'Proper HTML reply when valid arguments are passed - String');
    assert.deepEqual($Z.render(''), '<div></div>', 'Empty Elements mean divs');
    assert.deepEqual($Z.render('work#menu'), '<work id="menu"></work>', 'Proper HTML when id is passed');
    assert.deepEqual($Z.render('work.menu'), '<work class="menu"></work>', 'Proper HTML when class is passed');
    assert.deepEqual($Z.render('work.dropdown.dropdown-menu'), '<work class="dropdown dropdown-menu"></work>', 'Proper HTML when multiple classes are passed');
    assert.deepEqual($Z.render('work#menu.dropdown.dropdown-menu'), '<work id="menu" class="dropdown dropdown-menu"></work>', 'Proper HTML when id and classes are passed together');
    assert.deepEqual($Z.render('work.dropdown#menu.dropdown-menu'), '<work id="menu" class="dropdown dropdown-menu"></work>', 'Proper HTML when order is not maintained');
    assert.deepEqual($Z.render('.dropdown#menu.dropdown-menu'), '<div id="menu" class="dropdown dropdown-menu"></div>', 'Empty Elements mean divs when classes and id are provided');
});
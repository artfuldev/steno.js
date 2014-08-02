/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js" />

$Q.module('Core');
$Q.test('$Z.classes', function (assert) {

    // Expectations
    assert.expect(5);

    // Assertions
    assert.equal($Z.classes(''), '', 'Empty String');
    assert.equal($Z.classes('.menu'), 'menu', 'Single Class');
    assert.equal($Z.classes('.menu-item'), 'menu-item', 'Single Hyphenated Class');
    assert.equal($Z.classes('.menu.item'), 'menu item', 'Multiple Classes');
    assert.equal($Z.classes('.menu-item.item-empty'), 'menu-item item-empty', 'Multiple Hyphenated Classes');
});
$Q.test('$Z.attributes', function (assert) {

    // Expectations
    assert.expect(8);

    // Variables
    var string, result;

    // Assertions

    string = '';
    result = {};
    assert.deepEqual($Z.attributes(string), result, 'Empty String');

    string= '[data-attribute]';
    result = { 'data-attribute': '' };
    assert.deepEqual($Z.attributes(string), result, 'Boolean Attribute');

    string = '[for=""]';
    result = { 'for': ''};
    assert.deepEqual($Z.attributes(string), result, 'Empty-Valued Attribute');

    string = '[title="Something about zQuery\'s Awesomeness"]';
    result={ title: 'Something about zQuery\'s Awesomeness' };
    assert.deepEqual($Z.attributes(string), result, 'Attribute with value');

    string = '[href="github.com/#"]';
    result = { href: 'github.com/#' };
    assert.deepEqual($Z.attributes(string), result, 'Attribute with value containing . and #');

    string = '[filter][title="Something about zQuery\'s \\"Awesomeness>+^()\\""]';
    result = {
        filter: '',
        title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"'
    };
    assert.deepEqual($Z.attributes(string), result, 'Attribute with value containing escaped " and operators');

    string = '[filter title="Something about zQuery\'s \\"Awesomeness>+^()\\"" class="haha" id="hehe"]';
    result = {
        filter: '',
        title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"',
        'class': 'haha',
        id: 'hehe'
    };
    assert.deepEqual($Z.attributes(string), result, 'Multiple Attributes in ZenCoding Format');

    string = '[filter][title="Something about zQuery\'s \\"Awesomeness>+^()\\""][class="haha"][id="hehe"]';
    result = {
        filter: '',
        title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"',
        'class': 'haha',
        id: 'hehe'
    };
    assert.deepEqual($Z.attributes(string), result, 'Multiple Attributes in Sizzle Format');
});
$Q.test('$Z.element', function (assert) {

    // Expectations
    assert.expect(14);

    // Variables
    var i,
        pureElements = {
        'work': { name: 'work', attributes: {} },
        '#menu': { name: 'div', attributes: { id: 'menu' } },
        'div.class-name': { name: 'div', attributes: { 'class': 'class-name' } },
        'p.go-to-hell[class="help-me"]': { name: 'p', attributes: { 'class': 'go-to-hell help-me' } },
        'p#id.class': { name: 'p', attributes: { id: 'id', 'class': 'class' } },
        'p[hi="how" are="\\"you\\""]': { name: 'p', attributes: { hi: 'how', are: '\\"you\\"' } },
        'p#id.class[data-attr da="gpo" hi="\\"help\\""]': {
            name: 'p',
            attributes: {
                id: 'id',
                'class': 'class',
                'data-attr': '',
                da: 'gpo',
                hi: '\\"help\\"'
            }
        }
    },
        elements = {
        'work': $Z.extend(true, {}, $Z.config.element, { name: 'work', attributes: {} }),
        '#menu': $Z.extend(true, {}, $Z.config.element, { name: 'div', attributes: { id: 'menu' } }),
        'div.class-name': $Z.extend(true, {}, $Z.config.element, { name: 'div', attributes: { 'class': 'class-name' } }),
        'p.go-to-hell[class="help-me"]': $Z.extend(true, {}, $Z.config.element, { name: 'p', attributes: { 'class': 'go-to-hell help-me' } }),
        'p#id.class': $Z.extend(true, {}, $Z.config.element, { name: 'p', attributes: { id: 'id', 'class': 'class' } }),
        'p[hi="how" are="\\"you\\""]': $Z.extend(true, {}, $Z.config.element, { name: 'p', attributes: { hi: 'how', are: '\\"you\\"' } }),
        'p#id.class[data-attr da="gpo" hi="\\"help\\""]': $Z.extend(true, {}, $Z.config.element, {
            name: 'p',
            attributes: {
                id: 'id',
                'class': 'class',
                'data-attr': '',
                da: 'gpo',
                hi: '\\"help\\"'
            }
        })
        };

    // Assertions
    for (i in pureElements)
        assert.deepEqual($Z.element(i, true), pureElements[i], 'Elements in \'' + i + '\' retreived successfully as ' + JSON.stringify(pureElements[i]));
    for (i in elements)
        assert.deepEqual($Z.element(i), elements[i], 'Elements in \'' + i + '\' retreived successfully as ' + JSON.stringify(elements[i]));

});
$Q.test('$Z.redo', function(assert) {
    
    // Expecatations
    assert.expect(2);

    // Variables
    var element = $Z.config.element,
    expected = $Z.extend(true, {}, element),
    ul = $Z.extend(true, {}, element, { name: 'ul' }),
    li = $Z.extend(true, {}, element, { name: 'li' }),
    li2 = $Z.extend(true, {}, element, { name: 'li2' });
    $Z.extend(li, { parent: ul });
    $Z.extend(li2, { parent: ul });
    $Z.extend(ul, { children: [li, li2] });
    $Z.extend(expected, ul);

    assert.deepEqual($Z.redo(li), expected, 'Climbed from li to ul');
    assert.deepEqual($Z.redo(li2), expected, 'Climbed from li2 to ul');
});
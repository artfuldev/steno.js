/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js" />

$Q.module('Core');
$Q.test('Z.classes', function (assert) {
    assert.expect(5);
    assert.equal($Z.classes(''), '', 'Empty String');
    assert.equal($Z.classes('.menu'), 'menu', 'Single Class');
    assert.equal($Z.classes('.menu-item'), 'menu-item', 'Single Hyphenated Class');
    assert.equal($Z.classes('.menu.item'), 'menu item', 'Multiple Classes');
    assert.equal($Z.classes('.menu-item.item-empty'), 'menu-item item-empty', 'Multiple Hyphenated Classes');
});
$Q.test('$Z.attributes', function (assert) {
    assert.expect(7);
    var attributes = {
        '': {},
        '[data-attribute]': { 'data-attribute': '' },
        '[for=""]': { 'for': ''},
        '[href="github.com/#"]': { href: 'github.com/#' },
        '[title="Something about zQuery\'s Awesomeness"]': { title: 'Something about zQuery\'s Awesomeness' },
        '[filter][title="Something about zQuery\'s \\"Awesomeness>+^()\\""]': {
            filter: '',
            title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"'
        },
        '[filter title="Something about zQuery\'s \\"Awesomeness>+^()\\"" class="haha" id="hehe"]': {
            filter: '',
            title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"',
            'class': 'haha',
            id: 'hehe'
        }
    }
    for (var i in attributes)
        assert.deepEqual($Z.attributes(i), attributes[i], 'Attributes in \'' + i + '\' are \'' + JSON.stringify(attributes[i]) + '\'');
});
$Q.test('$Z.element', function (assert) {
    assert.expect(14);
    var pureElements = {
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
    var i;
    for (i in pureElements)
        assert.deepEqual($Z.element(i, true), pureElements[i], 'Elements in \'' + i + '\' retreived successfully as ' + JSON.stringify(pureElements[i]));
    for (i in elements)
        assert.deepEqual($Z.element(i), elements[i], 'Elements in \'' + i + '\' retreived successfully as ' + JSON.stringify(elements[i]));

});
$Q.test('$Z.dom', function(assert) {
    assert.expect(1);
    assert.deepEqual($Z.dom('ul#id.class>li[value="1"]+li[value="2"]'),
        {

        },
        'ul#id.class>li[value="1"]+li[value="2"]' + ' extracted correctly'
    );
});
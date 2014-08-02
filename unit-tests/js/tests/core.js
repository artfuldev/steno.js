/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js" />

$Q.module('Core');
$Q.test('$Z.classes', function (assert) {
    assert.expect(5);
    assert.equal($Z.classes(''), '', 'Empty String');
    assert.equal($Z.classes('.menu'), 'menu', 'Single Class');
    assert.equal($Z.classes('.menu-item'), 'menu-item', 'Single Hyphenated Class');
    assert.equal($Z.classes('.menu.item'), 'menu item', 'Multiple Classes');
    assert.equal($Z.classes('.menu-item.item-empty'), 'menu-item item-empty', 'Multiple Hyphenated Classes');
});
$Q.test('$Z.attributes', function (assert) {
    assert.expect(8);
    var string, result;

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
$Q.test('$Z.dom(ul#id.class>li[value="1"]+li[value="2"])', function(assert) {

    // Expectations
    assert.expect(12);

    // Variables
    var dom,
        string = 'ul#id.class>li[value="1"]+li[value="2"]',
        ul = {},
        li1 = {
            name: 'li',
            attributes: {
                value: '1'
            },
            children: [],
            parent: ul
        },

        li2 = {
            name: 'li',
            attributes: {
                value: '2'
            },
            children: [],
            parent: ul
        };
    ul = $Z.extend(true, ul, {
        name: 'ul',
        attributes: {
            'class': 'class',
            id: 'id'
        },
        parent: null,
        children: [li1, li2]
    });
    dom = $Z.dom(string);

    // Parent
    assert.equal(dom.name, ul.name, 'Name Extracted');
    assert.deepEqual(dom.attributes, ul.attributes, 'Attributes Extracted');
    assert.equal(dom.parent, null, 'Parent is null');
    assert.equal(dom.children.length, 2, 'No of children');

    // Children
    assert.equal(dom.children[0].name, li1.name, 'Name Extracted');
    assert.deepEqual(dom.children[0].attributes, li1.attributes, 'Attributes Extracted');
    assert.equal(dom.children[0].parent, dom, 'Parent is dom');
    assert.equal(dom.children[0].children.length, 0, 'No of children');
    assert.equal(dom.children[1].name, li2.name, 'Name Extracted');
    assert.deepEqual(dom.children[1].attributes, li2.attributes, 'Attributes Extracted');
    assert.equal(dom.children[1].parent, dom, 'Parent is dom');
    assert.equal(dom.children[1].children.length, 0, 'No of children');
});
$Q.test('$Z.dom(ul#id.class li[value="1"]+li[value="2"])', function (assert) {

    // Expectations
    assert.expect(12);

    // Variables
    var dom,
        string = 'ul#id.class li[value="1"]+li[value="2"]',
        ul = {},
        li1 = {
            name: 'li',
            attributes: {
                value: '1'
            },
            children: [],
            parent: ul
        },

        li2 = {
            name: 'li',
            attributes: {
                value: '2'
            },
            children: [],
            parent: ul
        };
    ul = $Z.extend(true, ul, {
        name: 'ul',
        attributes: {
            'class': 'class',
            id: 'id'
        },
        parent: null,
        children: [li1, li2]
    });
    dom = $Z.dom(string);

    // Parent
    assert.equal(dom.name, ul.name, 'Name Extracted');
    assert.deepEqual(dom.attributes, ul.attributes, 'Attributes Extracted');
    assert.equal(dom.parent, null, 'Parent is null');
    assert.equal(dom.children.length, 2, 'No of children');

    // Children
    assert.equal(dom.children[0].name, li1.name, 'Name Extracted');
    assert.deepEqual(dom.children[0].attributes, li1.attributes, 'Attributes Extracted');
    assert.equal(dom.children[0].parent, dom, 'Parent is dom');
    assert.equal(dom.children[0].children.length, 0, 'No of children');
    assert.equal(dom.children[1].name, li2.name, 'Name Extracted');
    assert.deepEqual(dom.children[1].attributes, li2.attributes, 'Attributes Extracted');
    assert.equal(dom.children[1].parent, dom, 'Parent is dom');
    assert.equal(dom.children[1].children.length, 0, 'No of children');
});
$Q.test('$Z.dom(ul#id.class li[value="1"] a[title="Click Here" href="http://google.com"])', function (assert) {

    // Expectations
    assert.expect(12);

    // Variables
    var dom,
        string = 'ul#id.class li[value="1"] a[title="Click Here" href="http://google.com"]',
        ul = {},
        li = {},
        a = {};
    li = $Z.extend(true, li, {
        name: 'li',
        attributes: {
            value: '1'
        },
        children: [a],
        parent: ul
    });
    a = $Z.extend(true, a, {
        name: 'li',
        attributes: {
            title: 'Click Here',
            href: 'http://google.com'
        },
        children: [],
        parent: li
    });
    ul = $Z.extend(true, ul, {
        name: 'ul',
        attributes: {
            'class': 'class',
            id: 'id'
        },
        parent: null,
        children: [li]
    });
    dom = $Z.dom(string);

    // Parent
    assert.equal(dom.name, ul.name, 'ul Name Extracted');
    assert.deepEqual(dom.attributes, ul.attributes, 'ul Attributes Extracted');
    assert.equal(dom.parent, null, 'ul Parent is null');
    assert.equal(dom.children.length, ul.children.length, 'ul No of children');

    // Children - Level 1
    assert.equal(dom.children[0].name, li.name, 'li Name Extracted');
    assert.deepEqual(dom.children[0].attributes, li.attributes, 'li Attributes Extracted');
    assert.equal(dom.children[0].parent, dom, 'li Parent is ul');
    assert.equal(dom.children[0].children.length, li.children.length, 'li No of children');

    // Children - Level 2
    assert.equal(dom.children[0].children[0].name, a.name, 'a Name Extracted');
    assert.deepEqual(dom.children[0].children[0].attributes, a.attributes, 'a Attributes Extracted');
    assert.equal(dom.children[0].children[0].parent, dom.children[0], 'a Parent is li');
    assert.equal(dom.children[0].children[0].children.length, a.children.length, 'a No of children');
});
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js" />

$Q.module('Core', {
    setup: function () {
        window.element = $Z.el;
        window.expected = $Z.extend(true, {}, element);
        window.ul = $Z.extend(true, {}, element, { name: 'ul' });
        window.li = $Z.extend(true, {}, element, { name: 'li' });
        window.a = $Z.extend(true, {}, element, { name: 'a' });
        window.li2 = $Z.extend(true, {}, element, { name: 'li' });
        window.div = $Z.extend(true, {}, element, { name: 'div' });
    },
    teardown: function () {
        window.element = undefined;
        window.expected = undefined;
        window.ul = undefined;
        window.li = undefined;
        window.a = undefined;
        window.li2 = undefined;
        window.div = undefined;
    }
});

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
        'work': $Z.extend(true, {}, $Z.el, { name: 'work', attributes: {} }),
        '#menu': $Z.extend(true, {}, $Z.el, { name: 'div', attributes: { id: 'menu' } }),
        'div.class-name': $Z.extend(true, {}, $Z.el, { name: 'div', attributes: { 'class': 'class-name' } }),
        'p.go-to-hell[class="help-me"]': $Z.extend(true, {}, $Z.el, { name: 'p', attributes: { 'class': 'go-to-hell help-me' } }),
        'p#id.class': $Z.extend(true, {}, $Z.el, { name: 'p', attributes: { id: 'id', 'class': 'class' } }),
        'p[hi="how" are="\\"you\\""]': $Z.extend(true, {}, $Z.el, { name: 'p', attributes: { hi: 'how', are: '\\"you\\"' } }),
        'p#id.class[data-attr da="gpo" hi="\\"help\\""]': $Z.extend(true, {}, $Z.el, {
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
    $Z.extend(li, { parent: ul });
    $Z.extend(li2, { parent: ul });
    $Z.extend(ul, { children: [li, li2] });
    $Z.extend(expected, ul);

    // Assertions
    assert.deepEqual($Z.redo(li), expected, 'Climbed from li to ul');
    assert.deepEqual($Z.redo(li2), expected, 'Climbed from li2 to ul');
});
$Q.test('$Z.dom - ul#id.class - Single', function (assert) {

    // Expectations
    assert.expect(1);

    // Variables
    var string = 'ul#id.class',
        result = $Z.dom(string);
    $Z.extend(expected, ul, {
        attributes: {
            'class': 'class',
            id: 'id'
        }
    });

    // Assertions
    assert.deepEqual(result, expected, 'dom built successfully for ' + string);
});
$Q.test('$Z.dom - ul div - Descend', function (assert) {

    // Expectations
    assert.expect(8);

    // Variables
    var string = 'ul div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: ul
    });
    $Z.extend(ul, {
        children: [div]
    });
    $Z.extend(expected, ul);

    // Assertions
    assert.strictEqual(result.parent, expected.parent, 'Parent of ul');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of ul');
    assert.strictEqual(result.name, expected.name, 'Name of ul');
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of div');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of div');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of div');
});
$Q.test('$Z.dom - ul>div - Descend', function (assert) {

    // Expectations
    assert.expect(8);

    // Variables
    var string = 'ul>div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: ul
    });
    $Z.extend(ul, {
        children: [div]
    });
    $Z.extend(expected, ul);

    // Assertions
    assert.strictEqual(result.parent, expected.parent, 'Parent of ul');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of ul');
    assert.strictEqual(result.name, expected.name, 'Name of ul');
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of div');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of div');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of div');
});
$Q.test('$Z.dom - ul+div - Add', function (assert) {

    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul+div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(ul, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [ul, div]
    });

    // Assertions
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of ul');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of ul');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of ul');
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of div');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of div');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of div');
});
$Q.test('$Z.dom - ul^div - Ascend', function (assert) {

    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul^div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(ul, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [ul, div]
    });

    // Assertions
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of ul');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of ul');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of ul');
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of div');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of div');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of div');
});
$Q.test('$Z.dom - ul>li>div - Double Descend', function (assert) {

    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul>li>div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: li
    });
    $Z.extend(li, {
        parent: ul,
        children: [div]
    });
    $Z.extend(ul, {
        children: [li]
    });
    $Z.extend(expected, ul);

    // Assertions
    // UL
    assert.strictEqual(result.parent, expected.parent, 'Parent of ul');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of ul');
    assert.strictEqual(result.name, expected.name, 'Name of ul');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // DIV
    assert.deepEqual(result.children[0].children[0].parent, expected.children[0].children[0].parent, 'Parent of div');
    assert.strictEqual(result.children[0].children[0].children.length, expected.children[0].children[0].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[0].children[0].attributes), JSON.stringify(expected.children[0].children[0].attributes), 'Attributes of div');
    assert.strictEqual(result.children[0].children[0].name, expected.children[0].children[0].name, 'Name of div');
});
$Q.test('$Z.dom - ul>li+li - Descend and Add', function (assert) {
    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul>li+li',
        result = $Z.dom(string);
    $Z.extend(li, {
        parent: ul
    });
    $Z.extend(li2, {
        parent: ul
    });
    $Z.extend(ul, {
        children: [li, li2]
    });
    $Z.extend(expected, ul);

    // Assertions
    // UL
    assert.strictEqual(result.parent, expected.parent, 'Parent of ul');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of ul');
    assert.strictEqual(result.name, expected.name, 'Name of ul');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // DIV
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of li2');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of li2');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of li2');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of li2');
});
$Q.test('$Z.dom - ul>li^div - Descend and Ascend', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'ul>li^div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(li, {
        parent: ul
    });
    $Z.extend(ul, {
        parent: expected,
        children: [li]
    });
    $Z.extend(expected, {
        children: [ul, div]
    });

    // Assertions
    // DOM
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    // UL
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of ul');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of ul');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of ul');
    // LI
    assert.deepEqual(result.children[0].children[0].parent, expected.children[0].children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children[0].children.length, expected.children[0].children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].children[0].attributes), JSON.stringify(expected.children[0].children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].children[0].name, expected.children[0].children[0].name, 'Name of li');
    // DIV
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of div');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of div');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of div');
});
$Q.test('$Z.dom - li+a+div - Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li+a+div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(li, {
        parent: expected
    });
    $Z.extend(a, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [li, a, div]
    });

    // Assertions
    // DOM
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // A
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of a');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of a');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of a');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of a');
    // DIV
    assert.deepEqual(result.children[2].parent, expected.children[2].parent, 'Parent of div');
    assert.strictEqual(result.children[2].children.length, expected.children[2].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[2].attributes), JSON.stringify(expected.children[2].attributes), 'Attributes of div');
    assert.strictEqual(result.children[2].name, expected.children[2].name, 'Name of div');
});
$Q.test('$Z.dom - li+li>div - Add and Descend', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li+li>div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: li2
    });
    $Z.extend(li2, {
        parent: expected,
        children: [div]
    });
    $Z.extend(li, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [li, li2]
    });

    // Assertions
    // DOM
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // LI2
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of li2');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of li2');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of li2');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of li2');
    // DIV
    assert.deepEqual(result.children[1].children[0].parent, expected.children[1].children[0].parent, 'Parent of div');
    assert.strictEqual(result.children[1].children[0].children.length, expected.children[1].children[0].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[1].children[0].attributes), JSON.stringify(expected.children[1].children[0].attributes), 'Attributes of div');
    assert.strictEqual(result.children[1].children[0].name, expected.children[1].children[0].name, 'Name of div');
});
$Q.test('$Z.dom - li+a^div - Add and Ascend - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li+a^div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(li, {
        parent: expected
    });
    $Z.extend(a, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [li, a, div]
    });

    // Assertions
    // DOM
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // A
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of a');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of a');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of a');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of a');
    // DIV
    assert.deepEqual(result.children[2].parent, expected.children[2].parent, 'Parent of div');
    assert.strictEqual(result.children[2].children.length, expected.children[2].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[2].attributes), JSON.stringify(expected.children[2].attributes), 'Attributes of div');
    assert.strictEqual(result.children[2].name, expected.children[2].name, 'Name of div');
});
$Q.test('$Z.dom - li^a^div - Double Ascend - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li^a^div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(li, {
        parent: expected
    });
    $Z.extend(a, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [li, a, div]
    });

    // Assertions
    // DOM
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // A
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of a');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of a');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of a');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of a');
    // DIV
    assert.deepEqual(result.children[2].parent, expected.children[2].parent, 'Parent of div');
    assert.strictEqual(result.children[2].children.length, expected.children[2].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[2].attributes), JSON.stringify(expected.children[2].attributes), 'Attributes of div');
    assert.strictEqual(result.children[2].name, expected.children[2].name, 'Name of div');
});
$Q.test('$Z.dom - li^a+div - Ascend and Add - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li^a+div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(li, {
        parent: expected
    });
    $Z.extend(a, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [li, a, div]
    });

    // Assertions
    // DOM
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // A
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of a');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of a');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of a');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of a');
    // DIV
    assert.deepEqual(result.children[2].parent, expected.children[2].parent, 'Parent of div');
    assert.strictEqual(result.children[2].children.length, expected.children[2].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[2].attributes), JSON.stringify(expected.children[2].attributes), 'Attributes of div');
    assert.strictEqual(result.children[2].name, expected.children[2].name, 'Name of div');
});
$Q.test('$Z.dom - li^li>div - Ascend and Descend - Works like Add and Descend', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li^li>div',
        result = $Z.dom(string);
    $Z.extend(div, {
        parent: li2
    });
    $Z.extend(li2, {
        parent: expected,
        children: [div]
    });
    $Z.extend(li, {
        parent: expected
    });
    $Z.extend(expected, {
        children: [li, li2]
    });

    // Assertions
    // DOM
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    // LI
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of li');
    // LI2
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of li2');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of li2');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of li2');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of li2');
    // DIV
    assert.deepEqual(result.children[1].children[0].parent, expected.children[1].children[0].parent, 'Parent of div');
    assert.strictEqual(result.children[1].children[0].children.length, expected.children[1].children[0].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[1].children[0].attributes), JSON.stringify(expected.children[1].children[0].attributes), 'Attributes of div');
    assert.strictEqual(result.children[1].children[0].name, expected.children[1].children[0].name, 'Name of div');
});
$Q.test('$Z.html', function(assert) {
    // Expectations
    assert.expect(4);

    // Variables
    var string, input, result, expected;

    // Assertions

    string = 'ul#id.class[title="Something Here"]';
    input = $Z.dom(string);
    result = $Z.html(input);
    expected = '<ul title="Something Here" id="id" class="class"></ul>';
    assert.strictEqual(result, expected, 'dom ' + string);

    string = 'ul>li+li+li>a';
    input = $Z.dom(string);
    result = $Z.html(input);
    expected = '<ul><li></li><li></li><li><a></a></li></ul>';
    assert.strictEqual(result, expected, 'dom ' + string);

    string = 'ul#id.class[title="Something Here"]';
    result = $Z.html(string);
    expected = '<ul title="Something Here" id="id" class="class"></ul>';
    assert.strictEqual(result, expected, 'string ' + string);

    string = 'ul>li+li+li>a';
    result = $Z.html(string);
    expected = '<ul><li></li><li></li><li><a></a></li></ul>';
    assert.strictEqual(result, expected, 'string ' + string);
});
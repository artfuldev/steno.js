/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/steno.js" />
/// <reference path="../tests/tests.js" />

$Q.module('Core', {
    setup: function () {
        window.element = steno.extend(true, {}, steno.el);
        window.expected = steno.extend(true, {}, element);
        window.ul = steno.extend(true, {}, element, { name: 'ul' });
        window.li = steno.extend(true, {}, element, { name: 'li' });
        window.a = steno.extend(true, {}, element, { name: 'a' });
        window.li2 = steno.extend(true, {}, element, { name: 'li' });
        window.div = steno.extend(true, {}, element, { name: 'div' });
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

$Q.test('steno.classes', function (assert) {

    // Expectations
    assert.expect(10);

    // Assertions
    assert.equal(steno.classes(''), '', 'Empty String');
    assert.equal(steno.classes('.menu'), 'menu', 'Single Class');
    assert.equal(steno.classes('.menu-item'), 'menu-item', 'Single Hyphenated Class');
    assert.equal(steno.classes('.menu.item'), 'menu item', 'Multiple Classes');
    assert.equal(steno.classes('.menu-item.item-empty'), 'menu-item item-empty', 'Multiple Hyphenated Classes');
    // #73
    assert.equal(steno.classes('.12'), '12', 'Single Class with Numbers');
    assert.equal(steno.classes('.menu-1'), 'menu-1', 'Single Hyphenated Class with Number');
    assert.equal(steno.classes('.menu-12'), 'menu-12', 'Single Hyphenated Class with Numbers');
    assert.equal(steno.classes('.menu-item-1.item-empty'), 'menu-item-1 item-empty', 'Multiple Hyphenated Classes with Number');
    assert.equal(steno.classes('.menu-item.item-empty-100'), 'menu-item item-empty-100', 'Multiple Hyphenated Classes with Numbers');
});
$Q.test('steno.attributes', function (assert) {

    // Expectations
    assert.expect(15);

    // Variables
    var string, result;

    // Assertions

    string = '';
    result = {};
    assert.deepEqual(steno.attributes(string), result, 'Empty String');

    string= '[data-attribute]';
    result = { 'data-attribute': '' };
    assert.deepEqual(steno.attributes(string), result, 'Boolean Attribute');

    string = '[for=""]';
    result = { 'for': ''};
    assert.deepEqual(steno.attributes(string), result, 'Empty-Valued Attribute');

    string = '[title="Something about zQuery\'s Awesomeness"]';
    result={ title: 'Something about zQuery\'s Awesomeness' };
    assert.deepEqual(steno.attributes(string), result, 'Attribute with value');

    string = '[href="github.com/#"]';
    result = { href: 'github.com/#' };
    assert.deepEqual(steno.attributes(string), result, 'Attribute with value containing . and #');

    string = '[filter][title="Something about zQuery\'s \\"Awesomeness>+^()\\""]';
    result = {
        filter: '',
        title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"'
    };
    assert.deepEqual(steno.attributes(string), result, 'Attribute with value containing escaped " and operators');

    string = '[filter title="Something about zQuery\'s \\"Awesomeness>+^()\\"" class="haha" id="hehe"]';
    result = {
        filter: '',
        title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"',
        'class': 'haha',
        id: 'hehe'
    };
    assert.deepEqual(steno.attributes(string), result, 'Multiple Attributes in ZenCoding Format');

    string = '[filter][title="Something about zQuery\'s \\"Awesomeness>+^()\\""][class="haha"][id="hehe"]';
    result = {
        filter: '',
        title: 'Something about zQuery\'s \\"Awesomeness>+^()\\"',
        'class': 'haha',
        id: 'hehe'
    };
    assert.deepEqual(steno.attributes(string), result, 'Multiple Attributes in Sizzle Format');

    // #73
    string = '[data-attribute-1]';
    result = { 'data-attribute-1': '' };
    assert.deepEqual(steno.attributes(string), result, 'Boolean Attribute with Number in Name');

    // #73
    string = '[for-99=""]';
    result = { 'for-99': '' };
    assert.deepEqual(steno.attributes(string), result, 'Empty-Valued Attribute with Number in Name');

    // #73
    string = '[title-12="Something about zQuery\'s Awesomeness"]';
    result = { 'title-12': 'Something about zQuery\'s Awesomeness' };
    assert.deepEqual(steno.attributes(string), result, 'Attribute with value with Number in Name');

    // #73
    string = '[href-99="github.com/#"]';
    result = { 'href-99': 'github.com/#' };
    assert.deepEqual(steno.attributes(string), result, 'Attribute with value containing . and #, with Number in Name');

    // #73
    string = '[filter-12][title-100="Something about zQuery\'s \\"Awesomeness>+^()\\""]';
    result = {
        'filter-12': '',
        'title-100': 'Something about zQuery\'s \\"Awesomeness>+^()\\"'
    };
    assert.deepEqual(steno.attributes(string), result, 'Attribute with value containing escaped " and operators, with Number in Name');

    // #73
    string = '[filter-900 title-12="Something about zQuery\'s \\"Awesomeness>+^()\\"" class="haha" id="hehe"]';
    result = {
        'filter-900': '',
        'title-12': 'Something about zQuery\'s \\"Awesomeness>+^()\\"',
        'class': 'haha',
        id: 'hehe'
    };
    assert.deepEqual(steno.attributes(string), result, 'Multiple Attributes in ZenCoding Format, with Number in Name');

    // #73
    string = '[filter12][title13="Something about zQuery\'s \\"Awesomeness>+^()\\""][class="haha"][id="hehe"]';
    result = {
        'filter12': '',
        'title13': 'Something about zQuery\'s \\"Awesomeness>+^()\\"',
        'class': 'haha',
        id: 'hehe'
    };
    assert.deepEqual(steno.attributes(string), result, 'Multiple Attributes in Sizzle Format, with Number in Name');

});
$Q.test('steno.element', function (assert) {

    // Expectations
    assert.expect(50);

    // Variables
    var i,
        pureElements = {
            'work': {
                name: 'work',
                attributes: {},
                text: '',
                multiplier: 1,
                context: null
            },
            '#menu': {
                name: 'div',
                attributes: { id: 'menu' },
                text: '',
                multiplier: 1,
                context: null
            },
            '#menu1': {
                name: 'div',
                attributes: { id: 'menu1' },
                text: '',
                multiplier: 1,
                context: null
            },
            '#menu-1': {
                name: 'div',
                attributes: { id: 'menu-1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'div.class-name': {
                name: 'div',
                attributes: { 'class': 'class-name' },
                text: '',
                multiplier: 1,
                context: null
            },
            'div.class-name1': {
                name: 'div',
                attributes: { 'class': 'class-name1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'div.class-name-1': {
                name: 'div',
                attributes: { 'class': 'class-name-1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p.go-to-hell[class="help-me"]': {
                name: 'p',
                attributes: { 'class': 'go-to-hell help-me' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p.go-to-hell1[class="help-me"]': {
                name: 'p',
                attributes: { 'class': 'go-to-hell1 help-me' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p.go-to-hell1[class="help-me-1"]': {
                name: 'p',
                attributes: { 'class': 'go-to-hell1 help-me-1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id.class': {
                name: 'p',
                attributes: { id: 'id', 'class': 'class' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id.class1': {
                name: 'p',
                attributes: { id: 'id', 'class': 'class1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id.class-1': {
                name: 'p',
                attributes: { id: 'id', 'class': 'class-1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id1.class': {
                name: 'p',
                attributes: { id: 'id1', 'class': 'class' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id1.class1': {
                name: 'p',
                attributes: { id: 'id1', 'class': 'class1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id1.class-1': {
                name: 'p',
                attributes: { id: 'id1', 'class': 'class-1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id-1.class': {
                name: 'p',
                attributes: { id: 'id-1', 'class': 'class' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id-1.class1': {
                name: 'p',
                attributes: { id: 'id-1', 'class': 'class1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id-1.class-1': {
                name: 'p',
                attributes: { id: 'id-1', 'class': 'class-1' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p[hi="how" are="\\"you\\""]': {
                name: 'p',
                attributes: { hi: 'how', are: '\\"you\\"' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p[hi-1="how" are1="\\"you\\""]': {
                name: 'p',
                attributes: { 'hi-1': 'how', 'are1': '\\"you\\"' },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id.class[data-attr da="gpo" hi="\\"help\\""]': {
                name: 'p',
                attributes: {
                    id: 'id',
                    'class': 'class',
                    'data-attr': '',
                    da: 'gpo',
                    hi: '\\"help\\"'
                },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id.class[data-attr-1 da1="gpo" hi="\\"help\\""]': {
                name: 'p',
                attributes: {
                    id: 'id',
                    'class': 'class',
                    'data-attr-1': '',
                    da1: 'gpo',
                    hi: '\\"help\\"'
                },
                text: '',
                multiplier: 1,
                context: null
            },
            'p#id.class[data-attr da="gpo" hi="\\"help\\""]{Hi, \\} How\'re you?}': {
                name: 'p',
                attributes: {
                    id: 'id',
                    'class': 'class',
                    'data-attr': '',
                    da: 'gpo',
                    hi: '\\"help\\"'
                },
                text: 'Hi, \\} How\'re you?',
                multiplier: 1,
                context: null
            },
            'p#id.class[data-attr-99 da2="gpo" hi="\\"help\\""]{Hi, \\} How\'re you?}': {
                name: 'p',
                attributes: {
                    id: 'id',
                    'class': 'class',
                    'data-attr-99': '',
                    da2: 'gpo',
                    hi: '\\"help\\"'
                },
                text: 'Hi, \\} How\'re you?',
                multiplier: 1,
                context: null
            }
        },
        elements = {};
    for (i in pureElements) {
        elements[i] = steno.extend(true, {}, element, pureElements[i]);
    }

    // Assertions
    for (i in pureElements)
        assert.deepEqual(steno.element(i, true), pureElements[i], 'Elements in \'' + i + '\' retreived successfully as ' + JSON.stringify(pureElements[i]));
    for (i in elements)
        assert.deepEqual(steno.element(i), elements[i], 'Elements in \'' + i + '\' retreived successfully as ' + JSON.stringify(elements[i]));

});
$Q.test('steno.context', function(assert) {
    // Expectations
    assert.expect(2);

    // Variables
    var string, context, result, expected;

    // Assertions

    // Text/InnerHtml
    string = 'name';
    context = {
        title: 'Some Title',
        name: 'Battosai',
        subtitle: 'Kenshin'
    };
    result = steno.context(string, context);
    expected = 'Battosai';
    assert.strictEqual(result, expected, string);

    // Nested
    string = 'author.name';
    context = {
        book: {
            title: 'Some Title',
            subtitle: 'Kenshin'
        },
        author: {
            name: 'Battosai',
            title: 'Mr.'
        }
    };
    result = steno.context(string, context);
    expected = 'Battosai';
    assert.strictEqual(result, expected, string);
});
$Q.test('steno.render', function (assert) {

    // Expectations
    assert.expect(5);

    // Variables
    var string, context, expected, result;

    // Assertions

    string = 'Hi \\name!';
    context = { name: 'John' };
    expected = 'Hi John!';
    result = steno.render(string, context);
    assert.strictEqual(result, expected, 'Simple Variable Sustitution');

    string = 'Hi \\author.name!';
    context = { author: { name: 'John' } };
    expected = 'Hi John!';
    result = steno.render(string, context);
    assert.strictEqual(result, expected, 'Nested Variable Sustitution');

    string = 'Hi \\author.name.first-name!';
    context = { author: { name: { 'first-name': 'John' } } };
    expected = 'Hi John!';
    result = steno.render(string, context);
    assert.strictEqual(result, expected, 'Nested Variable Sustitution - Hyphenated Member');

    string = 'Hi \\author.name._firstname!';
    context = { author: { name: { '_firstname': 'John' } } };
    expected = 'Hi John!';
    result = steno.render(string, context);
    assert.strictEqual(result, expected, 'Nested Variable Sustitution - Underscored Member');

    string = 'Hi \\author.name.$first!';
    context = { author: { name: { '$first': 'John' } } };
    expected = 'Hi John!';
    result = steno.render(string, context);
    assert.strictEqual(result, expected, 'Nested Variable Sustitution - Dollared Member');

});
$Q.test('steno.redo', function (assert) {
    
    // Expecatations
    assert.expect(2);

    // Variables
    steno.extend(li, { parent: ul });
    steno.extend(li2, { parent: ul });
    steno.extend(ul, { children: [li, li2] });
    steno.extend(expected, ul);

    // Assertions
    assert.deepEqual(steno.redo(li), expected, 'Climbed from li to ul');
    assert.deepEqual(steno.redo(li2), expected, 'Climbed from li2 to ul');
});
$Q.test('steno.dom - ul#id.class - Single', function (assert) {

    // Expectations
    assert.expect(1);

    // Variables
    var string = 'ul#id.class',
        result = steno.dom(string);
    steno.extend(expected, ul, {
        attributes: {
            'class': 'class',
            id: 'id'
        }
    });

    // Assertions
    assert.deepEqual(result, expected, 'dom built successfully for ' + string);
});
$Q.test('steno.dom - ul div - Descend', function (assert) {

    // Expectations
    assert.expect(8);

    // Variables
    var string = 'ul div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: ul
    });
    steno.extend(ul, {
        children: [div]
    });
    steno.extend(expected, ul);

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
$Q.test('steno.dom - ul>div - Descend', function (assert) {

    // Expectations
    assert.expect(8);

    // Variables
    var string = 'ul>div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: ul
    });
    steno.extend(ul, {
        children: [div]
    });
    steno.extend(expected, ul);

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
$Q.test('steno.dom - ul+div - Add', function (assert) {

    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul+div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: expected
    });
    steno.extend(ul, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - ul^div - Ascend', function (assert) {

    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul^div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: expected
    });
    steno.extend(ul, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - ul>li>div - Double Descend', function (assert) {

    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul>li>div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: li
    });
    steno.extend(li, {
        parent: ul,
        children: [div]
    });
    steno.extend(ul, {
        children: [li]
    });
    steno.extend(expected, ul);

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
$Q.test('steno.dom - ul>li+li - Descend and Add', function (assert) {
    // Expectation
    assert.expect(12);

    // Variables
    var string = 'ul>li+li',
        result = steno.dom(string);
    steno.extend(li, {
        parent: ul
    });
    steno.extend(li2, {
        parent: ul
    });
    steno.extend(ul, {
        children: [li, li2]
    });
    steno.extend(expected, ul);

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
$Q.test('steno.dom - ul>li^div - Descend and Ascend', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'ul>li^div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: expected
    });
    steno.extend(li, {
        parent: ul
    });
    steno.extend(ul, {
        parent: expected,
        children: [li]
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - li+a+div - Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li+a+div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: expected
    });
    steno.extend(li, {
        parent: expected
    });
    steno.extend(a, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - li+li>div - Add and Descend', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li+li>div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: li2
    });
    steno.extend(li2, {
        parent: expected,
        children: [div]
    });
    steno.extend(li, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - li+a^div - Add and Ascend - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li+a^div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: expected
    });
    steno.extend(li, {
        parent: expected
    });
    steno.extend(a, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - li^a^div - Double Ascend - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li^a^div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: expected
    });
    steno.extend(li, {
        parent: expected
    });
    steno.extend(a, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - li^a+div - Ascend and Add - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li^a+div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: expected
    });
    steno.extend(li, {
        parent: expected
    });
    steno.extend(a, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - li^li>div - Ascend and Descend - Works like Add and Descend', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables
    var string = 'li^li>div',
        result = steno.dom(string);
    steno.extend(div, {
        parent: li2
    });
    steno.extend(li2, {
        parent: expected,
        children: [div]
    });
    steno.extend(li, {
        parent: expected
    });
    steno.extend(expected, {
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
$Q.test('steno.dom - Grouping', function(assert) {
    // Expectation
    assert.expect(2);

    // Variables
    var string,
        result,
        expected;

    // Assertions

    // #68
    string = 'div>(header>ul>li*2>a[href])+footer>p';
    result = steno.html(string);
    expected = '<div><header><ul><li><a href=""></a></li><li><a href=""></a></li></ul></header><footer><p></p></footer></div>';
    assert.strictEqual(result, expected, string);

    // #68
    string = '(div>dl>(dt+dd)*3)+footer>p';
    result = steno.html(string);
    expected = '<div><dl><dt></dt><dd></dd><dt></dt><dd></dd><dt></dt><dd></dd></dl></div><footer><p></p></footer>';
    assert.strictEqual(result, expected, string);
});
$Q.test('steno.html - No Context', function(assert) {
    // Expectations
    assert.expect(12);

    // Variables
    var string, input, result, expected;

    // Assertions

    //#23
    string = 'h1+h2';
    input = steno.dom(string);
    result = steno.html(input);
    expected = '<h1></h1><h2></h2>';
    assert.strictEqual(result, expected, 'dom ' + string);
    //#23
    string = 'h1+h2';
    result = steno.html(string);
    expected = '<h1></h1><h2></h2>';
    assert.strictEqual(result, expected, 'string ' + string);

    //#21
    string = 'ul>li*4';
    input = steno.dom(string);
    result = steno.html(input);
    expected = '<ul><li></li><li></li><li></li><li></li></ul>';
    assert.strictEqual(result, expected, 'dom ' + string);
    //#21
    string = 'ul>li*4';
    result = steno.html(string);
    expected = '<ul><li></li><li></li><li></li><li></li></ul>';
    assert.strictEqual(result, expected, 'string ' + string);

    //#22
    string = 'ul>(li>a)*2';
    input = steno.dom(string);
    result = steno.html(input);
    expected = '<ul><li><a></a></li><li><a></a></li></ul>';
    assert.strictEqual(result, expected, 'dom ' + string);
    //#22
    string = 'ul>(li.option>a.has-link)*2+li.selected.option>a.has-link';
    result = steno.html(string);
    expected = '<ul><li class="option"><a class="has-link"></a></li><li class="option"><a class="has-link"></a></li>' +
        '<li class="selected option"><a class="has-link"></a></li></ul>';
    assert.strictEqual(result, expected, 'string ' + string);

    string = 'ul#id.class[title="Something Here"]';
    input = steno.dom(string);
    result = steno.html(input);
    expected = '<ul title="Something Here" id="id" class="class"></ul>';
    assert.strictEqual(result, expected, 'dom ' + string);

    string = 'ul>li+li+li>a';
    input = steno.dom(string);
    result = steno.html(input);
    expected = '<ul><li></li><li></li><li><a></a></li></ul>';
    assert.strictEqual(result, expected, 'dom ' + string);

    string = 'ul>li{one}+li{two}+li>a{three}';
    input = steno.dom(string);
    result = steno.html(input);
    expected = '<ul><li>one</li><li>two</li><li><a>three</a></li></ul>';
    assert.strictEqual(result, expected, 'dom ' + string);

    string = 'ul#id.class[title="Something Here"]';
    result = steno.html(string);
    expected = '<ul title="Something Here" id="id" class="class"></ul>';
    assert.strictEqual(result, expected, 'string ' + string);

    string = 'ul>li+li+li>a';
    result = steno.html(string);
    expected = '<ul><li></li><li></li><li><a></a></li></ul>';
    assert.strictEqual(result, expected, 'string ' + string);

    string = 'ul>li{one}+li{two}+li>a{three}';
    result = steno.html(string);
    expected = '<ul><li>one</li><li>two</li><li><a>three</a></li></ul>';
    assert.strictEqual(result, expected, 'string ' + string);
});
$Q.test('steno.html - Object Context', function (assert) {
    // Expectations
    assert.expect(5);

    // Variables
    var string, context, result, expected;

    // Assertions

    // Text/InnerHtml
    string = 'h1{\\title - \\name}+h2{\\subtitle}';
    context = {
        title: 'Some Title',
        name: 'Battosai',
        subtitle: 'Kenshin'
    };
    result = steno.html(string, context);
    expected = '<h1>Some Title - Battosai</h1><h2>Kenshin</h2>';
    assert.strictEqual(result, expected, string);

    // Attributes
    string = 'h1[class="\\title" id="\\name"][data-subtitle="\\subtitle"]';
    context = {
        title: 'Some Title',
        name: 'Battosai',
        subtitle: 'Kenshin'
    };
    result = steno.html(string, context);
    expected = '<h1 class="Some Title" id="Battosai" data-subtitle="Kenshin"></h1>';
    assert.strictEqual(result, expected, string);

    // Nested
    string = 'h1{\\book.title - \\author.name}+h2{\\book.subtitle}';
    context = {
        book: {
            title: 'Some Title',
            subtitle: 'Kenshin'
        },
        author: {
            name: 'Battosai',
            title: 'Mr.'
        }
    };
    result = steno.html(string, context);
    expected = '<h1>Some Title - Battosai</h1><h2>Kenshin</h2>';
    assert.strictEqual(result, expected, string);

    // Subcontexts
    string = 'h1{\\title - \\subtitle}\\book+h2{\\title \\name}\\author';
    context = {
        book: {
            title: 'Some Title',
            subtitle: 'Kenshin'
        },
        author: {
            name: 'Battosai',
            title: 'Mr.'
        }
    };
    result = steno.html(string, context);
    expected = '<h1>Some Title - Kenshin</h1><h2>Mr. Battosai</h2>';
    assert.strictEqual(result, expected, string);

    // #66
    string = 'ul>li\\items';
    context = {};
    result = steno.html(string, context);
    expected = '<ul></ul>';
    assert.strictEqual(result, expected, string + ' - No such key in object');
});
$Q.test('steno.html - Array Context', function (assert) {
    // Expectations
    assert.expect(5);

    // Variables
    var string, context, result, expected;

    // Assertions

    // Text/InnerHtml
    string = 'h1{\\title}';
    context = [
        {
            title: 'Hi'
        },
        {
            title: 'Hello'
        },
        {
            title: 'How'
        }
    ];
    result = steno.html(string, context);
    expected = '<h1>Hi</h1><h1>Hello</h1><h1>How</h1>';
    assert.strictEqual(result, expected, string);

    // Attributes
    string = 'h1[class="\\title" id="\\name"][data-subtitle="\\subtitle"]';
    context = [
        {
            title: 'Some Title',
            name: 'Battosai',
            subtitle: 'Kenshin'
        },
        {
            title: 'Some Title2',
            name: 'Battosai2',
            subtitle: 'Kenshin2'
        },
        {
            title: 'Some Title3',
            name: 'Battosai3',
            subtitle: 'Kenshin3'
        }
    ];
    result = steno.html(string, context);
    expected = '<h1 class="Some Title" id="Battosai" data-subtitle="Kenshin"></h1>' +
        '<h1 class="Some Title2" id="Battosai2" data-subtitle="Kenshin2"></h1>' +
        '<h1 class="Some Title3" id="Battosai3" data-subtitle="Kenshin3"></h1>';
    assert.strictEqual(result, expected, string);

    // Nested
    string = 'h1{\\book.title - \\author.name}+h2{\\book.subtitle}';
    context = [
        {
            book: {
                title: 'Some Title',
                subtitle: 'Kenshin'
            },
            author: {
                name: 'Battosai',
                title: 'Mr.'
            }
        },
        {
            book: {
                title: 'ASome Title',
                subtitle: 'AKenshin'
            },
            author: {
                name: 'ABattosai',
                title: 'AMr.'
            }
        },
        {
            book: {
                title: 'BSome Title',
                subtitle: 'BKenshin'
            },
            author: {
                name: 'BBattosai',
                title: 'BMr.'
            }
        }
    ];
    result = steno.html(string, context);
    expected = '<h1>Some Title - Battosai</h1><h2>Kenshin</h2>' +
        '<h1>ASome Title - ABattosai</h1><h2>AKenshin</h2>' +
        '<h1>BSome Title - BBattosai</h1><h2>BKenshin</h2>';
    assert.strictEqual(result, expected, string);

    // Subcontexts
    string = 'h1{\\title - \\subtitle}\\book+h2{\\title \\name}\\author';
    context = [
        {
            book: {
                title: 'Some Title',
                subtitle: 'Kenshin'
            },
            author: {
                name: 'Battosai',
                title: 'Mr.'
            }
        },
        {
            book: {
                title: 'ASome Title',
                subtitle: 'AKenshin'
            },
            author: {
                name: 'ABattosai',
                title: 'AMr.'
            }
        },
        {
            book: {
                title: 'BSome Title',
                subtitle: 'BKenshin'
            },
            author: {
                name: 'BBattosai',
                title: 'BMr.'
            }
        }
    ];
    result = steno.html(string, context);
    expected = '<h1>Some Title - Kenshin</h1><h2>Mr. Battosai</h2>' +
        '<h1>ASome Title - AKenshin</h1><h2>AMr. ABattosai</h2>' +
        '<h1>BSome Title - BKenshin</h1><h2>BMr. BBattosai</h2>';
    assert.strictEqual(result, expected, string);

    // SubContext as An Array
    string = 'ul>li{\\text}\\items';
    context = {
        items: [
            {
                text: 'Some Item'
            },
            {
                text: 'Some Other Item'
            },
            {
                text: 'Another Item'
            },
            {
                text: 'Just Another Item'
            }
        ]
    };
    result = steno.html(string, context);
    expected = '<ul>' +
        '<li>Some Item</li>' +
        '<li>Some Other Item</li>' +
        '<li>Another Item</li>' +
        '<li>Just Another Item</li>' +
        '</ul>';
    assert.strictEqual(result, expected, string);
});
$Q.test('steno.compile', function (assert) {
    
    // Expectations
    assert.expect(8);

    // Variables
    var string, context, precompiledTemplate, result, expected;
    context = { items: [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }] };

    // Assertions

    // Context Slash
    string = 'ul>li\\items';
    precompiledTemplate = steno.compile(string);
    expected = steno.html(string, context);
    result = precompiledTemplate(context);
    assert.strictEqual(result, expected, 'fn - ' + string);
    result = precompiledTemplate.render(context);
    assert.strictEqual(result, expected, 'fn.render - ' + string);

    // Escaped }
    string = 'ul>li{{\\index\\}}\\items';
    precompiledTemplate = steno.compile(string);
    expected = steno.html(string, context);
    result = precompiledTemplate(context);
    assert.strictEqual(result, expected, 'fn - ' + string);
    result = precompiledTemplate.render(context);
    assert.strictEqual(result, expected, 'fn.render - ' + string);

    // Escaped "
    string = 'ul>li[data-for="\\"Nothing\\""]';
    precompiledTemplate = steno.compile(string);
    expected = steno.html(string, context);
    result = precompiledTemplate(context);
    assert.strictEqual(result, expected, 'fn - ' + string);
    result = precompiledTemplate.render(context);
    assert.strictEqual(result, expected, 'fn.render - ' + string);

    // Unescaped'
    string = 'ul>li[data-for="\'Nothing\'"]';
    precompiledTemplate = steno.compile(string);
    expected = steno.html(string, context);
    result = precompiledTemplate(context);
    assert.strictEqual(result, expected, 'fn - ' + string);
    result = precompiledTemplate.render(context);
    assert.strictEqual(result, expected, 'fn.render - ' + string);
});
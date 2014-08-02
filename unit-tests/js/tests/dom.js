/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />
/// <reference path="../tests/tests.js" />

$Q.module('DOM', {
    setup: function() {
        window.init = function() {
            window.element = $Z.config.element;
            window.expected = $Z.extend(true, {}, element);
            window.ul = $Z.extend(true, {}, element, { name: 'ul' });
            window.li = $Z.extend(true, {}, element, { name: 'li' });
            window.a = $Z.extend(true, {}, element, { name: 'a' });
            window.li2 = $Z.extend(true, {}, element, { name: 'li2' });
            window.div = $Z.extend(true, {}, element, { name: 'div' });
        };

    },
    teardown: function() {
        delete window.init;
    }
});

$Q.test('Single Element - ul#id.class', function(assert) {

    // Expectations
    assert.expect(1);

    // Variables and Initialization
    var string = 'ul#id.class',
        result = $Z.dom(string);
    init();

    // Assertions
    window.expected = $Z.extend(true, {}, ul, {
        attributes: {
            'class': 'class',
            id: 'id'
        }
    });
    assert.deepEqual(result, expected, 'dom built successfully for ' + string);
});
$Q.test(' (space) - Descend', function(assert) {
    
    // Expectations
    assert.expect(8);

    // Variables and Initialization
    var string = 'ul div',
        result = $Z.dom(string);
    init();
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
$Q.test('> - Descend', function(assert) {
    
    // Expectations
    assert.expect(8);
    
    // Variables and Initialization
    var string = 'ul>div',
        result = $Z.dom(string);
    init();
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
$Q.test('+ - Add', function(assert) {

    // Expectation
    assert.expect(12);

    // Variables and Initialization
    var string = 'ul+div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(ul, {
        parent: expected,
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
$Q.test('^ - Ascend - Works like Add', function (assert) {

    // Expectation
    assert.expect(12);

    // Variables and Initialization
    var string = 'ul^div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
    $Z.extend(div, {
        parent: expected
    });
    $Z.extend(ul, {
        parent: expected,
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
$Q.test('>> - Double Descend', function(assert) {
    assert.expect(0);
});
$Q.test('>+ - Descend and Add', function (assert) {
    assert.expect(0);
});
$Q.test('>^ - Descend and Ascend', function (assert) {
    
    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'ul li^div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
    assert.strictEqual(result.parent, expected.parent, 'Parent of DOM');
    assert.strictEqual(result.children.length, expected.children.length, 'No of children of DOM');
    assert.strictEqual(JSON.stringify(result.attributes), JSON.stringify(expected.attributes), 'Attributes of DOM');
    assert.strictEqual(result.name, expected.name, 'Name of DOM');
    assert.deepEqual(result.children[0].parent, expected.children[0].parent, 'Parent of ul');
    assert.strictEqual(result.children[0].children.length, expected.children[0].children.length, 'No of children of ul');
    assert.strictEqual(JSON.stringify(result.children[0].attributes), JSON.stringify(expected.children[0].attributes), 'Attributes of ul');
    assert.strictEqual(result.children[0].name, expected.children[0].name, 'Name of ul');
    assert.deepEqual(result.children[0].children[0].parent, expected.children[0].children[0].parent, 'Parent of li');
    assert.strictEqual(result.children[0].children[0].children.length, expected.children[0].children[0].children.length, 'No of children of li');
    assert.strictEqual(JSON.stringify(result.children[0].children[0].attributes), JSON.stringify(expected.children[0].children[0].attributes), 'Attributes of li');
    assert.strictEqual(result.children[0].children[0].name, expected.children[0].children[0].name, 'Name of li');
    assert.deepEqual(result.children[1].parent, expected.children[1].parent, 'Parent of div');
    assert.strictEqual(result.children[1].children.length, expected.children[1].children.length, 'No of children of div');
    assert.strictEqual(JSON.stringify(result.children[1].attributes), JSON.stringify(expected.children[1].attributes), 'Attributes of div');
    assert.strictEqual(result.children[1].name, expected.children[1].name, 'Name of div');
});
$Q.test('++ - Double Add', function (assert) {
    assert.expect(0);
});
$Q.test('+> - Add and Descend' , function (assert) {
    assert.expect(0);
});
$Q.test('+^ - Add and Ascend - Works like Double Add', function (assert) {
    assert.expect(0);
});
$Q.test('^^ - Double Ascend - Works like Double Add', function (assert) {
    assert.expect(0);
});
$Q.test('^+ - Ascend and Add - Works like Double Add', function (assert) {
    assert.expect(0);
});
$Q.test('^> - Ascend and Descend - Works like Add and Descend', function (assert) {
    assert.expect(0);
});


/*
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

    // Assertions

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

    // Assertions

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
        name: 'a',
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

    // Assertions

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
*/
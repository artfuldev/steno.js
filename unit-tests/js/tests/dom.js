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
            window.li2 = $Z.extend(true, {}, element, { name: 'li' });
            window.div = $Z.extend(true, {}, element, { name: 'div' });
        };
    },
    teardown: function() {
        window.init = undefined;
        window.element = undefined;
        window.expected = undefined;
        window.ul = undefined;
        window.li = undefined;
        window.a = undefined;
        window.li2 = undefined;
        window.div = undefined;
    }
});

$Q.test('ul#id.class - Single', function(assert) {

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
$Q.test('ul div - Descend', function(assert) {
    
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
$Q.test('ul>div - Descend', function(assert) {
    
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
$Q.test('ul+div - Add', function(assert) {

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
$Q.test('ul^div - Ascend', function (assert) {

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
$Q.test('ul>li>div - Double Descend', function(assert) {

    // Expectation
    assert.expect(12);

    // Variables and Initialization
    var string = 'ul>li>div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
$Q.test('ul>li+li - Descend and Add', function (assert) {
    // Expectation
    assert.expect(12);

    // Variables and Initialization
    var string = 'ul>li+li',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
    $Z.extend(li, {
        parent: ul
    });
    $Z.extend(li2, {
        parent: ul,
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
$Q.test('ul>li^div - Descend and Ascend', function (assert) {
    
    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'ul>li^div',
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
$Q.test('li+a+div - Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'li+a+div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
$Q.test('li+li>div - Add and Descend' , function (assert) {
    
    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'li+li>div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
$Q.test('li+a^div - Add and Ascend - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'li+a^div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
$Q.test('li^a^div - Double Ascend - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'li^a^div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
$Q.test('li^a+div - Ascend and Add - Works like Double Add', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'li^a+div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
$Q.test('li^li>div - Ascend and Descend - Works like Add and Descend', function (assert) {

    // Expectation
    assert.expect(16);

    // Variables and Initialization
    var string = 'li^li>div',
        result = $Z.dom(string);
    init();
    window.expected = $Z.extend(true, {}, element);
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
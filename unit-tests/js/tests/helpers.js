/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zquery.js" />


// Namespaces
window.$Q = QUnit;
window.$H = window.Helpers = {};


// Object Type, Is
$H.types = {
    'null': null,
    'undefined': undefined,
    'object': {},
    'array': [],
    'function': function() {},
    'string': '',
    'number': 12,
    'boolean': true,
    'date': new Date(),
    'regexp': new RegExp(),
    'string|number': 12,
    'number|string': 12,
    'array|object': [],
    'object|array': []
};

// Has
$H.obj = {
    'key': 'value',
    'key-two': 'value-two'
}
$H.arr = [1, 2];
$H.arr['key'] = 'value';

// Validate Args
$H.arguments = function () { return arguments; };
$H.validate = {arguments:[],types:[]};
for (var i in $H.types) {
    $H.validate.arguments.push($H.arguments($H.types[i]));
    $H.validate.types.push([i]);
}

// Trim
$H.trim = {
    ' Help': 'Help',
    'Help ': 'Help',
    ' Help ': 'Help'
};

// Nullify
$H.nullify = [
    {
        arguments: [[0, null, undefined, 1, 2, 1, null], 0],
        result: [0, 0, 0, 1, 2, 1, 0],
        message: 'Works on arrays'
    },
    {
        arguments: [{ hi: 0, there: null, how: undefined, are: 1, you: 2, doing: 1, hello: null }, 'nothing here'],
        result: { hi: 0, there: 'nothing here', how: 'nothing here', are: 1, you: 2, doing: 1, hello: 'nothing here' },
        message: 'Works on objects'
    }
];

// Random
$H.random = [
    {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        test: function(a) { return a > 0 && a < 10; }
    },
    {
        array: ['a', 'b', 'c'],
        test: function(a) { return a === 'a' || a === 'b' || a === 'c'; }
    }
];

// Extend
// Needs Implementation

// Classes
$H.classes = {
    '': '',
    '.dropdown': 'dropdown',
    '.menu.dropdown': 'menu dropdown',
    '.dropdown-menu': 'dropdown-menu',
    '.dropdown-menu.dropdown.menu': 'dropdown-menu dropdown menu'
};

// Attributes
$H.attributes = {
    '': {},
    '[data-attribute]': {
        'data-attribute': ''
    },
    '[for=""]': {
         'for': ''
    },
    '[href="github.com/#"]': {
         href: 'github.com/#'
    },
    '[title="Something about zQuery\'s Awesomeness"]': {
         title: 'Something about zQuery\'s Awesomeness'
    },
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
};

// Elements
$H.elements = {
    'work': {
        name: 'work',
        attributes: {}
    },
    '#menu': {
        name: 'div',
        attributes: {
            id: 'menu'
        }
    },
    'div.class-name': {
        name: 'div',
        attributes: {
            'class': 'class-name'
        }
    },
    'p.go-to-hell[class="help-me"]': {
        name: 'p',
        attributes: {
            'class': 'go-to-hell help-me'
        }
    },
    'p#id.class': {
        name: 'p',
        attributes: {
            id: 'id',
            'class': 'class'
        }
    },
    'p[hi="how" are="\\"you\\""]': {
        name: 'p',
        attributes: {
            hi: 'how',
            are: '\\"you\\"'
        }
    },
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
};
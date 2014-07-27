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
    'function': function () { },
    'string': '',
    'number': 12,
    'boolean': true,
    'date': new Date(),
    'regexp': new RegExp()
};

// Has
$H.obj = {
    'key': 'value',
    'key-two': 'value-two'
}
$H.arr = [1, 2];
$H.arr['key'] = 'value';

// Validate Args
$H.arguments = function() { return arguments; };

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
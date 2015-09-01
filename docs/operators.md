# Operators

## Descend
###### >

This operator introduces a child for an element. Useful for specifying children.

`div>ul>li` and `div ul li`, both, will produce (padding and line breaks added for clarity)
````
    <div>
        <ul>
            <li></li>
        </ul>
    </div>
````

## Add
###### +

Use the `+` operator to add elements after the previous one, on the same level:

`div+p+section` will output (padding and line breaks added for clarity):
````
    <div></div>
    <p></p>
    <section></section>
````

## Ascend
###### ^

With the `>` operator, you’re descending down the generated tree and positions of all sibling elements will be resolved against the most deepest element:

`div+div>p>span+em` will be expanded to
````
    <div></div>
    <div>
        <p><span></span><em></em></p>
    </div>
````

With the `^` operator, you can climb one level up the tree and change context where the following elements should appear:

`div+div>p>span+em^section` outputs to
````
    <div></div>
    <div>
        <p><span></span><em></em></p>
        <section></section>
    </div>
````

You can use as many `^` operators as you like, each operator will move one level up:

`div+div>p>span+em^^^section` will output to
````
    <div></div>
    <div>
        <p><span></span><em></em></p>
    </div>
    <section></section>
````

## Transcend
###### *

With the `*` operator, you can define how many times element should be outputted. The repetition occurs on an element, so until the context comes out of the element.

`ul.menu>li.option*5` outputs to
````
    <ul class="menu">
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
        <li class="option"></li>
    </ul>
````

## Group
###### ()

Parentheses are used to group sub-trees in complex `steno string`s:

`div>(header>ul>li*2>a[href])+footer>p` expands to
````
    <div>
        <header>
            <ul>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
            </ul>
        </header>
        <footer>
            <p></p>
        </footer>
    </div>
````

If you’re working with the browser’s DOM, you may think of groups as Document Fragments: each group contains a `steno string` sub-tree and all the following elements are inserted at the same level as the first element of group.

You can nest groups inside each other and combine them with the multiplication `*` operator:

`(div>dl>(dt+dd)*3)+footer>p` produces
````
    <div>
        <dl>
            <dt></dt>
            <dd></dd>
            <dt></dt>
            <dd></dd>
            <dt></dt>
            <dd></dd>
        </dl>
    </div>
    <footer>
        <p></p>
    </footer>
````

## Context
###### \

To provide context, one can use `\`. When included in a string, since `\` is used to escape other characters, `\\` should be used instead.

To learn more about contexts, proceed to templating.

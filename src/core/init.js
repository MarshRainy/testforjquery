/**
 * Created by YuHan on 2016/7/20.
 */

define([
    '../core',
    '../var/document'
], function (aquery, document) {
    'use strict';

    var
        // 如果不指定根, 默认的根为document
        rootAQuery,

        // <>或#id
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

        // 初始化时的选择
        init = aquery.prototype.init = function (selector, context, root) {
            var match, elem;

            // 处理选择器为空的时候
            if (!selector){
                return this;
            }

            // 至少为document
            root = root || rootAQuery;

            // 处理选择器是字符串的情况
            if (typeof selector === 'string'){
                // 解析selector
                if (selector[ 0 ] === "<" &&
                    selector[ selector.length - 1 ] === ">" &&
                    selector.length >= 3 ){
                    match = [null, selector, null];
                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if ( match && ( match[ 1 ] || !context ) ) {

                    // HANDLE: $(html) -> $(array)
                    if ( match[ 1 ] ) {
                        context = context instanceof jQuery ? context[ 0 ] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        aquery.merge( this, aquery.parseHTML(
                            match[ 1 ],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ) );

                        // HANDLE: $(html, props)
                        if ( rsingleTag.test( match[ 1 ] ) && aquery.isPlainObject( context ) ) {
                            for ( match in context ) {

                                // Properties of context are called as methods if possible
                                if ( aquery.isFunction( this[ match ] ) ) {
                                    this[ match ]( context[ match ] );

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr( match, context[ match ] );
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById( match[ 2 ] );

                        if ( elem ) {

                            // Inject the element directly into the jQuery object
                            this[ 0 ] = elem;
                            this.length = 1;
                        }
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if ( !context || context.aquery ) {
                    return ( context || root ).find( selector );

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor( context ).find( selector );
                }
            }

            // 处理DOMElement
            else if (selector.nodeType){
                this[0] = selector;
                this.length=1;
                return this;
            }

            // 处理function
            else if (aquery.isFunction(selector)){
                return root.ready != undefined ?
                    root.ready(selector) :
                    selector(aquery);
            }

            return aquery.makeArray(selector, this);
        };

    // 将初始化函数的prototype关联到aquery的prototype
    init.prototype = aquery.prototype;

    // 默认的根为document
    rootAQuery = aquery(document);

    return init;
});

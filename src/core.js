/**
 * Created by YuHan on 2016/7/14.
 *
 * the core of aquery
 */

define([
    './var/class2type',
    './var/toString'
], function (
    class2type,
    toString
) {
'use strict';

var
    aquery = function () {
        return new aquery.prototype.init();
    };

aquery.prototype = {
    constructor: aquery,
    init: function () {
        return this;
    }
};

aquery.extend = aquery.prototype.extend = function () {
    var
        options,name,src,copy,
        length = arguments.length,
        target = arguments[0] || {},
        i = 1,
        deep = false;
    ;

    // 是否深拷贝
    if (typeof target === 'boolean'){
        deep = target;
        target = arguments[i] || {};
        i++;
    }

    // 如果target不是函数也不是对象, 新建一个对象
    if (typeof target !== 'object' && !aquery.isFunction(target)){
        target = {};
    }

    // 如果除了是否为深拷贝参数只有一个参数, target为this
    if (i === length){
        target = this;
        i--;
    }

    for ( ; i < length; i++){

        // 不处理空值
        if ((options = arguments[i]) == null){
            continue;
        }

        // 循环属性
        for ( name in options){
            src = target[name];
            copy = options[name];
        }
    }
}

aquery.extend({
    isFunction: function( obj ) {
        return aquery.type( obj ) === "function";
    }
});

aquery.prototype.init.prototype = aquery.prototype;

return aquery;
});

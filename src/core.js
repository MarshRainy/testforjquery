/**
 * Created by YuHan on 2016/7/14.
 *
 * the core of aquery
 */

define([
    './var/getProto',
    './var/class2type',
    './var/toString',
    './var/hasOwn',
    './var/fnToString',
    './var/ObjectFunctionString'
], function (
    getProto,
    class2type,
    toString,
    hasOwn,
    fnToString,
    ObjectFunctionString
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
        options,name,src,copy,copyIsArray,clone,
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

            // 防止自引用, 源的某个属性不能为目标
            if ( target === copy ) {
                continue;
            }

            // 是否是深循环, 进行合并
            if ( deep && copy && ( aquery.isPlainObject( copy ) ||
                ( copyIsArray = aquery.isArray( copy ) ) ) ) {

                if ( copyIsArray ) {
                    copyIsArray = false;
                    clone = src && aquery.isArray( src ) ? src : [];

                } else {
                    clone = src && aquery.isPlainObject( src ) ? src : {};
                }

                // Never move original objects, clone them
                target[ name ] = aquery.extend( deep, clone, copy );

                // Don't bring in undefined values
            } else if ( copy !== undefined ) {
                target[ name ] = copy;
            }
        }
    }
    return target;
}

aquery.extend({
    // 是否为数组
    isArray: Array.isArray,

    // obj是否是全局window
    isWindow: function( obj ) {
        return obj != null && obj === obj.window;
    },

    // 对typeof进行增强, 如果obj为函数或对象(排除null), 解析其真正的类型
    type: function( obj ) {
        if ( obj == null ) {
            return obj + "";
        }

        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
        class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    },

    // 是否为函数, 使用增强的type判断
    isFunction: function( obj ) {
        return aquery.type( obj ) === "function";
    },

    // 是否为原生的对象
    isPlainObject: function( obj ) {
        var proto, Ctor;

        // 对象为空或不为对象, 返回false
        if ( !obj || toString.call( obj ) !== "[object Object]" ) {
            return false;
        }

        proto = getProto( obj );

        // 对象没有原型, 返回true
        if ( !proto ) {
            return true;
        }

        // 其他情况只有原型严格为Object时,才返回true
        Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
        return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
    },

    // 对obj循环
    each: function( obj, callback ) {
        var length, i = 0;

        if ( isArrayLike( obj ) ) {
            length = obj.length;
            for ( ; i < length; i++ ) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    break;
                }
            }
        } else {
            for ( i in obj ) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    break;
                }
            }
        }

        return obj;
    }
});

// 构建class2type的数据
aquery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
    function( i, name ) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    } );

// obj是否可以像数组一样的行为, 可以供each使用
function isArrayLike( obj ) {

    var length = !!obj && "length" in obj && obj.length,
        type = aquery.type( obj );

    if ( type === "function" || aquery.isWindow( obj ) ) {
        return false;
    }

    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

aquery.prototype.init.prototype = aquery.prototype;

return aquery;
});

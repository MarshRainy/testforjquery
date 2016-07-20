/**
 * Created by YuHan on 2016/7/14.
 */

require(['../../src/aquery'], function(aquery){
    console.log('aquery: ');
    console.log(aquery);
    console.log('aquery(): ');
    console.log(aquery());

    console.log('------------------------------');

    console.log('test 1: ');

    console.log(aquery.type(new Number(1)));
    console.log(typeof new Number(1));

    console.log('------------------------------');

    console.log('test 2: ');

    console.log(aquery.find);
    console.log(aquery.expr);

    var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
    console.log(rquickExpr.exec('#iddd'));
});

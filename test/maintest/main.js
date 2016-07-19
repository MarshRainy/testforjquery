/**
 * Created by YuHan on 2016/7/14.
 */

require.config({
    paths:{
        aquery: '../../src'
    }
});

require(['aquery/aquery'], function(aquery){
    console.log('aquery: ');
    console.log(aquery);
    console.log('aquery(): ');
    console.log(aquery());

    console.log('------------------------------');

    console.log('test 1: ');
    console.log(aquery.extend(true,{a:[12,2]},{b:'sww'}));
});

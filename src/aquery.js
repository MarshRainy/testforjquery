/**
 * Created by YuHan on 2016/7/14.
 *
 * aquery like jquery
 */

define([
    './core',
    './selector',
    './tracersing'
], function (aquery) {

    "use strict";

    return (window.aquery = aquery);
});

/**
 * Created by YuHan on 2016/7/20.
 */

define( [
    "./core",
    "../external/sizzle/sizzle"
], function( jQuery, Sizzle ) {

    "use strict";

    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

// Deprecated
    jQuery.expr[ ":" ] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;

} );

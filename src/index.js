import React from "react";
import "./dump.css";
import { renderElement } from "./format";

import _forEach from "lodash-es/forEach";
import _includes from "lodash-es/includes";
import _keys from "lodash-es/keys";

/* unimplemented options retained here by lazy developer
 * in previous versions, opts.expand could be an array of object class names to expand
 * output  string, where to send results, 'browser' | 'console' | ?'file'
 * format  string, how to format, 'text'
 * hide: null // hide column or keys
 * keys: null // For a structure, number of keys to display
 * show: null // show column or keys
 * top: null // The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
*/

/*
 * obj     variable to be dumped
 * expand  boolean, expands views
 * label   string, header for the dump output
 * format  string, 'htmlTable' | 'htmlGrid'
 */
export const Dump = ( {obj, expand=true, format='htmlTable', label='' } ) => {
    const { cache, elementProps } = getElementProps( { obj, opts: { expand, format, label } } );
    return renderElement( elementProps );
};

// returns cache of elements & root props for later rendering
// this will allow us to do text rendering in a later version
const getElementProps = ( args ) => {
    let defaultCache = {
        bFilteredLevel: false,
        depth: 0,
        index: 0,
        objects: [ ],
        paths: [ ],
    };

    let {
        obj,
        opts = {expand:true, format:'htmlTable', label:''},
        cache = defaultCache,
        currentPath = [],
        objName = '',
        documentFragment = "",
    } = args;

    const dataType = getDataType(obj);
    let elementKeys = [];

    if (!opts.label.length) {
        opts.label = dataType;
    }

    if (!objName.length) {
        objName = opts.label;
    }

    cache.index++;
    const isComplexObject = _includes( ['Object','Array'], dataType );

    if ( isComplexObject ) {
        // if the current object is a complex object which exists in cache, return a circular reference
        const circularReference = getCircularRef( obj, cache );
        if ( circularReference.currentPath ) {
            let elementProps = mapElementProps( 'CircularReference', obj, opts, objName, cache.index, [ ], circularReference.currentPath, circularReference.documentFragment );
            return { cache, elementProps };
        }
        elementKeys = _keys(obj).sort();
        opts.label += ` [${elementKeys.length}]`;  // append quantity of elements
    }

    currentPath.push( objName );
    let elementProps = mapElementProps( dataType, obj, opts, objName, cache.index, [ ], currentPath, '' );

    // cache
    if ( isComplexObject ) {
        cache.objects.push( obj );
        cache.paths.push( { currentPath, documentFragment:'#reactdump' + cache.index } );
    }

    // recurse through complex objects when they have children
    if ( elementKeys.length ) {
        cache.depth++; // for level throttling someday
    }
    _forEach(elementKeys, ( i ) => {
        // disambiguation alias advisory
        let { elementProps:child } = getElementProps( {
            obj:obj[i],
            opts:{expand:opts.expand, label:''},
            cache,
            currentPath:[...currentPath],
            objName:i,
        });
        elementProps.children.push(child);
    });

    return { cache, elementProps };


    function getDataType( obj ) {
        const toString = Object.prototype.toString;
        let dataType = toString.call( obj );
        dataType = dataType.split(' ')[1];
        dataType = dataType.substring(0, dataType.length-1);
        return dataType;
    }


    function getCircularRef( obj, { objects, paths } ) {
        let circularReference = { };

        if ( typeof obj === 'object' ) {
            let i = objects.indexOf( obj );
            if (i !== -1) {
                circularReference = paths[i];
            }
        }

        return circularReference;
    }

    function mapElementProps( dataType, obj, opts, name, index, children, path, documentFragment ) {
        return { dataType, obj, opts, name, index, children, path, documentFragment };
    }

};


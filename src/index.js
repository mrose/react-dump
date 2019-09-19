import React from "react";
import "./dump.css";
import { renderElement } from "./format";

/* not implemented yet
  in previous versions, opts.expand could be an array of object class names to expand
, hide: null // hide column or keys
, keys: null // For a structure, number of keys to display
, show: null // show column or keys
, top: null // The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
*/

export const Dump = props => {
    const {
        obj = null, // the variable to be dumped
        expand = true, // boolean, expands views
        format = "html", // string, , 'html' | 'text'
        label = "", // string, header for the dump output
        output = "browser" // string, where to send results, 'browser' | 'console' | ?'file'
    } = props;
    let { cache, elementProps } = getElementProps({
        obj,
        opts: { expand, format, label, output }
    });
    cache = {}; // clear some memory
    /*
          if ( this.opts.output !== 'browser' ) {
            return null
          }
      */
    //return renderElement(elementProps);
    return "foo";
};

// returns cache of elements & root props for later rendering
// this will allow us to do text rendering in a later version
const getElementProps = ( args={ } ) => {
    // default to sensible params when necessary
    let { obj, opts, cache, currentPath, objName, dataType, documentFragment } = defaults( args )

    cache.index++

    // if the current object is a complex object which exists in cache, return a circular reference
    if ( ['Object','Array'].indexOf(dataType) !== -1 ) {
        const circularReference = getCircularRef( obj, cache.objects, cache.paths )
        if ( circularReference.currentPath ) {
            let elementProps = mapElementProps( 'CircularReference', obj, opts, objName, cache.index, [ ], circularReference.currentPath, circularReference.documentFragment )
            return { cache, elementProps }
        }
    }

    // update the label with the number of elements if a collection
    let { updatedLabel, sparseKeys } = appendElementsLengthToLabel( obj, dataType, opts.label )
    opts.label = updatedLabel

    currentPath.push( objName )
    let elementProps = mapElementProps( dataType, obj, opts, objName, cache.index, [ ], currentPath, '' )

    // cache
    if ( ['Object','Array'].indexOf(dataType) !== -1 ) {
        cache.objects.push( obj )
        cache.paths.push( { currentPath, documentFragment:'#reactdump' + cache.index } )
    }

    // recurse through complex objects which have children
    if ( sparseKeys.length ) {
        cache.depth++  // for level throttling later
        for ( let i of sparseKeys ) {
            let elementArgs = { obj:obj[i]
                , opts:opts={expand:opts.expand}
                , cache
                , currentPath:[...currentPath]
                , objName:i
            }
            // disambiguation alias advisory
            let { elementProps:child } = getElementProps( elementArgs )
            elementProps.children.push(child)
        }
    }

    return { cache, elementProps }


    function defaults( args={ } ) {
        const obj = args.obj
        const dataType = getDataType( obj )
        //  || new Error('No object provided') // Error when no object provided
        const opts = args.opts || { }
        opts.expand = opts.expand || true
        opts.format = opts.format || 'html'
        opts.label = opts.label || ''
        opts.label =  opts.label.length ? opts.label : dataType
        const cache = args.cache || { bFilteredLevel: false
            , depth: 0
            , index: 0
            , objects: [ ]
            , paths: [ ]
        }
        const currentPath = args.currentPath || [ ]
        const documentFragment = args.documentFragment || ''
        const objName = args.objName || opts.label
        return { obj, opts, cache, currentPath, objName, dataType, documentFragment }
    }


    function getDataType( obj ) {
        const toString = Object.prototype.toString
        let dataType = toString.call( obj )
        dataType = dataType.split(' ')[1]
        dataType = dataType.substring(0, dataType.length-1)
        return dataType
    }


    function getCircularRef( obj, objectsCache, pathsCache ) {
        let circularReference = { }

        if ( typeof obj !== 'object' ) {
            return circularReference
        }

        let pos = objectsCache.indexOf( obj )
        if (pos !== -1) {
            circularReference = pathsCache[pos]
        }

        return circularReference
    }


    function appendElementsLengthToLabel( obj, dataType, label ) {
        let sparseKeys = [ ]
        let updatedLabel = label

        // not an Object or Array
        if ( ['Object','Array'].indexOf( dataType ) === -1 ) {
            return { updatedLabel, sparseKeys }
        }

        // label should show number of elements for complex objects
        if ( dataType === 'Object' ) {
            sparseKeys = Object.keys(obj).sort()
        } else {
            sparseKeys = Object.keys(obj)
        }
        updatedLabel+= ` [${sparseKeys.length}]`
        return { updatedLabel, sparseKeys }
    }


    function mapElementProps( dataType, obj, opts, name, index, children, path, documentFragment ) {
        return { dataType, obj, opts, name, index, children, path, documentFragment }
    }

}


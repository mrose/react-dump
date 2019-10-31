import React from 'react';
import './dump.css';
import {createUseStyles, useTheme, ThemeProvider, JssProvider} from 'react-jss';
import theme from './theme.json';
import { renderElement } from './format';
import { dataTypes } from "./dataTypes/index";

import _forEach from 'lodash-es/forEach';
import _includes from 'lodash-es/includes';
import _indexOf from 'lodash-es/indexOf';
import _keys from 'lodash-es/keys';
import _uniqueId from 'lodash-es/uniqueId';


/* unimplemented options retained here by lazy developer
 * in previous versions, opts.expand could be an array of object class names to expand
 * output  string, where to send results: 'browser' | 'console' | ?'file'
 * format  string, how to format: 'htmlTable', 'htmlFlex', 'text'
 * hide: null // hide column or keys
 * keys: null // For a structure, number of keys to display
 * show: null // show column or keys
 * top: null // The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
*/

/*
 * obj     variable to be dumped
 * expand  boolean, expands views
 * label   string, top level heading for the output
 * format  string, 'htmlTable' | 'htmlFlex'
 */
export const Dump = ( {obj, expand=true, format='htmlTable', label='' } ) => {
    const eps = getElementProps( {obj, label} );
        return (
            <JssProvider classNamePrefix='react-dump-'>
                <ThemeProvider {...{theme}}>
                    { renderElement( {expand, format, ...eps} ) }
                </ThemeProvider>
            </JssProvider>
        );
};

export function getDataType( elem, unknown=true ) {
    const toString = Object.prototype.toString;
    let dataType = toString.call( elem );
    dataType = dataType.split(' ')[1];
    dataType = dataType.substring(0, dataType.length-1);
    if ( unknown && _indexOf(_keys(dataTypes), dataType) === -1 ) {
      dataType = 'Unknown';
    }
    return dataType;
}

export function findCircularRef( element, cache ) {
  const { objects:elements, paths } = cache;
  if ( typeof element === 'object' ) {
      let i = elements.indexOf( element );
      if (i !== -1) {
          return paths[i];
      }
  }
  return { };
}

// returns root element props for later rendering
// this will allow us to do text rendering in a later version
export const getElementProps = ( props={} ) => {
    let {
      cache = {
          bFilteredLevel: false,
          depth: 0,
          index: 0,
          objects: [ ],
          paths: [ ],
      },
      currentPath = [],
      documentFragment = "",
      id =  _uniqueId('reactdump'),
      label = '',
      obj,
      name = '',
    } = props;

    cache.index++;
    const dataType = getDataType(obj);

    if (!label.length) {
        label = dataType;
    }

    if (!name.length) {
        name = label;
    }
    currentPath.push(name);

    let elementProps = {
      children:[],          // an array of elementProps
      dataType,             // derived dataType
      documentFragment:'',  // used for circularReference
      id,                   // used for circularReference
      index:cache.index,    // keeping it distinct
      label,                // label passed it (top level only) /+ number of child elements
      name,                 // used for circularReference (defaults to dataType)
      obj,                  // the element itself
      path:currentPath      // used for circularReference
    };

    if ( !_includes( ['Object','Array'], dataType ) ) {
      return elementProps;
    }

    // if the current object is a complex object which already exists in cache, return a circular reference
    const circularReference = findCircularRef( obj, cache );
    if ( circularReference.currentPath ) {
      elementProps.dataType = 'CircularReference';
      elementProps.index = cache.index;
      elementProps.path = circularReference.currentPath;
      elementProps.documentFragment = circularReference.documentFragment;

      return elementProps;
    }

    let elementKeys = _keys(obj).sort();
    elementProps.label += ` [${elementKeys.length}]`;  // append quantity of elements

    // cache
    cache.objects.push( obj );
    cache.paths.push( { currentPath, documentFragment:'#reactdump' + cache.index } );
    if ( elementKeys.length ) {
        cache.depth++; // for level throttling someday
    }

    // recurse through complex objects when they have children
    _forEach(elementKeys, ( i ) => {
        let child = getElementProps({
            obj:obj[i],
            cache,
            currentPath:[...currentPath],
        });
        elementProps.children.push(child);
    });

    return elementProps;
};

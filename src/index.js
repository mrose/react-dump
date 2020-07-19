import React from 'react';
import './dump.css';
import jss from 'jss';
import jssPluginNested from 'jss-plugin-nested';
import preset from 'jss-preset-default';
import {createUseStyles, useTheme, ThemeProvider, JssProvider} from 'react-jss';
import theme from './theme.json';
import { renderElement } from './format';

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

jss.setup(preset({ jssPluginNested:{} }))
/* example:
const theme = {
  table: {
    "border-collapse": "separate",
    "border-spacing": "2",
    width: "auto",
    "line-height": "normal",
    "font-size": "x-small",
    "font-family": "verdana, arial, helvetica, sans-serif",
    "background-color": "#dddddd",
    color: "#222222"
  }
};
*/

/*
 * obj     variable to be dumped
 * expand  boolean, expands views
 * label   string, top level heading for the output
 */
export const Dump = ( {obj, expand=true, label='' } ) => {
    const eps = getElementProps( {obj, label} );
    const format = 'htmlTable';
    return (
        <JssProvider jss={jss} classNamePrefix='dump-'>
            <ThemeProvider {...{theme}}>
                { renderElement( {expand, format, ...eps} ) }
            </ThemeProvider>
        </JssProvider>
    );
};

export function getObjectType( elem, unknown=true ) {
    const types = new Set(['Array','Boolean','Date','Error','Function','Math','Null','Number','Object','RegExp','String','Undefined']);
    const toString = Object.prototype.toString;
    let type = toString.call( elem );
    type = type.split(' ')[1];
    type = type.substring(0, type.length-1);
    if ( unknown && !types.has(type) ) {
      type = 'Unknown';
    }
    return type;
}

export function findCircularRef( element, cache ) {
  const { objects:elements, paths } = cache;
  if ( typeof element === 'object' ) {
      let i = _indexOf(elements, element);
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
    const objType = getObjectType(obj);

    if (!label.length) label = objType;

    if (!name.length) name = objType;

    currentPath.push(label);

    let elementProps = {
      children:[],          // an array of elementProps
      objType,             // derived object type
      documentFragment:'',  // used for circularReference
      id,                   // used for circularReference
      index:cache.index,    // keeping it distinct
      label,                // label provided or objType /+ number of child elements when complex
      name,                 // used for circularReference (defaults to objType)
      obj,                  // the element itself
      path:currentPath      // used for circularReference
    };

    if ( !_includes( ['Object','Array'], objType ) ) return elementProps;

    // when the current object is a complex object which already exists in cache, return a circular reference
    const circularReference = findCircularRef( obj, cache );
    if ( circularReference.currentPath ) {
      elementProps.objType = 'CircularReference';
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
    if ( elementKeys.length ) cache.depth++; // for level throttling someday

    // recurse through complex objects when they have children
    _forEach(elementKeys, ( i ) => {
        let child = getElementProps({
            obj:obj[i],
            cache,
            currentPath:[...currentPath],
            name:i
        });
        elementProps.children.push(child);
    });

    return elementProps;
};

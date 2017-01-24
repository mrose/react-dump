import React from 'react'
import getDataType from  './getDataType'
import Boolean from './Boolean'
import String from './String'
import Math from './Math'
import Undefined from './Undefined'
import Null from './Null'
import Date from './Date'
import Number from './Number'
import RegExp from './RegExp'
import Error from './Error'
import Function from './Function'
import Arr from './Arr'
import Obj from './Obj'


// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , opts: {
        label: '' // string header for top level header dump output
                     // in previous versions, expand could be an array of dataTypes to expand
      , expand: true // expands views
      , output: 'browser' // NOT IMPLEMENTED where to send results browser|console|file
      , format: 'html' // NOT IMPLEMENTED output text or HTML format
      , hide: null // NOT IMPLEMENTED hide column or keys
      , keys: null // NOT IMPLEMENTED For a structure, number of keys to display
      , show: null // NOT IMPLEMENTED show column or keys
      , top: null // NOT IMPLEMENTED The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
    }
  , cache: {
      bFilteredLevel: false
    , level:0
    , objects: []
    , paths: []
  }

  , currentPath: []
}

export default class DataTyper extends React.Component {


  render() {
    let dataType = getDataType(this.props.obj)
    let label = dataType
    if ( this.props.currentPath === '[TOP]' ) {
      label = this.opts.label + ' - ' + dataType
      //      if (opts.label) {
      //        opts.label += ' - ' + this.getDataType(obj)
              /*
              topPath += ' ' + options.label;
              if(topPath.length > CIRCULARTOPSTRINGLIMIT)
                topPath = topPath.substr(0, CIRCULARTOPSTRINGLIMIT) + '...';
                topPath += ' - ' + dataType;
              */
      //      }
    }

    switch (dataType) {
      case 'Boolean':
        return <Boolean obj={this.props.obj} label={label} expand={this.props.opts.expand} expandCells={this.props.opts.expand} />

      case 'String':
        return <String obj={this.props.obj} label={label} expand={this.props.opts.expand} expandCells={this.props.opts.expand} />

      case 'Math':
        return <Math obj={this.props.obj} label={label} expand={this.props.opts.expand} />

      case 'Undefined':
        return <Undefined obj={this.props.obj} label={label} expand={this.props.opts.expand} />

      case 'Null':
        return <Null obj={this.props.obj} label={label} expand={this.props.opts.expand} />

      case 'Date':
        return <Date obj={this.props.obj} label={label} expand={this.props.opts.expand} expandCells={this.props.opts.expand} />

      case 'Number':
        return <Number obj={this.props.obj} label={label} expand={this.props.opts.expand} expandCells={this.props.opts.expand} />

      case 'RegExp':
        return <RegExp obj={this.props.obj} label={label} expand={this.props.opts.expand} />

      case 'Error':
        return <Error obj={this.props.obj} label={label} expand={this.props.opts.expand} />

      case 'Function':
        return <Function obj={this.props.obj} label={label} expand={this.props.opts.expand} />

      case 'Array':
        return <Arr obj={this.props.obj} label={label} opts={this.props.opts} cache={this.props.cache} currentPath={this.props.currentPath} />

      case 'Object':
        return <Obj obj={this.props.obj} label={label} expand={this.props.opts.expand} />

      default:
        return <Error obj={this.props.obj} label='Unknown Data Type' expand={this.props.opts.expand} />

      } // /switch
  }

}

DataTyper.defaultProps = defaultProps

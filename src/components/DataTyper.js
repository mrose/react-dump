import React from 'react'
import getObjectClassName from './getObjectClassName'
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
      , expand: true // boolean, expands views
    }
  , cache: {
      bFilteredLevel: false
    , level:0
    , objects: []
    , paths: []
  }
  , currentPath: []
}

/*
// in previous versions, expand could be an array of object class names to expand
, opts.output: 'browser' // NOT IMPLEMENTED where to send results browser|console|file
, opts.format: 'html' // NOT IMPLEMENTED output text or HTML format
, opts.hide: null // NOT IMPLEMENTED hide column or keys
, opts.keys: null // NOT IMPLEMENTED For a structure, number of keys to display
, opts.show: null // NOT IMPLEMENTED show column or keys
, opts.top: null // NOT IMPLEMENTED The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
*/

export default class DataTyper extends React.Component {


  render() {
    let objectClassName = getObjectClassName(this.props.obj)
    let opts = {...this.props.opts}
    opts.label = objectClassName
    if ( this.props.currentPath.length === 1 ) {
      opts.label = this.props.opts.label + ' - ' + objectClassName
    }

    let classes = {
        Array: <Arr obj={this.props.obj} opts={opts} cache={this.props.cache} currentPath={this.props.currentPath} />
      , Boolean: <Boolean obj={this.props.obj} opts={opts} />
      , Date: <Date obj={this.props.obj} opts={opts} />
      , Error: <Error obj={this.props.obj} opts={opts} />
      , Function: <Function obj={this.props.obj} opts={opts} />
      , Math: <Math obj={this.props.obj} opts={opts} />
      , Null: <Null obj={this.props.obj} opts={opts} />
      , Number: <Number obj={this.props.obj} opts={opts} />
      , Object: <Obj obj={this.props.obj} opts={opts} cache={this.props.cache} currentPath={this.props.currentPath} />
      , RegExp: <RegExp obj={this.props.obj} opts={opts} />
      , String: <String obj={this.props.obj} opts={opts} />
      , Undefined: <Undefined obj={this.props.obj} opts={opts} />
    }

    // when found in the classes array:
    if ( Object.keys(classes).indexOf(objectClassName) >= 0 ) {
      return classes[objectClassName]
    }
    return <Error obj={this.props.obj} opts={{label:'Unknown Class', expand:opts.expand}} />

  }

}

DataTyper.defaultProps = defaultProps
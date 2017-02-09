import React from 'react'
import './ReactDump.css'
import getElementProps from './getElementProps'
import renderElement from './renderElement'

// assigned to component after component definition, no hoisting within
const defaultProps =  {
                        obj: null // the variable to be dumped
                      , expand: true // boolean, expands views
                      , format: 'html' // string, , 'html' | 'text'
                      , label: '' // string, header for the dump output
                      , output: 'browser' // string, where to send results, 'browser' | 'console' | ?'file'
                      }
/* not implemented yet
  in previous versions, opts.expand could be an array of object class names to expand
, hide: null // hide column or keys
, keys: null // For a structure, number of keys to display
, show: null // show column or keys
, top: null // The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
*/

export default class ReactDump extends React.Component {
  constructor(props) {
    super(props)
    const {obj, ...opts} = this.props
    const { objProps } = getElementProps( obj, opts )
    this.obj = obj
    this.opts = opts
    this.rootObjProps = objProps
  }


  componentWillMount() {
    this.output = renderElement( this.rootObjProps )
  }


  render() {
//return null
/*
    if ( this.opts.output !== 'browser' ) {
      return null
    }
*/
return ( this.output )
//    return (
//      <DataTyper obj={this.obj} opts={this.opts} cache={this.cache} currentPath={['[TOP]']} />
//    )
  }
}

ReactDump.defaultProps = defaultProps

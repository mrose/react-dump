import React from 'react'
import DataTyper from './DataTyper'
import './ReactDump.css'
import getObjProps from './getObjProps'

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
    this.cache = {
        bFilteredLevel: false
      , level:0
      , objects: []
      , paths: []
      }
    this.obj = obj
    this.opts = opts
    const { expand, format, label } = opts
    let { cache:newCache, objProps:root } = getObjProps( obj, { expand, format, label } )
//console.log( newCache )
//console.log( root )

  }


  componentWillMount() {
//console.log( 'componentWillMount')
  }

  render() {
    return (
      <DataTyper obj={this.obj} opts={this.opts} cache={this.cache} currentPath={['[TOP]']} />
    )
  }
}

ReactDump.defaultProps = defaultProps

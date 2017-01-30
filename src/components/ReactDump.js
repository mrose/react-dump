import React from 'react'
import DataTyper from './DataTyper'
import './ReactDump.css'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null // the variable to be dumped
  , expand: true // expands views
  , label: '' // string header for the dump output
}
/* not implemented yet
, output: 'browser' // where to send results browser|console|file
, format: 'html' // output text or HTML format
, hide: null // hide column or keys
, keys: null // For a structure, number of keys to display
, show: null // show column or keys
, top: null // The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
*/
export default class ReactDump extends React.Component {

  render() {
    let {obj, ...opts} = this.props
    let cache = {
        bFilteredLevel: false
      , level:0
      , objects: []
      , paths: []
      }
    return (
      <DataTyper obj={obj} opts={opts} cache={cache} currentPath={['[TOP]']} />
    )
  }
}

ReactDump.defaultProps = defaultProps

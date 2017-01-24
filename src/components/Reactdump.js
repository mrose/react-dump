import React from 'react'
import DataTyper from './DataTyper'
import '../reactdump.css'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null // the variable to be dumped
  , output: 'browser' // where to send results browser|console|file
  , expand: true // expands views
  , format: 'html' // output text or HTML format
  , hide: null // hide column or keys
  , keys: null // For a structure, number of keys to display
  , label: null // string header for the dump output
  , show: null // show column or keys
  , top: null // The number of rows to display. For a structure, this is the number of nested levels to display (useful for large stuctures)
}

export default class ReactDump extends React.Component {

  render() {
    let {obj, ...opts} = this.props
    let cache = {
        bFilteredLevel: false
      , level:0
      , objects: []
      , paths: []
      }
    let topPath = '[TOP]'
    return (
      <DataTyper obj={obj} opts={opts} cache={cache} currentPath={[topPath]} />
    )
  }
}

ReactDump.defaultProps = defaultProps

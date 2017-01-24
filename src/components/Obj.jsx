import React from 'react'
import DataTyper from './DataTyper'
import Table from './Table'
import Row from './Row'
import RowHeader from './RowHeader'
import CircularReference from './CircularReference'
import getPathToCircularRef from './getPathToCircularRef'


// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , label: ''
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

export default class Obj extends React.Component {
  render() {
    const obj = this.props.obj
    const sparseKeys = Object.keys(obj).sort()
    const label = `${this.props.label} - [${sparseKeys.length}]`
    let cache = this.props.cache
    let currentPath = this.props.currentPath
    let rows = []
    let c = 0

    // if a circular ref, write it and be done
    const circPath = getPathToCircularRef(obj, cache, currentPath)
    if (circPath.length > 0) {
      return <CircularReference expand={this.props.opts.expand} circPath={circPath} />
    }

    // if no rows, write an "empty" row and be done
    if ( sparseKeys.length === 0) {
      rows = '[empty]'
    }

    cache.level++

    for ( let i of sparseKeys ) {
      let element = obj[i]
      let subPath = [...currentPath]
      subPath.push(i)
      rows.push(<Row key={c} dataType='Object' label={i} title={i} expand={this.props.opts.expand} ><DataTyper obj={element} opts={this.props.opts} cache={cache} currentPath={subPath}/></Row>)
      c++
    }
    return (
      <Table dataType='Object' >
        <RowHeader dataType='Object' label={label} expand={this.props.opts.expand} />
        {rows}
      </Table>
    )
  }
}
Obj.defaultProps = defaultProps

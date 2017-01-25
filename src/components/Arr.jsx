import React from 'react'
import DataTyper from './DataTyper'
import Table from './Table'
import Row from './Row'
import RowHeader from './RowHeader'
import CircularReference from './CircularReference'
import getPathToCircularRef from './getPathToCircularRef'


// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: []
  , opts: {
        label: 'Array'
      , expand: true
    }
  , cache: {
      bFilteredLevel: false
    , level:0
    , objects: []
    , paths: []
  }
  , currentPath: []
}


export default class Arr extends React.Component {
  render() {
    const obj = this.props.obj
    const sparseKeys = Object.keys(obj)
    let cache = this.props.cache
    let currentPath = this.props.currentPath
    let rows = '[empty]' // assume empty
    if (sparseKeys.length) {
      rows = []
    }
    const label = `${this.props.opts.label} - (${sparseKeys.length})`

    // if a circular ref, write it and be done
    const circPath = getPathToCircularRef(obj, cache, currentPath)
    if (circPath.length > 0) {
      return <CircularReference expand={this.props.opts.expand} circPath={circPath} />
    }

    cache.level++

    for ( let i of sparseKeys ) {
      let element = obj[i]
      let subPath = [...currentPath]
      subPath.push(i)
      rows.push(<Row key={i} className='reactdump-label reactdump-Array' label={i} expand={this.props.opts.expand} ><DataTyper obj={element} opts={this.props.opts} cache={cache} currentPath={subPath}/></Row>)
    }

    return (
      <Table className='reactdump reactdump-Array' >
        <RowHeader className='reactdump-label reactdump-Array' label={label} expand={this.props.opts.expand} />
        {rows}
      </Table>
    )
  }
}
Arr.defaultProps = defaultProps

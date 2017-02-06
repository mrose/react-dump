import React from 'react'
import DataTyper from './DataTyper'
import Table from './Table'
import Row from './Row'
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
    const label = `${this.props.opts.label} - (${sparseKeys.length})`
    let cache = this.props.cache
    let currentPath = this.props.currentPath
    let rows = [<Row key='0' className='reactdump-label reactdump-Array' expand={this.props.opts.expand} cols='1'>[EMPTY]</Row>]
    if (sparseKeys.length) {
      rows = []
    }
    let c = 0

    // handle circular refs
    const circPath = getPathToCircularRef(obj, cache, currentPath)
    if (circPath.length > 0) {
      return <CircularReference expand={this.props.opts.expand} circPath={circPath} />
    }

    cache.level++

    for ( let i of sparseKeys ) {
      let element = obj[i]
      let subPath = [...currentPath]
      subPath.push(i)
      rows.push(<Row key={c} className='reactdump-label reactdump-Array' label={i} title={i} expand={this.props.opts.expand} ><DataTyper obj={element} opts={{expand:this.props.opts.expand}} cache={cache} currentPath={subPath}/></Row>)
      c++
    }

    return (
      <Table className='reactdump reactdump-Array' label={label} expand={this.props.opts.expand}>
        {rows}
      </Table>
    )
  }
}
Arr.defaultProps = defaultProps

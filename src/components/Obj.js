import React from 'react'
import DataTyper from './DataTyper'
import Table from './Table'
import Row from './Row'
import CircularReference from './CircularReference'
import getPathToCircularRef from './getPathToCircularRef'


// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: {}
  , opts: {
        label: 'Object' // string header for top level header dump output
                     // in previous versions, expand could be an array of dataTypes to expand
      , expand: true // expands views
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
    const label = `${this.props.opts.label} - (${sparseKeys.length})`
    let cache = this.props.cache
    let currentPath = this.props.currentPath
    let rows = '[empty]'
// TODO fix above
    if ( sparseKeys.length ) {
      rows = []
    }
    let c = 0

    // handle circular refs
    const circPath = getPathToCircularRef(obj, cache.objects, cache.paths)
    if (circPath.length > 0) {
      return <CircularReference expand={this.props.opts.expand} circPath={circPath} />
    }
    // add to cache
    cache.objects.push( obj )
    cache.paths.push( currentPath )

    cache.level++

    for ( let i of sparseKeys ) {
      let element = obj[i]
      let subPath = [...currentPath]
      subPath.push(i)
      rows.push(<Row key={c} className='reactdump-label reactdump-Object' label={i} title={i} expand={this.props.opts.expand} ><DataTyper obj={element} opts={{expand:this.props.opts.expand}} cache={cache} currentPath={subPath}/></Row>)
      c++
    }
    return (
      <Table className='reactdump reactdump-Object' label={label} expand={this.props.opts.expand}>
        {rows}
      </Table>
    )
  }
}
Obj.defaultProps = defaultProps

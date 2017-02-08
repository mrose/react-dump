import React from 'react'
import sortingHat from './sortingHat'
import Table from './Table'
import Row from './Row'


// assigned to component after component definition, no hoisting within
const defaultProps =  { obj: {}
                      , opts: { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Object'
                              }
                      , children: []
                      }

export default class Obj extends React.Component {
  render() {
    const obj = this.props.obj
    const opts = this.props.opts
    const children = this.props.children
    let rows = []
    for ( let element of children ) {
      let { objectClassName, obj, opts, name, index, children, path } = element
      let row = sortingHat( objectClassName, obj, opts, name, index, children, path )
      rows.push(
          <Row key={opts.id} className='reactdump-label reactdump-Object' label={name} title={name} expand={opts.expand} >
            {row}
          </Row>)
    }
    return (
      <Table className='reactdump reactdump-Object' label={opts.label} expand={opts.expand}>
        {rows}
      </Table>
    )
  }
}
Obj.defaultProps = defaultProps

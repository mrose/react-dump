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

export default class Arr extends React.Component {
  render() {
    const obj = this.props.obj
    const opts = this.props.opts
    const children = this.props.children
    let rows = []
    // nb 'of' returns the element, 'for' returns the index
    for ( let element of children ) {
//console.log( opts.label )
      let { objectClassName, obj, opts, name, index, children, path } = element
      let child = sortingHat( element )
      rows.push(
          <Row key={opts.id} className='reactdump-label reactdump-Array' label={name} title={name} expand={opts.expand} >
            {child}
          </Row>)
    }
    return (
      <Table className='reactdump reactdump-Array' label={opts.label} expand={opts.expand}>
        {rows}
      </Table>
    )
  }
}
Arr.defaultProps = defaultProps

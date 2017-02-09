import React from 'react'
import sortingHat from '../sortingHat'
import Table from '../Table'
import Row from '../Row'

function Arr( props ) {
  const obj = props.obj || { }
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Object'
                              }
  const children = props.children || []

  let rows = []
  // nb 'of' returns the element, 'for' returns the index
  for ( let element of children ) {
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
export default Arr

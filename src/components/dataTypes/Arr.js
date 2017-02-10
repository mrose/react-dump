import React from 'react'
import renderElement from '../renderElement'
import Table from '../Table'
import Row from '../Row'

function Arr( props ) {
  const obj = props.obj || { }
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Array'
                              }
  const children = props.children || []

  let rows = []
  // nb 'of' returns the element, 'for' returns the index
  for ( let element of children ) {
    let { opts, name, index } = element
    rows.push(
        <Row key={index} id={'reactdump' + index} className='reactdump-label reactdump-Array' label={name} title={name} expand={opts.expand} >
          {renderElement( element )}
        </Row>)
  }

  return (
    <Table className='reactdump reactdump-Array' label={opts.label} expand={opts.expand}>
      {rows}
    </Table>
  )

}
export default Arr

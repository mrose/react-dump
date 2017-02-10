import React from 'react'
import Table from '../Table'
import Row from '../Row'

function CircularReference( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Circular Reference'
                              }
  const children = props.children || [ ]
  const path = props.path || [ ]
  const documentFragment = props.documentFragment || ''

// TODO needs mo loving:   <a href='#{props.documentFragment}'>{path.join( '>>' )}</a>
// specially when target is collapsed

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Circular-Reference' expand={expand}>
      <Row className='reactdump-label reactdump-Circular-Reference' label='Circular Reference' expand={expand} cols='2'>
        <a href={documentFragment}>{path.join( '>>' )}</a>
      </Row>
    </Table>
  )

}
export default CircularReference

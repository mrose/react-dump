import React from 'react'
import Table from '../Table'
import Row from '../Row'

function CircularReference( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Circular Reference'
                              }
  const children = props.children || []
  const path = props.path || {
                                  // some more stuff here
                              }
  const p = path.join( '>>' )
  return (
    <Table className='reactdump reactdump-Circular-Reference' expand={opts.expand}>
      <Row className='reactdump-label reactdump-Circular-Reference' label={opts.label} expand={opts.expand} cols='2'>
        {p}
      </Row>
    </Table>
  )

}
export default CircularReference

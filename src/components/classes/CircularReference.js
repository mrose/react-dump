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
  const children = props.children || [ ]
  const path = props.path || [ ]
/*  {
                                  // some more stuff here
                              }
*/
  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Circular-Reference' expand={expand}>
      <Row className='reactdump-label reactdump-Circular-Reference' label='Circular Reference' expand={expand} cols='2'>
        {path.join( '>>' )}
      </Row>
    </Table>
  )

}
export default CircularReference

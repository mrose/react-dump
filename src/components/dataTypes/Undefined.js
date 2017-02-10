import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Undefined( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Undefined'
                              }
  const children = props.children || []
  const path = props.path || {
                                  // some more stuff here
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Undefined' expand={expand}>
      <Row className='reactdump-label reactdump-Undefined' label={label} expand={expand} cols='1'>
        {obj}
      </Row>
    </Table>
  )

}
export default Undefined

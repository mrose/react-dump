import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Null( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Null'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Null' expand={expand}>
      <Row className='reactdump-label reactdump-Null' label={label} expand={expand} cols='1'>
        {obj}
      </Row>
    </Table>
  )

}
export default Null

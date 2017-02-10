import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Math( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Math'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Math' expand={expand}>
      <Row className='reactdump-label reactdump-Math' label={label} expand={expand} cols='1'>
        {obj}
      </Row>
    </Table>
  )

}
export default Math

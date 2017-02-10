import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Number( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Number'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Number' expand={expand}>
      <Row className='reactdump-label reactdump-Number' label={label} expand={expand} expandCells={expand}>
        {obj.toString()}
      </Row>
    </Table>
  )

}
export default Number

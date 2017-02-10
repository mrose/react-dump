import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Error( props ) {
  const obj = props.obj || 'whoops! :)'
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Error'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Error' label='Error' cols='1' expand={expand}>
      <Row className='reactdump-label reactdump-Error' label={label} expand={expand} expandCells={expand}>
        {obj.toString()}
      </Row>
    </Table>
  )

}
export default Error

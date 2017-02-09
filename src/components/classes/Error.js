import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Error( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Error'
                              }
  const children = props.children || []
  const path = props.path || {
                                  // some more stuff here
                              }

  return (
    const { label, expand } = opts
    <Table className='reactdump reactdump-Error' label={label} cols='1' expand={expand}>
      <Row className='reactdump-label reactdump-Error' label={label} expand={expand} expandCells={expand}>
        {obj.toString()}
      </Row>
    </Table>
  )

}
export default Error

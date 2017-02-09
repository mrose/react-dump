import React from 'react'
import Table from '../Table'
import Row from '../Row'

function RegExp( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'RegExp'
                              }
  const children = props.children || []
  const path = props.path || {
                                  // some more stuff here
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-RegExp' label={label} cols='1' expand={expand}>
      <Row className='reactdump-label reactdump-RegExp' label={label} expand={expand} expandCells={expand}>
      {obj.toString()}
      </Row>
    </Table>
  )

}
export default RegExp

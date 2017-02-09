import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Date( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Date'
                              }
  const children = props.children || []
  const path = props.path || {
                                  // some more stuff here
                              }

  return (
    <Table className='reactdump reactdump-Date' expand={opts.expand}>
      <Row className='reactdump-label reactdump-Date' label={opts.label} expand={opts.expand} expandCells={opts.expand}>
      {obj.toString()}
      </Row>
    </Table>
  )

}
export default Date

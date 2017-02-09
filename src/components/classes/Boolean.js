import React from 'react'
import Table from '../Table'
import Row from '../Row'

function Boolean( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Boolean'
                              }
  const children = props.children || []

  return (
    <Table className='reactdump reactdump-Boolean' expand={opts.expand}>
      <Row className='reactdump-label reactdump-Boolean' label={opts.label} expand={opts.expand} expandCell={opts.expand}>
        <span className={obj ? 'reactdump-yes' : 'reactdump-no'}>{obj.toString()}</span>
      </Row>
    </Table>
  )

}
export default Boolean

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

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Boolean' expand={expand}>
      <Row className='reactdump-label reactdump-Boolean' label={label} expand={expand} expandCell={expand}>
        <span className={obj ? 'reactdump-yes' : 'reactdump-no'}>{obj.toString()}</span>
      </Row>
    </Table>
  )

}
export default Boolean

import React from 'react'
import Table from '../Table'
import Row from '../Row'
import escapeHtml from '../escapeHtml'

function Function( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Function'
                              }
  const children = props.children || []
  const path = props.path || {
                                  // some more stuff here
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Function' label='Function' cols='1' expand={expand}>
      <Row className='reactdump-label reactdump-Function' label={label} expand={expand} cols="1">
        <pre>
        <code className="lang-javascript">
          {escapeHtml(obj.toString().replace(/\t/g, ''))}
        </code>
        </pre>
      </Row>
    </Table>
  )

}
export default Function

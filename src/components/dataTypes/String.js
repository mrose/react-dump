import React from 'react'
import Table from '../Table'
import Row from '../Row'
import escapeHtml from './escapeHtml'

function String( props ) {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'String'
                              }

  function getRowProps( len, label, expand ) {
    let rowProps =  { className:'reactdump-label reactdump-String'
                    }

    if (len !== 0) {
      rowProps.label = label
      rowProps.expand = expand
    }

    return rowProps
  }


  function getTxt(obj) {
    let txt = '[empty]'
    if (obj.length !== 0) {
      txt = escapeHtml(obj)
    }
    return txt
  }


  // TODO var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-String' expand={expand}>
      <Row {...getRowProps( obj.length, label, expand )} >
        {getTxt(obj)}
      </Row>
    </Table>
  )

}
export default String

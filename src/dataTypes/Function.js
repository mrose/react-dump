import React from 'react';
import { Row, Table } from '../format';
import escapeHtml from './escapeHtml';


export const Function = ( props ) => {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Function'
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

};

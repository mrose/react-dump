import React from 'react';
import { Row, Table } from '../format';


export const Undefined = ( props ) => {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Undefined'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Undefined' expand={expand}>
      <Row className='reactdump-label reactdump-Undefined' label={label} expand={expand} cols='1'>
        {obj}
      </Row>
    </Table>
  )

};

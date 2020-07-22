import React from 'react';
import { Row, Table } from '../format';


export const Null = ( props ) => {
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Null'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Null' expand={expand}>
      <Row className='reactdump-label reactdump-Null' label={label} expand={expand} cols='1'>
        {obj}
      </Row>
    </Table>
  )

};

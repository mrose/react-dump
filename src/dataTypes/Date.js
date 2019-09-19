import React from 'react';
import { Row, Table } from '../format';


export const Date = ( props ) => {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Date'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Date' expand={expand}>
      <Row className='reactdump-label reactdump-Date' label={label} expand={expand} expandCells={expand}>
      {obj.toString()}
      </Row>
    </Table>
  )

};

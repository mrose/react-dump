import React from 'react';
import { Row, Table } from '../format';


export const RegExp = ( props ) => {
  const obj = props.obj || null
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'RegExp'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-RegExp' label={label} cols='1' expand={expand}>
      <Row className='reactdump-label reactdump-RegExp' label={label} expand={expand} expandCells={expand}>
      {obj.toString()}
      </Row>
    </Table>
  )

};

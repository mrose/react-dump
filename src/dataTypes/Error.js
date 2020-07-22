import React from 'react';
import { Row, Table } from '../format';


export const Error = ( props ) => {
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Error'
                              }

  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Error' label='Error' cols='1' expand={expand}>
      <Row className='reactdump-label reactdump-Error' label={label} expand={expand} expandCells={expand}>
        {obj.toString()}
      </Row>
    </Table>
  )

};

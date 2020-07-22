import React from 'react';
import { Row, Table } from '../format';


export const Boolean = ( props ) => {
  const obj = props.obj
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Boolean'
                              }
  let { label, expand } = opts
  return (
    <Table className='reactdump reactdump-Boolean' expand={expand}>
      <Row className='reactdump-label reactdump-Boolean' label={label} expand={expand} expandCell={expand}>
        <span className={obj ? 'reactdump-yes' : 'reactdump-no'}>{obj.toString()}</span>
      </Row>
    </Table>
  )

};

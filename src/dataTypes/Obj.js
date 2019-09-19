import React from 'react';
import { renderElement ,Row, Table } from '../format';


export const Obj = ( props ) => {
  const obj = props.obj || { }
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , label:'Object'
                              }
  const children = props.children || []

  let rows = []
  for ( let element of children ) {
    let { opts, name, index } = element
    rows.push(
        <Row key={index} id={'reactdump' + index} className='reactdump-label reactdump-Object' label={name} title={name} expand={opts.expand} >
          {renderElement( element )}
        </Row>)
  }

  return (
    <Table className='reactdump reactdump-Object' label={opts.label} expand={opts.expand}>
      {rows}
    </Table>
  )

};

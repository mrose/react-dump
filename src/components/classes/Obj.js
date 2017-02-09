import React from 'react'
import renderElement from '../renderElement'
import Table from '../Table'
import Row from '../Row'

function Obj( props ) {
  const obj = props.obj || { }
  const opts = props.opts ||  { expand:true
                              , format:'html'
                              , id:'reactdump999999'
                              , label:'Object'
                              }
  const children = props.children || []

  let rows = []
  for ( let element of children ) {
    let { objectClassName, obj, opts, name, index, children, path } = element
    let child = renderElement( element )
    rows.push(
        <Row key={opts.id} className='reactdump-label reactdump-Object' label={name} title={name} expand={opts.expand} >
          {child}
        </Row>)
  }

  return (
    <Table className='reactdump reactdump-Object' label={opts.label} expand={opts.expand}>
      {rows}
    </Table>
  )

}
export default Obj

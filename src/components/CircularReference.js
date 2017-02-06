import React from 'react'
import Table from './Table'
import Row from './Row'

const defaultProps = {
    expand: true
  , circPath: []
}

export default class CircularReference extends React.Component {
  render() {
    const p = this.props.circPath.join( '>>' )
    return (
      <Table className='reactdump reactdump-Circular-Reference' expand={this.props.expand}>
        <Row className='reactdump-label reactdump-Circular-Reference' label='Circular-Reference' expand={this.props.expand} cols='2'>
          {p}
        </Row>
      </Table>
    )
  }
}
CircularReference.defaultProps = defaultProps

import React from 'react'
import Table from './Table'
import Row from './Row'

const defaultProps = {
    obj: null
  , opts: {
        label: 'Number'
      , expand: true
    }
}

export default class Number extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Number' >
        <Row className='reactdump-label reactdump-Number' label={this.props.opts.label} expand={this.props.opts.expand} expandCells={this.props.opts.expand}>
          {this.props.obj.toString()}
        </Row>
      </Table>
    )
  }

}

Number.defaultProps = defaultProps

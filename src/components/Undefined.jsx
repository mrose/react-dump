import React from 'react'
import Table from './Table'
import Row from './Row'

const defaultProps = {
    obj: null
  , opts: {
        label: 'Undefined'
      , expand: true
    }
}

export default class Undefined extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Undefined'>
        <Row className='reactdump-label reactdump-Undefined' label={this.props.opts.label} expand={this.props.opts.expand} cols='1'>
          {this.props.obj}
        </Row>
      </Table>
    )
  }

}

Undefined.defaultProps = defaultProps

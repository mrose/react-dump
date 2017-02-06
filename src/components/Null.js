import React from 'react'
import Table from './Table'
import Row from './Row'

const defaultProps = {
    obj: null
  , opts: {
        label: 'Null'
      , expand: true
    }
}

export default class Null extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Null' expand={this.props.opts.expand}>
        <Row className='reactdump-label reactdump-Null' label={this.props.opts.label} expand={this.props.opts.expand} cols='1'>
          {this.props.obj}
        </Row>
      </Table>
    )
  }

}

Null.defaultProps = defaultProps

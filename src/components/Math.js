import React from 'react'
import Table from './Table'
import Row from './Row'

const defaultProps = {
    obj: null
  , opts: {
        label: 'Math'
      , expand: true
    }
}

export default class Math extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Math' expand={this.props.opts.expand}>
        <Row className='reactdump-label reactdump-Math' label={this.props.opts.label} expand={this.props.opts.expand} cols='1'>
          {this.props.obj}
        </Row>
      </Table>
    )
  }

}

Math.defaultProps = defaultProps

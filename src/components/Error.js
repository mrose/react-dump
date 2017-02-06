import React from 'react'
import Table from './Table'
import Row from './Row'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , opts: {
        label: 'Error'
      , expand: true
    }
}

export default class Error extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Error' label={this.props.opts.label} cols='1' expand={this.props.opts.expand}>
        <Row className='reactdump-label reactdump-Error' label={this.props.opts.label} expand={this.props.opts.expand} expandCells={this.props.opts.expand}>
          {this.props.obj.toString()}
        </Row>
      </Table>
    )
  }

}

Error.defaultProps = defaultProps

import React from 'react'
import Table from './Table'
import Row from './Row'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , opts: {
        label: 'Date'
      , expand: true
    }
}

export default class Date extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Date' expand={this.props.opts.expand}>
        <Row className='reactdump-label reactdump-Date' label={this.props.opts.label} expand={this.props.opts.expand} expandCells={this.props.opts.expand}>
        {this.props.obj.toString()}
        </Row>
      </Table>
    )
  }

}

Date.defaultProps = defaultProps

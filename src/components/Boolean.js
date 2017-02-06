import React from 'react'
import Table from './Table'
import Row from './Row'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , opts: {
        label: 'Boolean'
      , expand: true
    }
}

export default class Boolean extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Boolean' expand={this.props.opts.expand}>
        <Row className='reactdump-label reactdump-Boolean' label={this.props.opts.label} expand={this.props.opts.expand} expandCell={this.props.opts.expand}>
          <span className={this.props.obj ? 'reactdump-yes' : 'reactdump-no'}>{this.props.obj.toString()}</span>
        </Row>
      </Table>
    )
  }

}

Boolean.defaultProps = defaultProps

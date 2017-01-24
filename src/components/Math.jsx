import React from 'react'
import Table from './Table'
import Row from './Row'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , label: ''
  , expand: true
}

export default class Math extends React.Component {
  render() {
    return (
      <Table dataType='Math'>
        <Row dataType='Math' label={this.props.label} expand={this.props.expand} cols='1'>
          {this.props.obj}
        </Row>
      </Table>
    )
  }

}

Math.defaultProps = defaultProps

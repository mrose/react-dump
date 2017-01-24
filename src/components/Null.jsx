import React from 'react'
import Table from './Table'
import Row from './Row'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , label: ''
  , expand: true
}

export default class Null extends React.Component {
  render() {
    return (
      <Table dataType='Null'>
        <Row dataType='Null' label={this.props.label} expand={this.props.expand} cols='1'>
          {this.props.obj}
        </Row>
      </Table>
    )
  }

}

Null.defaultProps = defaultProps

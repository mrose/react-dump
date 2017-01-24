import React from 'react'
import Table from './Table'
import Row from './Row'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , label: ''
  , expand: true
  , expandCells: true
}

export default class Date extends React.Component {
  render() {
    return (
      <Table dataType='Date' >
        <Row dataType='Date' label={this.props.label} expand={this.props.expand} expandCells={this.props.expandCells}>
        {this.props.obj.toString()}
        </Row>
      </Table>
    )
  }

}

Date.defaultProps = defaultProps

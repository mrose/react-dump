import React from 'react'
import Table from './Table'
import Row from './Row'
import RowHeader from './RowHeader'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , label: ''
  , expand: true
}

export default class Error extends React.Component {
  render() {
    return (
      <Table dataType='Error' >
        <RowHeader dataType='Error' label={this.props.label} expand={this.props.expand} cols='1' />
        <Row dataType='Error' label={this.props.label} expand={this.props.expand} expandCells={this.props.expandCells}>
          {this.props.obj.toString()}
        </Row>
      </Table>
    )
  }

}

Error.defaultProps = defaultProps

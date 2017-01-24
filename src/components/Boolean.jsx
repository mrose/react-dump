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

export default class Boolean extends React.Component {
  render() {
    const classNm = this.props.obj ? 'reactdump-yes' : 'reactdump-no'
    return (
      <Table dataType='Boolean' >
        <Row dataType='Boolean' label={this.props.label} expand={this.props.expand} expandCell={this.props.expandCells}>
          <span className={classNm}>{this.props.obj.toString()}</span>
        </Row>
      </Table>
    )
  }

}

Boolean.defaultProps = defaultProps

import React from 'react'
import Table from './Table'
import Row from './Row'

const defaultProps = {
    expand: true
  , circPath: []
}

const CIRCULARREFERENCE = 'Circular-Reference'

export default class CircularReference extends React.Component {
  render() {
    return (
      <Table dataType={CIRCULARREFERENCE}>
        <Row dataType={CIRCULARREFERENCE} label={CIRCULARREFERENCE} expand={this.props.expand} cols='1'>
          {this.props.circPath.join(' &raquo; ')}
        </Row>
      </Table>
    )
  }
}
CircularReference.defaultProps = defaultProps

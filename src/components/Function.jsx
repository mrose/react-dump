import React from 'react'
import Table from './Table'
import Row from './Row'
import RowHeader from './RowHeader'
import escapeHtml from './escapeHtml'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , label: ''
  , expand: true
}

export default class Function extends React.Component {
  render() {
    return (
      <Table dataType='Function' >
        <RowHeader dataType='Function' label={this.props.label} expand={this.props.expand} cols='1' />
        <Row dataType='Function' label={this.props.label} expand={this.props.expand} cols="1">
          <pre>
          <code className="lang-javascript">
            {escapeHtml(this.props.obj.toString().replace(/\t/g, ''))}
          </code>
          </pre>
        </Row>
      </Table>
    )
  }

}

Function.defaultProps = defaultProps

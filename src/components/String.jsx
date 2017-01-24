import React from 'react'
import Table from './Table'
import Row from './Row'
import escapeHtml from './escapeHtml'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , label: ''
  , expand: true
  , expandCells: true
}

export default class String extends React.Component {
  //var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
  render() {
    if (this.props.obj.length !== 0) {
      return (
        <Table dataType='String' >
          <Row dataType='String' label={this.props.label} expand={this.props.expand} expandCell={this.props.expandCells}>
            {escapeHtml(this.props.obj)}
          </Row>
        </Table>
      )
    }
    return (
      <Table dataType='String' >
        <Row dataType='String' >
          [empty]
        </Row>
      </Table>
    )
  }

}

String.defaultProps = defaultProps

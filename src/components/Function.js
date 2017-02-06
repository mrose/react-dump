import React from 'react'
import Table from './Table'
import Row from './Row'
import escapeHtml from './escapeHtml'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    obj: null
  , opts: {
        label: 'Function'
      , expand: true
    }
}

export default class Function extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-Function' label='Function' cols='1' expand={this.props.opts.expand}>
        <Row className='reactdump-label reactdump-Function' label={this.props.opts.label} expand={this.props.opts.expand} cols="1">
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

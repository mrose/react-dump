import React from 'react'
import Table from './Table'
import Row from './Row'
import escapeHtml from './escapeHtml'

const defaultProps = {
    obj: null
  , opts: {
        label: 'String'
      , expand: true
    }
}

export default class String extends React.Component {
  //var val = '<pre><code class="lang-html">' + hljs.highlight('xml', obj).value + '</code></pre>';
  render() {
    if (this.props.obj.length !== 0) {
      return (
        <Table className='reactdump reactdump-String' >
          <Row className='reactdump-label reactdump-String' label={this.props.opts.label} expand={this.props.opts.expand} expandCell={this.props.opts.expand}>
            {escapeHtml(this.props.obj)}
          </Row>
        </Table>
      )
    }
    return (
      <Table className='reactdump reactdump-String' >
        <Row className='reactdump-label reactdump-String' >
          [empty]
        </Row>
      </Table>
    )
  }

}

String.defaultProps = defaultProps

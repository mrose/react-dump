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

  getRowProps = () => {
    let props = {
      className:'reactdump-label reactdump-String'
    }
    if (this.props.obj.length !== 0) {
      props.label = this.props.opts.label
      props.expand = this.props.opts.expand
    }
    return props
  }

  getTxt = (obj) => {
    let txt = '[empty]'
    if (obj.length !== 0) {
      txt = escapeHtml(obj)
    }
    return txt
  }


  render() {
    return (
      <Table className='reactdump reactdump-String' >
        <Row {...this.getRowProps()} >
          {this.getTxt(this.props.obj)}
        </Row>
      </Table>
    )
  }

}

String.defaultProps = defaultProps

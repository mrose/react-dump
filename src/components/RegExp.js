import React from 'react'
import Table from './Table'
import Row from './Row'

const defaultProps = {
    obj: null
  , opts: {
        label: 'RegExp'
      , expand: true
    }
}

export default class RegExp extends React.Component {
  render() {
    return (
      <Table className='reactdump reactdump-RegExp' label={this.props.opts.label} cols='1'>
        <Row className='reactdump-label reactdump-RegExp' label={this.props.opts.label} expand={this.props.opts.expand} expandCells={this.props.opts.expand}>
        {this.props.obj.toString()}
        </Row>
      </Table>
    )
  }

}

RegExp.defaultProps = defaultProps

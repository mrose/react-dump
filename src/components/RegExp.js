import React from 'react'
import Table from './Table'
import Row from './Row'
import RowHeader from './RowHeader'

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
      <Table className='reactdump reactdump-RegExp' >
        <RowHeader dataType='RegExp' label={this.props.opts.label} expand={this.props.opts.expand} cols='1' />
        <Row className='reactdump-label reactdump-RegExp' label={this.props.opts.label} expand={this.props.opts.expand} expandCells={this.props.opts.expand}>
        {this.props.obj.toString()}
        </Row>
      </Table>
    )
  }

}

RegExp.defaultProps = defaultProps

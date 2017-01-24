import React from 'react'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    dataType: ''
  , label: ''
  , expand: true
  , toggleRowHeader: null
  , title: ''
  , cols: 2
}

export default class RowHeader extends React.Component {

  render() {
    const classNm = 'reactdump-label reactdump-'+this.props.dataType
    switch (this.props.cols) {
      case 0:
        return (
          <tr><th className={classNm}>[EMPTY]</th></tr>
        )

      default:
        if (this.props.expand) {
          return (
            <tr>
              <th colSpan={this.props.cols} className={classNm} onClick={this.props.toggleRowHeader}>
                {this.props.label}
              </th>
            </tr>
          )
        }
        return (
          <tr style={{display:'none'}}>
            <th colSpan={this.props.cols} className={classNm} style={{display:'none'}} onClick={this.props.toggleRowHeader}>
              {this.props.label}
            </th>
          </tr>
        )
    } // /switch
  }
}

RowHeader.defaultProps = defaultProps

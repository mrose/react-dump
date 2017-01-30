import React from 'react'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    className: ''
  , label: 'row need label pls'
  , expand: true
  , expandCell: true
  , toggleRow: null
  , title: ''
  , cols: '2'
}

export default class Row extends React.Component {

  render() {
    switch (this.props.cols) {
      case '1':
        if (this.props.expand) {
          return (
            <tr>
              <td className="reactdump-data">
                {this.props.children}
              </td>
            </tr>
          )
        }
        return (
          <tr style={{display:'none'}}>
            <td className="reactdump-data" style={{display:'none'}}>
              {this.props.children}
            </td>
          </tr>
        )

      default:
        if (this.props.expand) {
          return (
            <tr>
              <td className={this.props.className} title={this.props.title} onClick={this.props.toggleRow}>{this.props.label}</td>
              <td className="reactdump-data">
                {this.props.children}
              </td>
            </tr>
          )
        }
        return (
          <tr style={{display:'none'}}>
            <td className={this.props.className} style={{fontStyle: 'italic'}} title={this.props.title} onClick={this.props.toggleRow}>{this.props.label}</td>
            <td className="reactdump-data" style={{display:'none'}}>
              {this.props.children}
            </td>
          </tr>
        )

    } // /switch

  }

}
Row.defaultProps = defaultProps

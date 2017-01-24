import React from 'react'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    dataType: ''
  , label: 'row need label pls'
  , expand: true
  , expandCell: true
  , toggleRow: null
  , title: ''
  , cols: '2'
}

export default class Row extends React.Component {

//     * @param {string} data


  render() {
    const classNm = 'reactdump-label reactdump-'+this.props.dataType
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
              <td className={classNm} title={this.props.title} onClick={this.props.toggleRow}>{this.props.label}</td>
              <td className="reactdump-data">
                {this.props.children}
              </td>
            </tr>
          )
        }
        return (
          <tr style={{display:'none'}}>
            <td className={classNm} style={{fontStyle: 'italic'}} title={this.props.title} onClick={this.props.toggleRow}>{this.props.label}</td>
            <td className="reactdump-data" style={{display:'none'}}>
              {this.props.children}
            </td>
          </tr>
        )

    } // /switch

  }

}
Row.defaultProps = defaultProps

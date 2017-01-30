import React from 'react'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    className: ''
  , label: ''
  , expand: true
  , title: ''
  , cols: 2
}

export default class RowHeader extends React.Component {

  render() {
    switch (this.props.cols) {
      case 0:
        return (
          <tr><th className={this.props.className} onClick={this.handleClick}>[EMPTY]</th></tr>
        )

      default:
        if (this.props.expand) {
          return (
            <tr>
              <th colSpan={this.props.cols} className={this.props.className} onClick={this.handleClick}>
                {this.props.label}
              </th>
            </tr>
          )
        }
        return (
          <tr style={this.state.expand ? {} :{display:'none'}}>
            <th colSpan={this.props.cols} className={this.props.className} style={{display:'none'}} onClick={this.handleClick}>
              {this.props.label}
            </th>
          </tr>
        )
    } // /switch
  }
}

RowHeader.defaultProps = defaultProps

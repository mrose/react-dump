import React from 'react'


// assigned to component after component definition, no hoisting within
const defaultProps = {
    className: null
  , label: ''
  , cols: '2'
}

export default class Table extends React.Component {

  handleClick = () => {

    alert( 'clicked')
//    this.setState( previousState => ({
//      expand: !previousState.expand
//    }))

//    this.toggleTarget(target, this.toggleSource(src))
  }

  header = () => {
    if (!this.props.label.length) {
      return
    }

    return (
      <thead>
        <tr>
          <th className={this.props.className} colSpan={this.props.cols} onClick={this.handleClick}>
            {this.props.label}
          </th>
        </tr>
      </thead>
    )
  }

  render() {
    return (
      <table className={this.props.className}>
        {this.header()}
        <tbody>{this.props.children}</tbody>
      </table>
    )
  }

}

Table.defaultProps = defaultProps

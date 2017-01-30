import React from 'react'


// assigned to component after component definition, no hoisting within
const defaultProps = {
    className: null
}

export default class Table extends React.Component {

  render() {
    return (
      <table className={this.props.className}>
        <tbody>{this.props.children}</tbody>
      </table>
    )
  }

}

Table.defaultProps = defaultProps

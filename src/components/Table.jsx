import React from 'react'


// assigned to component after component definition, no hoisting within
const defaultProps = {
    dataType: null
}

export default class Table extends React.Component {

  render() {
    const c = 'reactdump reactdump-'+this.props.dataType
    return (
      <table className={c}>
        <tbody>{this.props.children}</tbody>
      </table>
    )
  }

}

Table.defaultProps = defaultProps

import React from 'react'

const defaultProps = {
    className: 'reactDump'
  , label: ''
  , cols: '2'
  , expand: true
}

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state =  { expand: props.expand }
  }


  handleClick = () => {
    this.setState( previousState => ({
      expand: !previousState.expand
    }))
  }

  getTbodyProps = () => {
    if (!this.state.expand) {
      let props = { }
      props.style = {display:'none'}
      return props
    }
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
        <tbody {...this.getTbodyProps()}>{this.props.children}</tbody>
      </table>
    )
  }

}

Table.defaultProps = defaultProps

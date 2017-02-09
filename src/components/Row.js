import React from 'react'
import uuid from 'uuid'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    className: ''
  , label: ''
  , expand: true
  , title: ''
  , cols: '2'
}

export default class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        expand: props.expand
      , children: props.children
    }
  }

  componentWillMount() {
    this.uuid = uuid.v4()
  }

  shouldCopy = (element, index, array) => {
    return element === 'top-one'
  }

  handleClick = () => {
    this.setState( previousState => ({
      expand: !previousState.expand
    }))
  }

  getRowProps = () => {
    let props = {
      key:this.uuid
    }
    return props
  }

  getLabelCellProps = () => {
    let props = {
        className: this.props.className
      , key: uuid.v4()
      , title: this.props.title
      , onClick: this.handleClick
    }
    if (!this.state.expand) {
      props.style = {fontStyle:'italic'}
    }
    return props
  }

  getDataCellProps = () => {
    let props = {
        className:'reactdump-data'
      , key: uuid.v4()
    }
    if (!this.state.expand) {
      props.style = {display:'none'}
    }
    return props
  }

  getCells = () => {
    let arrCols = [ ]
    if (this.props.cols === '2') {
      arrCols.push(<td {...this.getLabelCellProps()}>{this.props.label}</td>)
    }
    arrCols.push(<td {...this.getDataCellProps()}>{this.state.children}</td>)
    return arrCols
  }

  render() {
    return (
      <tr {...this.getRowProps()}>
        {this.getCells()}
      </tr>
    )
  }

}
Row.defaultProps = defaultProps

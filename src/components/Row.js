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
  constructor( props ) {
    super( props )
    this.state = {
        expand: props.expand
    }
  }

  componentWillMount() {
    this.uuid = uuid.v4()
  }

  handleClick = () => {
    this.setState( previousState => ({
      expand: !previousState.expand
    }))
  }

  getRowProps = (props) => {
    let rowProps = { key:this.uuid }
    if ( props.id ) {
      rowProps.id = props.id
    }
    return rowProps
  }

  getLabelCellProps = () => {
    let props = { className: this.props.className
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
    arrCols.push(<td {...this.getDataCellProps()}>{this.props.children}</td>)
    return arrCols
  }

  render() {
    const rowProps = this.getRowProps(this.props)
    return (
      <tr {...rowProps}>
        {this.getCells()}
      </tr>
    )
  }

}
Row.defaultProps = defaultProps

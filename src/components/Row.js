import React from 'react'
import uuid from 'uuid'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    className: ''
  , label: 'row need default label pls'
  , expand: true
  , title: ''
  , cols: '2'
}

export default class Row extends React.Component {
  constructor(props) {
    super(props);
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
console.log( this.state.children.props || 'no props')
    // sometimes children is a text node, so
    if ( this.state.children.props  && this.state.children.props.cache ) {
      const cp = this.state.children.props.currentPath
      let nc = this.state.children.props.cache // dataTyper cache, full bcuz it's by reference
      let paths = this.state.children.props.cache.paths
      const depth = cp.length
      for (let i in paths) {
console.log( paths[i] )

      }
//      const ncp = this.state.children.props.cache.paths.forEach( this.shouldCopy )
//      console.log( ncp )
/*
      const ncp = this.state.children.props.cache.paths.map( (val, i, src ) => {
        if ( val.length < cp.length ) {

          console.log( depth )
          console.log( val )
        }

      } )
      console.log( ncp )
*/
      //console.log( this.state.children.props.currentPath)
      //console.log( this.state.children.props.cache)

    }

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

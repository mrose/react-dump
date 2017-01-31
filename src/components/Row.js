import React from 'react'
import uuid from 'uuid'

// assigned to component after component definition, no hoisting within
const defaultProps = {
    className: ''
  , label: 'row need default label pls'
  , expand: true
  , expandCell: true
  , title: ''
  , cols: '2'
}

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state =  { expand: props.expand }
  }

  componentWillMount() {
    this.uuid = uuid.v4()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expand !== this.props.expand) {
      if (this.props.expand) {
//        this.maybeExpand();
//      } else {
//        this.handleCollapse();
      }
    }
  }

  handleClick = () => {
//console.log( 'expand is: ' + this.state.expand )
//console.log( 'cols: ' + this.props.cols )

    this.setState( previousState => ({
      expand: !previousState.expand
    }))

//    this.toggleTarget(target, this.toggleSource(src))
  }

// {...this.getRowProps()}
  getRowProps = () => {
    let props = {
      key:this.uuid
    }
    return props
  }

  getLabelColProps = () => {
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

  getDataColProps = () => {
    let props = {
        className:'reactdump-data'
      , key: uuid.v4()
    }
    if (!this.state.expand) {
      props.style = {display:'none'}
    }
    return props
  }

  getCols = () => {
    let arrCols = [ ]
    if (this.props.cols === '2') {
      arrCols.push(<td {...this.getLabelColProps()}>{this.props.label}</td>)
    }
    arrCols.push(<td {...this.getDataColProps()}>{this.props.children}</td>)
    return arrCols
  }

  render() {
    return (
      <tr {...this.getRowProps()}>
        {this.getCols()}
      </tr>
    )
  }

/*
  render() {
    console.log( 'expand is: ' + this.state.expand )
    const expd = this.state.expand ? '' : `style={display:'none'}`
    switch (this.props.cols) {
      case '1':
        if (this.state.expand) {
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

        if (this.state.expand) {
          return (
            <tr>
              <td className={this.props.className} title={this.props.title} onClick={this.handleClick}>{this.props.label}</td>
              <td className="reactdump-data">
                {this.props.children}
              </td>
            </tr>
          )
        }

        return (
        // collapsed
          <tr style={{display:'none'}}>
            <td className={this.props.className} style={{fontStyle: 'italic'}} title={this.props.title} onClick={this.handleClick}>{this.props.label}</td>
            <td className="reactdump-data" style={{display:'none'}}>
              {this.props.children}
            </td>
          </tr>
        )

    } // /switch

  }
*/
}
Row.defaultProps = defaultProps

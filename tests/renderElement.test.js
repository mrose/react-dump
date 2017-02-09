import renderElement from '../src/components/renderElement'
import React from 'react'

describe('renders element props to jsx', () => {

  it('returns a default tag when no object is provided', () => {
    const objectClassName = 'Error'
    const obj = new Error('No object provided')
    const opts =  { expand:true
                  , format:'html'
                  , id:'reactdump999999'
                  , label:''
                  }
    const e = <Error objectClassName={objectClassName} obj={obj} opts={opts} />
    expect(renderElement()).toEqual(e)
  })


})

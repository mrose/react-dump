import sortingHat from '../src/components/sortingHat'
import React from 'react'

describe('sorts props into jsx', () => {

  it('returns a default tag when no object is provided', () => {
    const objectClassName = 'Error'
    const obj = new Error('No object provided')
    const opts =  { expand:true
                  , format:'html'
                  , id:'reactdump999999'
                  , label:''
                  }
    const e = <Error objectClassName={objectClassName} obj={obj} opts={opts} />
    expect(sortingHat()).toEqual(e)
  })


})

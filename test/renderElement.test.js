import React from 'react';
import {renderElement} from '../src/format';
import {Unknown} from '../src/dataTypes/Unknown';


describe('renders element props to jsx', () => {

  const er = () => {
    return <Unknown documentFragment='' expand={false} id='reactdump1' label='Unknown' path={[]} />
  };

  it('returns a default tag when no object is provided', () => {
    const expected = er();
    const received = renderElement();
    expect(received).toBe(expected);
  })


})

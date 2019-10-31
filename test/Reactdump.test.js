import React from 'react'
import ReactDOM from 'react-dom'
import { Dump } from '../dist/react-dump'
import {original} from './data/original'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const user = original()
  ReactDOM.render(<Dump obj={user} />, div)

})

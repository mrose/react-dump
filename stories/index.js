import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Dump from '../src/components/ReactDump';

import geojson from './geojson';

storiesOf('Dump', module)
  .add('with text', () => (
    <Dump obj="aaaaaa" />
  ))
  .add('with some emoji', () => (
    <Dump obj="😀 😎 👍 💯" />
  ))
  .add('with a complicated structure', () => (
    <Dump obj={geojson} />
  ))
;

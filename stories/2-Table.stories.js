import React from 'react';
import { Dump } from '../src/index';
import geojson from './data/geojson';
import {allTypes} from './data/allTypes';


// CSF format:
export default {
    title: "Dump using tables",
    component: Dump,
    decorators: [],
    parameters: {},
};

export const withText = () => <Dump obj="aaaaaaa" format="htmlTable"/>;
withText.story = { name: 'with text' };

export const withEmptyString = () => <Dump obj="" format="htmlTable"/>;
withEmptyString.story = { name: 'with empty text' };

export const withEmoji = () => <Dump obj="😀 😎 👍 💯" format="htmlTable"/>;
withEmoji.story = { name: "with emoji" };

export const withGeoJson = () => <Dump obj={geojson} format="htmlTable"/>;
withGeoJson.story = { name: 'with a complicated structure' };

export const withAllTypes = () => {
    const t = allTypes();
    return <Dump obj={t} format="htmlTable"/>;
};
withAllTypes.story = { name: 'with all types' };

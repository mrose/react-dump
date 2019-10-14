import React from 'react';
import { Dump } from '../src/index';
import geojson from './data/geojson';


// CSF format:
export default {
    title: "Dump",
    component: Dump,
    decorators: [],
    parameters: {},
};

export const withText = () => <Dump obj="aaaaaaa" />;
withText.story = {
    name: 'with text',
};

export const withEmptyString = () => <Dump obj="" />;
withEmptyString.story = {
    name: 'with empty text',
};

export const withEmoji = () => <Dump obj="😀 😎 👍 💯" />;
withEmoji.story = {
    name: "with emoji",
};

export const withGeoJson = () => <Dump obj={geojson} />;
withGeoJson.story = {
    name: 'with a complicated structure',
};

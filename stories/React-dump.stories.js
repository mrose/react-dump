import React from 'react';
import { Dump } from '../src/index';
import geojson from './data/geojson';
import {allTypes} from './data/allTypes';


// CSF format:
export default {
    title: "Dump",
    component: Dump,
    decorators: [],
    parameters: {},
};

export const withText = () => <Dump obj="aaaaaaa"/>;
withText.story = { name: 'with text' };

export const withEmptyString = () => <Dump obj="" />;
withEmptyString.story = { name: 'with empty text' };

export const withEmoji = () => <Dump obj="😀 😎 👍 💯" />;
withEmoji.story = { name: "with emoji" };

export const withGeoJson = () => <Dump obj={geojson} />;
withGeoJson.story = { name: 'with a complicated structure' };

export const withAllTypes = () => {
    const t = allTypes();
    return <Dump obj={t} />;
};
withAllTypes.story = { name: 'with all types' };

export const withBooleanFalseFlex = () => <Dump obj={false} format="htmlFlex" />;
withBooleanFalseFlex.story = { name: 'with boolean false - flex div' };

export const withBooleanTrueFlex = () => <Dump obj={true} format="htmlFlex" />;
withBooleanTrueFlex.story = { name: 'with boolean true - flex div' };

export const withTextFlex = () => <Dump obj="aaaaaaa" format="htmlFlex" />;
withTextFlex.story = { name: 'with text - flex div' };


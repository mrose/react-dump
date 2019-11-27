import React from 'react';
import { Dump } from '../src/index';
import geojson from './data/geojson';
import {allTypes} from './data/allTypes';

const dt = new Date();
const er = new Error("hello, I'm an error");
const fn = () => "Hello world";
const re = new RegExp("ab+c");

// CSF format:
export default {
    title: "Dump using flex div",
    component: Dump,
    decorators: [],
    parameters: {},
};

export const withArray = () => {
  const obj = ['hello','young','lovers'];
  return <Dump obj={obj} format="htmlFlex" />;
};
withArray.story = { name: 'with Array' };

export const withBooleanFalse = () => <Dump obj={false} format="htmlFlex" />;
withBooleanFalse.story = { name: 'with Boolean false' };

export const withBooleanTrue = () => <Dump obj={true} format="htmlFlex" />;
withBooleanTrue.story = { name: 'with Boolean true' };

export const withCircularRef = () => {
  const t = allTypes();
  return <Dump obj={t['circular-ref']} format="htmlFlex" />;
};
withCircularRef.story = { name: 'with Circular Reference' };

export const withDate = () => <Dump obj={dt} format="htmlFlex" />;
withDate.story = { name: 'with Date' };

export const withError = () => <Dump obj={er} format="htmlFlex" />;
withError.story = { name: 'with Error' };

export const withFunction = () => <Dump obj={fn} format="htmlFlex" />;
withFunction.story = { name: 'with Function' };

export const withMath = () => <Dump obj={Math.PI} format="htmlFlex" />;
withMath.story = { name: 'with Math' };

export const withNull = () => <Dump obj={null} format="htmlFlex" />;
withNull.story = { name: 'with Null' };

export const withNumber = () => <Dump obj={42} format="htmlFlex" />;
withNumber.story = { name: 'with Number' };

export const withObject = () => {
  const obj = {'first':'hello', 'second':'world'};
  return <Dump obj={obj} format="htmlFlex" />;
};
withObject.story = { name: 'with Object' };

export const withRegex = () => <Dump obj={re} format="htmlFlex" />;
withRegex.story = { name: 'with Regular Expression' };

export const withString = () => <Dump obj="aaaaaaa" format="htmlFlex" />;
withString.story = { name: 'with String' };

export const withUndefined = () => <Dump obj={undefined} format="htmlFlex" />;
withUndefined.story = { name: 'with Undefined' };

export const withUnknown = () => <Dump obj={Atomics} format="htmlFlex" />;
withUnknown.story = { name: 'with Unknown' };

export const withEmptyString = () => <Dump obj="" format="htmlFlex"/>;
withEmptyString.story = { name: 'with empty text' };

export const withEmoji = () => <Dump obj="😀 😎 👍 💯" format="htmlFlex"/>;
withEmoji.story = { name: "with emoji" };

export const withGeoJson = () => <Dump obj={geojson} format="htmlFlex"/>;
withGeoJson.story = { name: 'with a complicated structure' };

export const withAllTypes = () => {
    const t = allTypes();
    return (
      <div>
        <Dump obj={t} format="htmlFlex"/>
      </div>
    );
};
withAllTypes.story = { name: 'with all types' };

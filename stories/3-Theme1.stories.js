import React from 'react';


const theme = [
  ['$color_0',  '#dddddd'],
  ['$color_1',  '#222222'],
  ['$color_2',  '#ffffff'],
  ['$color_3',  '#aaaaaa'],
  ['$color_5',  '#cccccc'],
  ['$color_6',  '#707000'],
  ['$color_7',  '#adad00'],
  ['$color_8',  '#ffff9e'],
  ['$color_10', '#006600'],
  ['$color_11', '#009900'],
  ['$color_12', '#ccffcc'],
  ['$color_13', '#eebb00'],
  ['$color_14', '#ffda75'],
  ['$color_15', '#aa0000'],
  ['$color_16', '#008800'],
  ['$color_17', '#333333'],
  ['$color_18', '#9252c7'],
  ['$color_19', '#c78ef5'],
  ['$color_20', '#cc3300'],
  ['$color_21', '#aa4400'],
  ['$color_22', '#cc6600'],
  ['$color_23', '#ff8833'],
  ['$color_24', '#ffb885'],
  ['$color_25', '#0000cc'],
  ['$color_26', '#4444cc'],
  ['$color_27', '#ccddff'],
  ['$color_28', '#884488'],
  ['$color_29', '#aa66aa'],
  ['$color_30', '#ffddff'],
  ['$color_31', '#888888'],
];

const Theme = ({entries}) => {
  return (
    <table>
      <tbody>
      {
        entries.map((i) => <tr key={i[0]}><td style={{backgroundColor:i[1], width:100, textAlign:"center"}}/><td>{`${i[0]} : ${i[1]}`}</td></tr>)
      }
      </tbody>
    </table>
  );
};

// CSF format,
export default {
    title: 'Theme1',
    component: Theme,
    decorators: [],
    parameters: {},
};

export const withTheme1 = () => {
  return <Theme entries={theme} />;
};
withTheme1.story = { name: 'Theme 1' };

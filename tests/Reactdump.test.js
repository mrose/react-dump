import React from 'react';
import ReactDOM from 'react-dom';
import Reactdump from '../src/Reactdump';

it('renders without crashing', () => {
  const div = document.createElement('div')
  const validate = () => false
  const updateSession = () => { }
  const signIn = (username, password) => {
    // validate username and password
    if (!validate(username, password)) return false;
    updateSession();
    this.signedIn = true;
    return true;
  }

  const user = {
    firstName: 'Charles'
    ,lastName: 'Teague'
    ,age: 21
    ,signIn: signIn
    ,signedIn: false
    ,projects: [
      {
        name: 'Allaire Spectra'
        , status: 'Horrible death'
      }
      ,{
        name: 'ColdFusion 4.5'
        ,status: 'Been there done that'
      }
    ]
};


  ReactDOM.render(<Reactdump obj={user} />, div);
});

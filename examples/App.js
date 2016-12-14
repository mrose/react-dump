import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dump from 'react-dump';

class App extends Component {
  render() {
    // build object to be dumped
    let validate = () => false
    let updateSession = () => { }
    let signIn = (username, password) => {
      // validate username and password
      if (!validate(username, password)) return false;
      updateSession();
      this.signedIn = true;
      return true;
    };
    let user = {
        firstName: 'Charles'
        ,lastName: 'Teague'
        ,age: 21
        ,signedIn: false
        ,signIn: signIn
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
    //        <div dangerouslySetInnerHTML={{__html: dump(user) }} />
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Dump obj={user}/>
      </div>
    );
  }
}

export default App;

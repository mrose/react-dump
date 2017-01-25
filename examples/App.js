import React from 'react'
import ReactDump from 'react-dump'

class App extends React.Component {
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
    }
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
    }

    return (
      <div className="App">
        <Dump obj={user}/>
      </div>
    )
  }

}

export default App

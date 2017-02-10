import React from 'react'
import './App.css'
import ReactDump from './components/ReactDump'

class App extends React.Component {
  render() {
    // build object to be dumped
    let validate = () => false
    let updateSession = () => { }
    let signIn = (username, password) => {
      // validate username and password
      if (!validate(username, password)) return false
      updateSession()
      this.signedIn = true
      return true
    }
    let spectra = {
                      name: 'Allaire Spectra'
                      , status: 'Horrible death'
                  }

    let projects= [
                spectra
                ,{
                    name: 'ColdFusion 4.5'
                    ,status: 'Been there done that'
                }
            ]

    let user = {
        firstName: 'Charles'
        ,lastName: 'Teague'
        ,age: 21
        ,birthday: new Date('Nov. 22, 1958')
        ,signedIn: false
        ,signIn: signIn
        ,projects: projects
        ,someProjects: [
          {
            name: 'someOtherProject'
            , status: 'defunct'
          }
          ,{ projects: projects }
          , spectra
          ]
        , emptyArray: []
    }

// <Dump obj={user} label="top-one" />
    return (
      <div className="App">
        <ReactDump obj={user} label="top-one" expand="true" />
      </div>
    )
  }
}

export default App;

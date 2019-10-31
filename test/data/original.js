const original = () => {
  const validate = () => false
  const updateSession = () => { }
  const signIn = (username, password) => {
    // validate username and password
    if (!validate(username, password)) return false
    updateSession()
    this.signedIn = true
    return true
  }

  return {
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
  }

};
export { original };

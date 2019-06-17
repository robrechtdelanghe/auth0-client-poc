import React, {useEffect} from 'react'
import {Provider, useSelector} from 'react-redux'
import {Route, Router} from "react-router"

import Header from "./Header/Header"
import Callback from "./Callback/Callback"
import LoggedOut from "./LoggedOut/LoggedOut"
import Lines from "./Lines/Lines"
import Theme from "./Theme/Theme"

import {LOGIN_CALLBACK, checkSession, loadAuthStorage} from "./redux/auth/auth.actions"
import store from './redux/store'
import history from "./history"
import Home from "./Home/Home"
import styled from "styled-components"
import {loadSettingsStorage} from "./redux/settings/settings.actions"
import Toast from "./Toast/Toast"

const handleAuthentication = (props) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    store.dispatch({type: LOGIN_CALLBACK, payload: props.history})
  }
  props.history.replace('/loggedout')
}

const Container = styled.div`
  margin: 20px;
`

history.listen((location, action) => {
  store.dispatch(checkSession())
})

const App = () => (<Provider store={store}>
  <AppContent/>
</Provider>)

const AppContent = () => {
  useEffect(() => {
    store.dispatch(loadAuthStorage())
    store.dispatch(loadSettingsStorage())
    store.dispatch(checkSession())
  }, [])

  const started = useSelector(state => state.settings.storageLoaded && state.auth.storageLoaded && state.auth.sessionChecked)
  const startingUp = !started

  return (
    <Theme>
      <Router history={history}>
        <Route path="/" render={(props) => <Header {...props} />}/>
        <Container>
          {startingUp && <h1>Starting up</h1>}
          {started && (<>
            <Route path="/" exact render={(props) => <Home {...props} />}/>
            <Route path="/lines" render={(props) => <Lines {...props} />}/>
            <Route path="/loggedout" render={(props) => <LoggedOut {...props} />}/>
          </>)}
        </Container>
        <Route path="/callback" render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }}/>
      </Router>
      <Toast/>
    </Theme>
  )
}

export default App

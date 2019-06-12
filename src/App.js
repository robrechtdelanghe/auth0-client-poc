import React, { Component } from 'react';
import { Provider} from 'react-redux'
import {Route, Router} from "react-router"

import Header from "./Header/Header"
import Callback from "./Callback/Callback"
import LoggedOut from "./LoggedOut/LoggedOut"
import Lines from "./Lines/Lines"
import Theme from "./Theme/Theme"

import {LOGIN_CALLBACK, loadStorage, checkSession} from "./redux/auth/auth.actions"
import store from './redux/store';
import history from "./history"
import Home from "./Home/Home"
import styled from "styled-components"

const handleAuthentication = (props) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    store.dispatch({type:LOGIN_CALLBACK, payload: props.history})
  }
  props.history.replace('/loggedout');
}

store.dispatch(loadStorage())

const Container = styled.div`
  margin: 20px;
`

history.listen((location, action) => {
  store.dispatch(checkSession())
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Theme>
          <Router history={history}>
            <Route path="/" render={(props) => <Header {...props} />}/>
            <Container>
              <Route path="/home" render={(props) => <Home {...props} />}/>
              <Route path="/lines" render={(props) => <Lines {...props} />}/>
              <Route path="/loggedout" render={(props) => <LoggedOut {...props} />}/>
            </Container>
            <Route path="/callback" render={(props) => {
              handleAuthentication(props)
              return <Callback {...props} />
            }}/>
          </Router>
        </Theme>
      </Provider>
    );
  }
}

export default App

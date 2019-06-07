import React, { Component } from 'react';
import { Provider} from 'react-redux'
import {Route, Router} from "react-router"

import Header from "./Header/Header"
import Callback from "./Callback/Callback"
import LoggedOut from "./LoggedOut/LoggedOut"
import Lines from "./Lines/Lines"

import {LOGIN_CALLBACK, loadStorage} from "./redux/auth/auth.actions"
import store from './redux/store';
import history from "./history"

const handleAuthentication = (props) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    store.dispatch({type:LOGIN_CALLBACK, payload: props.history})
  }
  props.history.replace('/loggedout');
}

store.dispatch(loadStorage())

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" render={(props) => <Header {...props} />}/>
          <Route path="/lines" render={(props) => <Lines {...props} />}/>
          <Route path="/loggedout" render={(props) => <LoggedOut {...props} />}/>
          <Route path="/callback" render={(props) => {
            handleAuthentication(props)
            return <Callback {...props} />
          }}/>
        </Router>
      </Provider>
    );
  }
}

export default App

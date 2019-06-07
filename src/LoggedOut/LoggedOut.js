import React from 'react';
import {connect} from "react-redux"
import {loginStart, logoutStart} from "../redux/auth/auth.actions"

const LoggedOut = (props) => (
  <div>
    <h2>Logout complete!</h2>
    <p>Please <button onClick={props.login}>Login</button> again to use this site. or go to <button onClick={()=>{props.history.push('home')}}>Home</button></p>
  </div>
)

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(loginStart()),
})

export default connect(null, mapDispatchToProps)(LoggedOut)
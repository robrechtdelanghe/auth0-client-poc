import React from 'react';
import {connect} from "react-redux"
import styled from 'styled-components'
import {loginStart} from "../redux/auth/auth.actions"

const Button = styled.a`
  padding: 2px 5px;
  border: 1px solid ${props => props.theme.cFront};
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.theme.cFront};
    border: 1px solid ${props => props.theme.cFront};
    color: ${props => props.theme.cBack};
    cursor: pointer;
  }
`

const LoggedOut = (props) => (
  <>
    <h2>Logout complete!</h2>
    <p>Please <Button onClick={props.login}>Login</Button> again to use this site,
      {props.redirectUrl && (<>go back to your <Button onClick={()=>{props.history.push(props.redirectUrl)}}>previous page</Button>,</>)}
      or go to <Button onClick={()=>{props.history.push('home')}}>Home</Button></p>
  </>
)
const mapStateToProps = state => ({
  redirectUrl: state.auth.redirectUrl
})
const mapDispatchToProps = dispatch => ({
  login: () => dispatch(loginStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoggedOut)
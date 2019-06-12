import React from 'react';
import styled from "styled-components"
import {connect} from "react-redux"
import {changePassword, updateUser} from "../redux/auth/auth.actions"
import {isAuthenticated, user, expiresAt} from "../redux/auth/auth.selector"


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
const ButtonList = styled.ul`
  list-style: none;
  
  li { 
    height:30px;
  }
`
const Home = (props) => (
  <div>
    {!props.isAuthenticated && (<h2>Not logged in</h2>)}
    {props.isAuthenticated && (
      <>
        <h2>Welcome {props.user.name || props.user.nickname}</h2>
        <ul>
          <li>E-mail: {props.user.email}</li>
          <li>Exp time: {new Date(1*props.expiresAt).toISOString()}</li>
        </ul>
        <ButtonList>
          <li><Button onClick={props.updateUser}>Update user</Button></li>
          <li><Button onClick={props.changePassword}>Change Password</Button></li>
        </ButtonList>
      </>
    )}
  </div>
)

const mapStateToProps = state => ({
  user: user(state),
  expiresAt: expiresAt(state),
  isAuthenticated: isAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  changePassword: () => dispatch(changePassword()),
  updateUser: () => dispatch(updateUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

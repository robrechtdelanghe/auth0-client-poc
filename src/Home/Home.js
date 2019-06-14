import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux"
import {changePassword as createChangePassword, checkSession as createCheckSession, updateUser as createUpdateUser} from "../redux/auth/auth.actions"
import {isAuthenticated as isAuthenticatedSelector, user as userSelector, expiresAtSelector} from "../redux/auth/auth.selector"

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
const Home = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const expiresAt =  useSelector(expiresAtSelector)
  const isAuthenticated = useSelector(isAuthenticatedSelector)

  const changePassword = () => dispatch(createChangePassword())
  const updateUser = () => dispatch(createUpdateUser())
  const checkSession = () => dispatch(createCheckSession(true))

  return (
    <div>
      {!isAuthenticated && (<h2>Not logged in</h2>)}
      {isAuthenticated && (
        <>
          <h2>Welcome {user.name || user.nickname}</h2>
          <ul>
            <li>E-mail: {user.email}</li>
            <li>Exp time: {new Date(1*expiresAt).toISOString()}</li>
            <li>Expires in <Timer />s</li>
          </ul>
          <ButtonList>
            <li><Button onClick={updateUser}>Update user</Button></li>
            <li><Button onClick={changePassword}>Change Password</Button></li>
            <li><Button onClick={checkSession}>Check session</Button></li>
          </ButtonList>
        </>
      )}
    </div>
  )
}

const Timer = () => {
  const expiresAt = useSelector(expiresAtSelector) || Date.now()
  const [time, setTime] = useState(useSelector(expiresAtSelector) - Date.now())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(expiresAt - Date.now())
    }, 500)
    return () => {
      clearInterval(intervalId)
    }
  }, [expiresAt])

  return Math.round(time/1000)
}

export default Home

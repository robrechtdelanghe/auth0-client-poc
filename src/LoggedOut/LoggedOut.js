import React from 'react'
import {useDispatch, useSelector} from "react-redux"
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

const Paragraph = styled.p`
line-height: 2em;
`

const LoggedOut = (props) => {
  const dispatch = useDispatch()
  const redirectUrl = useSelector(state => state.auth.redirectUrl)
  const login = () => dispatch(loginStart())

  return (
    <>
      <h2>Logout complete!</h2>
      <Paragraph>Please <Button onClick={login}>Login</Button> again to use this site,
        {redirectUrl && (<>go back to your <Button onClick={() => {
          props.history.push(redirectUrl)
        }}>previous page</Button>,</>)} or go to <Button onClick={() => {
          props.history.push('/')
        }}>Home</Button></Paragraph>
    </>
  )
}

export default LoggedOut
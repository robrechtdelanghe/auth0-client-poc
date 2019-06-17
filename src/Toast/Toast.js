import React from 'react'
import styled from 'styled-components'
import {useSelector} from "react-redux"
import {toastmessage} from "../redux/toast/toast.selector"

const ToastContainer = styled.div`
  color: ${props => props.theme.cFront};
  background-color: ${props => props.theme.cBack};
  border: 1px solid ${props => props.theme.cFront};
  border-radius: 5px;
  padding: 5px;
  max-width: 500px;
  min-width: 340px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  margin: 0 auto;
  text-align: center;
`

const Toast = () => {
  const toastMessage = useSelector(toastmessage)

  if(toastMessage) {
    return <ToastContainer>{toastMessage}</ToastContainer>
  }
  return null
}

export default Toast
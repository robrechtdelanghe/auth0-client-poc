import React from 'react'
import {connect} from "react-redux"
import styled from "styled-components"
import {addLine, deleteLine} from "../redux/data/data.actions"
import {isAuthenticated, lines} from "../redux/auth/auth.selector"

const Form = styled.form`
`

const InputWrapper = styled.div`
  color: ${props => props.theme.cFront};
  border: 1px solid ${props => props.theme.cFront};
  border-radius: 5px;
  width: 210px;
`
const InputText = styled.input`
  outline: none;
  border: none;
  height:20px;
  margin: 2px 0;
  padding: 0 5px;
  width: 150px
`
const InputButton = styled.button`
  border: 0;
  outline:none;
  width: 50px;
  height: 30px;
  background-color: transparent;
  border-left: 1px solid ${props => props.theme.cFront};
  
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.cFront};
    color: ${props => props.theme.cBack}
  }
`

const LineList = styled.ul`
  list-style: none;
  margin: 20px 0;
  padding: 0;
`

const LineRow = styled.li`
  height: 30px;
  border: 1px solid ${props => props.theme.cFront};
  border-radius: 5px;
  width: 210px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-start;
`

const Line = styled.div`
  padding: 5px 10px;
  width: 50px;
`

const Sub = styled.button`
  flex-grow: 1;
  padding: 5px 10px;
  border: 0;
  outline:none;
  height: 30px;
  color: ${props => props.theme.cBack};
  background-color: ${props => props.theme.cFront};
  cursor: pointer;
`

const Delete = styled.button`
  padding: 5px 10px;
  border: 0;
  margin-right: 2px;
  outline:none;
  height: 30px;
  background-color: ${props => props.theme.cBack};
  cursor: pointer;
`

const Lines = (props) => (
  <>
    {props.isAuthenticated && (
      <>
      <h2>Add or remove lines</h2>
        <Form onSubmit={(e) => {
          e.preventDefault()
          props.addLine(e.target.elements['line'].value)
        }}>
          <InputWrapper><InputText name="line" type="text"/><InputButton type="submit">Add</InputButton></InputWrapper>
        </Form>
        <LineList>
          {props.lines.map((line => (
            <LineRow key={line.id}>
              <Line>{line.id}</Line>
              <Sub
                onClick={() => props.addLine(line.id, !line.subscribed)}>{line.subscribed ? 'unsubscribe' : 'subscribe'}</Sub>
              <Delete onClick={() => props.deleteLine(line.id)}>X</Delete>
            </LineRow>
          )))}
        </LineList>
      </>
    )}
    {!props.isAuthenticated && (<h2>Not logged in</h2>)}
  </>
)

const mapStateToProps = state => ({
  lines: lines(state),
  isAuthenticated: isAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  addLine: (linenumber, subscribed) => dispatch(addLine(linenumber, subscribed)),
  deleteLine: linenumber => dispatch(deleteLine(linenumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Lines)

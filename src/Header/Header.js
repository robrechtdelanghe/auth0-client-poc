import React, {Component} from 'react'
import {connect} from 'react-redux'

import {setLanguage} from "../redux/settings/settings.actions"
import {loginStart, logoutStart} from "../redux/auth/auth.actions"
import {isAuthenticated, nickname} from "../redux/auth/auth.selector"

import styled from 'styled-components'

const NavBar = styled.div`
  background-color: grey;
  padding: 10px;
  color: white;
  font-weight: bold;
`

class Header extends Component {
  goTo(route, e) {
    if (e) {
      e.preventDefault()
    }
    this.props.history.push(`/${route}`)
  }

  render() {
    const {language, isAuthenticated, nickname} = this.props

    return <NavBar>
      HEADER
    </NavBar>
  }
}

const mapStateToProps = (state) => ({
  language: state.settings.language,
  isAuthenticated: isAuthenticated(state),
  nickname: nickname(state),
})

const mapDispatchToProps = dispatch => ({
  setLang: (language) => dispatch(setLanguage(language)),
  login: () => dispatch(loginStart()),
  logout: () => dispatch(logoutStart()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

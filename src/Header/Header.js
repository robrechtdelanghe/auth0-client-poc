import React from 'react'
import {connect} from 'react-redux'

import {setLanguage} from "../redux/settings/settings.actions"
import {loginStart, logoutStart, startSetApi} from "../redux/auth/auth.actions"
import {isAuthenticated, nickname} from "../redux/auth/auth.selector"

import styled from 'styled-components'
import {API_SOURCE_AUTH0, API_SOURCE_DELIJN} from "../constants"

const NavBar = styled.div`
  background-color: ${props => props.theme.cBack};
  color: ${props => props.theme.cFront};
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid ${props => props.theme.cFront}
`

const NavItem = styled.div`
  vertical-align: middle;
  line-height: 1.45em;
`

const Brand = styled(NavItem)`
  font-weight: bold;
  margin-right: 5px;
  vertical-align: middle;
  cursor: pointer;
`

const Logo = styled.img`
  height: 30px;
  margin-right: 5px;
  vertical-align: middle;
`

const Link = styled.a`
  padding: 5px;
  color: ${props => props.theme.cFront};
  vertical-align: middle;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    color: ${props => props.theme.cActive};
  }
`

const Spacer = styled.div`
  flex: 1 1 auto;
`

const Login = styled.a`
  padding: 5px 15px;
  border: 1px solid ${props => props.theme.cFront};
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.theme.cFront};
    border: 1px solid ${props => props.theme.cBack};
    cursor: pointer;
    color: ${props => props.theme.cBack}
  }
`

const Select = styled.select`
  background: transparent;
  color: ${props => props.theme.cFront};
  border:none;
  border-radius: 10px;
  font-size: 14px;
  margin-right: 10px;
  padding: 5px; /* If you add too much padding here, the options won't show in IE */
  width: ${props => props.width || '55px'};
  
  option {
    background-color: ${props => props.theme.cBack};
  }
`

const Header = (props) => (
  <NavBar>
    <Brand onClick={() => props.history.push(`/home`)}><Logo src="/delijn_logo.png" alt="logo"/>De Lijn - Auth0</Brand>
    { props.isAuthenticated && <NavItem><Link onClick={() => props.history.push(`/lines`)}>Lines</Link></NavItem>}
    <Spacer/>
    <NavItem>
      <Select onChange={(e) => props.setLang(e.target.value)} value={props.language}>
        <option value="nl">NL</option>
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="de">DE</option>
      </Select>
    </NavItem>
    <NavItem>
      <Select onChange={(e) => props.setApi(e.target.value)} value={props.apiSource} width="100px">
        <option value={API_SOURCE_DELIJN}>De Lijn</option>
        <option value={API_SOURCE_AUTH0}>Auth0</option>
      </Select>
    </NavItem>
    {!props.isAuthenticated && <Login onClick={props.login}>Login</Login>}
    {props.isAuthenticated && <Login onClick={() => props.logout(props.history.location.pathname)}>Logout</Login>}
  </NavBar>
)

const mapStateToProps = (state) => ({
  language: state.settings.language,
  apiSource: state.settings.apiSource,
  isAuthenticated: isAuthenticated(state),
  nickname: nickname(state),
})

const mapDispatchToProps = dispatch => ({
  setLang: (language) => dispatch(setLanguage(language)),
  setApi: (api) => dispatch(startSetApi(api)),
  login: () => dispatch(loginStart()),
  logout: (redirectUrl) => dispatch(logoutStart(redirectUrl)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

import React from 'react'
import {ThemeProvider, createGlobalStyle} from "styled-components"

const theme = {
  cFront: '#000000',
  cBack: '#FFFFFF',
  cActive: '#333333',
  cPrimary: '#100A95',
  cSecondary: '#0000FF',
  cDark: '#100A95',
  cLight: '#0000FF',
  cExtraLight: '#00FFFF',
  cFont: '#D6D3F0',
  cFontActive: '#FFFFFF',
}

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0; 
    font-family: "fakt-web, Helvetica Neue, Hevetica, sans-serif";
  }
`

const Theme = (props) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle/>
      {props.children}
    </>
  </ThemeProvider>
)
export default Theme
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {setLanguage} from "../redux/settings/settings.actions"
import {language} from "../redux/data/data.selector"

const Info = () => {
  const { language } = getProps()
  const { setLang } = createDispatchers()
  useEffect(() => {
    console.log('something')

    return () => {
      console.log('do nothing')
    }
  }, [language])

  return (
    <>
      <h1>Zever {language.toUpperCase()}</h1>
      <button onClick={()=> setLang('nl')}>set NL</button>
      <button onClick={()=> setLang('fr')}>set FR</button>
    </>
  )
}

const createDispatchers = (dispatch = useDispatch()) => ({
  setLang: language => dispatch(setLanguage(language))
})

const getProps = () => ({
  language: useSelector(language)
})

export default Info

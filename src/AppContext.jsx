import { createContext, useState, useCallback, useEffect } from "react"
import initialState from "../src/Database/State"

const AppContext = createContext(initialState)

export const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState)
  const [showElement, setShowElement] = useState(false)

  const add = useCallback((item) => {
    setState((currentState) => {
      return currentState.concat(item)
    })
    setShowElement(true)
    setTimeout(function () {
      setShowElement(false)
    }, 3000)
  }, [])

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("data") || []))
  }, [])

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state))
  }, [state])

  return <AppContext.Provider {...props} value={{ add, state, showElement }} />
}
export default AppContext

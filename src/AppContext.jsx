import { createContext, useCallback, useEffect, useState } from "react"

import { makeClient } from "./services/api.js"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [state, setState] = useState(null)
  const [id, setId] = useState(null)

  const ajouter = useCallback(async (titre, entry) => {
    await makeClient().post("/", {
      titre,
      entry,
    })
  }, [])

  const supprimer = useCallback(async (id) => {
    await makeClient().delete("/" + id)
  }, [])

  const editer = useCallback(async (id, titre, entry) => {
    await makeClient().put("/" + id, {
      titre,
      entry,
    })
  }, [])
  const obtenir = useCallback(async (id) => {
    return makeClient().get("/" + id)
  }, [])

  const obtenirTous = useCallback(async () => {
    return await makeClient().get("/")
  }, [])

  useEffect(async () => {
    let items = await obtenirTous().then((value) => {
      return value.data
    })
    setState(items)
  }, [obtenirTous, state])

  return (
    <AppContext.Provider
      {...props}
      value={{
        state,
        obtenirTous,
        obtenir,
        ajouter,
        supprimer,
        editer,
        id,
        setId,
      }}
    />
  )
}

export default AppContext

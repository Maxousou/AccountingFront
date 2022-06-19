import "../styles/globals.css"
import { AppContextProvider } from "../src/AppContext"

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp

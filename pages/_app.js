import { ThemeProvider } from '@emotion/react'
import GlobalStyles from '../styles/global-styles'
import theme from '../styles/theme'

function App ({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App

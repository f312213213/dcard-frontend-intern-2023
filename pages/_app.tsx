import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NextNProgress from 'nextjs-progressbar'
import theme from '@/styles/theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <NextNProgress options={{ showSpinner: false }} />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}

export default App

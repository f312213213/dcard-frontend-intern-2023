import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NextNProgress from 'nextjs-progressbar'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>

      <NextNProgress options={{ showSpinner: false }} />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App

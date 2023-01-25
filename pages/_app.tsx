import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { setupApiCallerAuth } from '@/apis/apiClient'
import { wrapper } from '@/features/store'
import BackdropContainer from '@/containers/BackdropContainer'
import ErrorBoundaryToast from '@/components/Toast/ErrorBoundaryToast'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ToastContainer from '@/containers/ToastContainer'
import parseCookie from '@/utilis/auth/parseCookie'
import theme from '@/styles/theme'

const App = ({ Component, ...rest }: AppProps) => {
  useEffect(() => {
    const { accessToken } = parseCookie(document.cookie)
    if (accessToken) setupApiCallerAuth({ accessToken })
  }, [])

  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryToast}>
         <Provider store={store}>
          <NextNProgress options={{ showSpinner: false }} />
          <BackdropContainer />
          <Header />
          <Component {...props.pageProps} />
          <ToastContainer />
          <Footer />
         </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App

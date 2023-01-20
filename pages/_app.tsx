import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { wrapper } from '@/features/store'
import Backdrop from '@/components/Backdrop'
import ErrorBoundaryToast from '@/components/Toast/ErrorBoundaryToast'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Toast from '@/components/Toast'
import theme from '@/styles/theme'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryToast}>
         <Provider store={store}>
          <NextNProgress options={{ showSpinner: false }} />
          <Backdrop />
          <Header />
          <Component {...props.pageProps} />
          <Toast />
          <Footer />
         </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App

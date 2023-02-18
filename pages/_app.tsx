import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { wrapper } from '@/features/store'
import Backdrop from '@/containers/Backdrop'
import Dialogs from '@/containers/Dialogs'
import ErrorBoundaryToast from '@/components/Toast/ErrorBoundaryToast'
import Header from '@/components/Header'
import Init from '@/containers/Init'
import Sidebar from '@/containers/Sidebar'
import Toast from '@/containers/Toast'
import theme from '@/styles/theme'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryToast}>
            <Init />
            <NextNProgress options={{ showSpinner: false }} />
            <Backdrop />
            <Header />
            <Dialogs />
            <Sidebar />
            <Component {...props.pageProps} />
            <Toast />
            {/* <Footer /> */}
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  )
}

export default App

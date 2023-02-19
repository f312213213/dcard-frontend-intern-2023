import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { wrapper } from '@/features/store'
import ErrorBoundaryToast from '@/components/Toast/ErrorBoundaryToast'
import Init from '@/containers/Init'
import dynamic from 'next/dynamic'
import theme from '@/styles/theme'

const Toast = dynamic(() => import('@/containers/Toast'), { ssr: false })
const Sidebar = dynamic(() => import('@/containers/Sidebar'), { ssr: false })
const Header = dynamic(() => import('@/components/Header'), { ssr: false })
const Dialogs = dynamic(() => import('@/containers/Dialogs'), { ssr: false })
const Backdrop = dynamic(() => import('@/containers/Backdrop'), { ssr: false })

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

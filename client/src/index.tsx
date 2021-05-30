import Box from '@material-ui/core/Box'
import { StrictMode, Suspense } from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './i18n'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { App, store } from './app'
import { ErrorFallback, Spinner } from './components'

const i18nLoader = (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Spinner />
  </Box>
)

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CookiesProvider>
        <Provider store={store}>
          <Suspense fallback={i18nLoader}>
            <Router>
              <App />
            </Router>
          </Suspense>
        </Provider>
      </CookiesProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

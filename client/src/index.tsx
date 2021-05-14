import Box from '@material-ui/core/Box'
import { StrictMode, Suspense } from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './i18n'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { App, store } from './app'
import { Spinner } from './components'

const suspenseFallback = (
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
    <CookiesProvider>
      <Provider store={store}>
        <Suspense fallback={suspenseFallback}>
          <Router>
            <App />
          </Router>
        </Suspense>
      </Provider>
    </CookiesProvider>
  </StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

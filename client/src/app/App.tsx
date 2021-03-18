import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createTheme, DARK, LIGHT } from './theme'
import { TopBar } from '../components'
import { Home } from '../features/home'
import { fetchCsrfToken, Login } from '../features/auth'

export function App() {
  const dispatch = useDispatch()

  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${DARK})`)

  const theme = React.useMemo(
    () => createTheme(prefersDarkMode ? DARK : LIGHT),
    [prefersDarkMode],
  )

  useEffect(() => {
    dispatch(fetchCsrfToken())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <TopBar />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

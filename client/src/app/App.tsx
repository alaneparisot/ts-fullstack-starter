import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createTheme, DARK, LIGHT } from './theme'
import { TopBar } from '../components'
import {
  Login,
  fetchCsrfToken,
  selectFetchCsrfTokenStatus,
  selectLoginStatus,
  selectLogoutStatus,
} from '../features/auth'
import { Home } from '../features/home'
import {
  fetchCurrentUser,
  resetCurrentUser,
  selectFetchCurrentUserStatus,
} from '../features/user'

export function App() {
  const dispatch = useDispatch()

  const fetchCsrfTokenStatus = useSelector(selectFetchCsrfTokenStatus)

  const fetchCurrentUserStatus = useSelector(selectFetchCurrentUserStatus)
  const loginStatus = useSelector(selectLoginStatus)
  const logoutStatus = useSelector(selectLogoutStatus)

  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${DARK})`)

  const theme = useMemo(() => createTheme(prefersDarkMode ? DARK : LIGHT), [
    prefersDarkMode,
  ])

  useEffect(() => {
    dispatch(fetchCsrfToken())
  }, [dispatch])

  useEffect(() => {
    const authRequests = [fetchCsrfTokenStatus, loginStatus]
    if (authRequests.includes('succeeded')) dispatch(fetchCurrentUser())
  }, [dispatch, fetchCsrfTokenStatus, loginStatus])

  useEffect(() => {
    if (fetchCurrentUserStatus === 'failed' || logoutStatus === 'succeeded') {
      dispatch(resetCurrentUser())
    }
  }, [dispatch, fetchCurrentUserStatus, logoutStatus])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <TopBar />
        <Container>
          <Box pt={5}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

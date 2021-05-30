import { PaletteType } from '@material-ui/core/'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useEffect, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { createTheme, DARK, LIGHT } from './theme'
import { TopBar } from '../components'
import {
  AUTH_ROUTE,
  AuthRouter,
  fetchCsrfToken,
  selectFetchCsrfTokenStatus,
  selectLoginStatus,
  selectLogoutStatus,
} from '../features/auth'
import { Home, HOME_ROUTE } from '../features/home'
import {
  fetchCurrentUser,
  resetCurrentUser,
  selectFetchCurrentUserStatus,
  setPrefersDarkMode,
} from '../features/user'

export function App() {
  const dispatch = useDispatch()

  const [cookies] = useCookies(['prefersDarkMode'])

  const fetchCsrfTokenStatus = useSelector(selectFetchCsrfTokenStatus)
  const fetchCurrentUserStatus = useSelector(selectFetchCurrentUserStatus)
  const loginStatus = useSelector(selectLoginStatus)
  const logoutStatus = useSelector(selectLogoutStatus)

  const deviceIsInDarkMode = useMediaQuery(`(prefers-color-scheme: ${DARK})`)

  const theme = useMemo(() => {
    let paletteType: PaletteType

    if (cookies.prefersDarkMode) {
      const userPrefersDarkMode = cookies.prefersDarkMode === 'true'
      paletteType = userPrefersDarkMode ? DARK : LIGHT
      dispatch(setPrefersDarkMode(userPrefersDarkMode))
    } else if (deviceIsInDarkMode) {
      paletteType = DARK
      dispatch(setPrefersDarkMode(true))
    } else {
      paletteType = LIGHT
      dispatch(setPrefersDarkMode(false))
    }

    return createTheme(paletteType)
  }, [dispatch, deviceIsInDarkMode, cookies])

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
      <TopBar />
      <Container>
        <Box pt={5}>
          <Switch>
            <Route exact path={HOME_ROUTE}>
              <Home />
            </Route>
            <Route path={AUTH_ROUTE}>
              <AuthRouter />
            </Route>
            <Route path="*">
              <Redirect to={HOME_ROUTE} />
            </Route>
          </Switch>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

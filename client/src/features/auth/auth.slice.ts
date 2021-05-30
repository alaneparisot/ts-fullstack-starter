import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { Credentials } from '.'
import { AppThunk, RootState } from '../../app'
import { ProcessStatus } from '../../types'

interface AuthState {
  fetchCsrfTokenStatus: ProcessStatus
  loginStatus: ProcessStatus
  logoutStatus: ProcessStatus
}

export const initialState: AuthState = {
  fetchCsrfTokenStatus: 'idle',
  loginStatus: 'idle',
  logoutStatus: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFetchCsrfTokenStatus: (
      state,
      action: PayloadAction<AuthState['fetchCsrfTokenStatus']>,
    ) => {
      state.fetchCsrfTokenStatus = action.payload
    },
    setLoginStatus: (
      state,
      action: PayloadAction<AuthState['loginStatus']>,
    ) => {
      state.loginStatus = action.payload
    },
    setLogoutStatus: (
      state,
      action: PayloadAction<AuthState['logoutStatus']>,
    ) => {
      state.logoutStatus = action.payload
    },
  },
})

export const { setFetchCsrfTokenStatus, setLoginStatus, setLogoutStatus } =
  authSlice.actions

const authApiUrl = '/api/auth'

export const fetchCsrfToken = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetchCsrfTokenStatus('started'))

    const url = `${authApiUrl}/csrf-token`
    const res = await axios.get(url)
    const csrfToken = res?.data?.csrfToken

    if (csrfToken) {
      axios.defaults.headers.post['X-CSRF-Token'] = csrfToken
      dispatch(setFetchCsrfTokenStatus('succeeded'))
    } else {
      throw new Error(`No csrf token data in ${url} response.`)
    }
  } catch (err) {
    dispatch(setFetchCsrfTokenStatus('failed'))
  } finally {
    dispatch(setFetchCsrfTokenStatus('idle'))
  }
}

export const login =
  (credentials: Credentials): AppThunk =>
  async (dispatch) => {
    try {
      const url = `${authApiUrl}/login`
      dispatch(setLoginStatus('started'))
      await axios.post(url, credentials)
      dispatch(setLoginStatus('succeeded'))
    } catch (err) {
      dispatch(setLoginStatus('failed'))
    } finally {
      dispatch(setLoginStatus('idle'))
    }
  }

export const logout = (): AppThunk => async (dispatch) => {
  try {
    const url = `${authApiUrl}/logout`
    dispatch(setLogoutStatus('started'))
    await axios.post(url)
    dispatch(setLogoutStatus('succeeded'))
  } catch (err) {
    dispatch(setLogoutStatus('failed'))
  } finally {
    dispatch(setLogoutStatus('idle'))
  }
}

export const selectFetchCsrfTokenStatus = (state: RootState) => {
  return state.auth.fetchCsrfTokenStatus
}

export const selectLoginStatus = (state: RootState) => {
  return state.auth.loginStatus
}

export const selectLogoutStatus = (state: RootState) => {
  return state.auth.logoutStatus
}

export const authReducer = authSlice.reducer

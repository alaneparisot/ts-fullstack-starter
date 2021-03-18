import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Credentials } from '.'
import { AppThunk, RootState } from '../../app'
import { AsyncRequestStatus } from '../../types'

interface AuthState {
  fetchCsrfTokenStatus: AsyncRequestStatus
  loginStatus: AsyncRequestStatus
  logoutStatus: AsyncRequestStatus
}

const initialState: AuthState = {
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

export const {
  setFetchCsrfTokenStatus,
  setLoginStatus,
  setLogoutStatus,
} = authSlice.actions

const authApiUrl = '/api/auth'

export const fetchCsrfToken = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetchCsrfTokenStatus('pending'))

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

export const login = (credentials: Credentials): AppThunk => async (
  dispatch,
) => {
  try {
    const url = `${authApiUrl}/login`
    dispatch(setLoginStatus('pending'))
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
    dispatch(setLogoutStatus('pending'))
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

export const selectLoginStatus = (state: RootState) => state.auth.loginStatus
export const selectLogoutStatus = (state: RootState) => state.auth.logoutStatus

export const authReducer = authSlice.reducer

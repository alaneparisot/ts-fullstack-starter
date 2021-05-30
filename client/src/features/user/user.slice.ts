import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { User } from '.'
import { AppThunk, RootState } from '../../app'
import { ProcessStatus } from '../../types'

interface UserPreferences {
  prefersDarkMode: boolean
}

interface UserState {
  currentUser: User | null
  fetchCurrentUserStatus: ProcessStatus
  preferences: UserPreferences
}

export const initialState: UserState = {
  currentUser: null,
  fetchCurrentUserStatus: 'idle',
  preferences: {
    prefersDarkMode: false,
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCurrentUser: (state) => {
      state.currentUser = initialState.currentUser
    },
    setCurrentUser: (
      state,
      action: PayloadAction<UserState['currentUser']>,
    ) => {
      state.currentUser = action.payload
    },
    setFetchCurrentUserStatus: (
      state,
      action: PayloadAction<UserState['fetchCurrentUserStatus']>,
    ) => {
      state.fetchCurrentUserStatus = action.payload
    },
    setPrefersDarkMode: (
      state,
      action: PayloadAction<UserPreferences['prefersDarkMode']>,
    ) => {
      state.preferences.prefersDarkMode = action.payload
    },
  },
})

export const {
  resetCurrentUser,
  setCurrentUser,
  setFetchCurrentUserStatus,
  setPrefersDarkMode,
} = userSlice.actions

const userApiUrl = '/api/users'

export const fetchCurrentUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetchCurrentUserStatus('started'))

    const url = `${userApiUrl}/me`
    const res = await axios.get(url)
    const user = res?.data?.user

    if (user) {
      dispatch(setCurrentUser(user))
      dispatch(setFetchCurrentUserStatus('succeeded'))
    } else {
      throw new Error(`No user data in ${url} response.`)
    }
  } catch (err) {
    dispatch(setFetchCurrentUserStatus('failed'))
  } finally {
    dispatch(setFetchCurrentUserStatus('idle'))
  }
}

export const selectCurrentUser = (state: RootState) => {
  return state.user.currentUser
}

export const selectFetchCurrentUserStatus = (state: RootState) => {
  return state.user.fetchCurrentUserStatus
}

export const selectUserPreferences = (state: RootState) => {
  return state.user.preferences
}

export const userReducer = userSlice.reducer

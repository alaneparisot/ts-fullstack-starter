import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from './'
import { AppThunk, RootState } from '../../app'
import { AsyncRequestStatus } from '../../types'

interface UserState {
  currentUser: User | null
  fetchCurrentUserStatus: AsyncRequestStatus
}

const initialState: UserState = {
  currentUser: null,
  fetchCurrentUserStatus: 'idle',
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
  },
})

export const {
  resetCurrentUser,
  setCurrentUser,
  setFetchCurrentUserStatus,
} = userSlice.actions

const userApiUrl = '/api/users'

export const fetchCurrentUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetchCurrentUserStatus('pending'))

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

export const selectCurrentUser = (state: RootState) => state.user.currentUser

export const selectFetchCurrentUserStatus = (state: RootState) => {
  return state.user.fetchCurrentUserStatus
}

export const userReducer = userSlice.reducer

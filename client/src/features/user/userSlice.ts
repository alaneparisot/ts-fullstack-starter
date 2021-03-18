import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from './'
import { AppThunk, RootState } from '../../app'

interface UserState {
  current: User | null
}

const initialState: UserState = {
  current: null,
}

const userApiUrl = '/api/users'

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<UserState['current']>) => {
      state.current = action.payload
    },
  },
})

export const { setCurrent } = userSlice.actions

export const fetchCurrentUser = (): AppThunk => async (dispatch) => {
  try {
    const url = `${userApiUrl}/me`

    const res = await axios.get(url)

    const user = res?.data?.user

    if (user) {
      dispatch(setCurrent(user))
    } else {
      throw new Error(`No user data in ${url} response.`)
    }
  } catch (err) {
    dispatch(setCurrent(initialState.current))
  }
}

export const selectCurrentUser = (state: RootState) => state.user.current

export const userReducer = userSlice.reducer

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authReducer } from '../features/auth'
import { userReducer } from '../features/user'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

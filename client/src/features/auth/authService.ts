import axios from 'axios'
import { Credentials } from '.'
import { fetchCurrentUser } from '../user'
import { AppThunk } from '../../app'

const authApiUrl = '/api/auth'

export const fetchCsrfToken = (): AppThunk => async (dispatch) => {
  try {
    const url = `${authApiUrl}/csrf-token`
    const res = await axios.get(url)
    const csrfToken = res?.data?.csrfToken

    if (csrfToken) {
      axios.defaults.headers.post['X-CSRF-Token'] = csrfToken
      dispatch(fetchCurrentUser())
    } else {
      throw new Error(`No csrf token data in ${url} response.`)
    }
  } catch (err) {
    dispatch(fetchCurrentUser())
  }
}

export const login = (credentials: Credentials): AppThunk => async (
  dispatch,
) => {
  try {
    const url = `${authApiUrl}/login`
    await axios.post(url, credentials)
    dispatch(fetchCurrentUser())
  } catch (err) {
    dispatch(fetchCurrentUser())
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  try {
    const url = `${authApiUrl}/logout`
    await axios.post(url)
    dispatch(fetchCurrentUser())
  } catch (err) {
    dispatch(fetchCurrentUser())
  }
}

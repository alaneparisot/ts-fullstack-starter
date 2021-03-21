import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Credentials, login, selectLoginStatus } from '../auth'
import { Page } from '../../components'

export function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation(['auth'])

  const { register, handleSubmit, errors } = useForm<Credentials>()

  const loginStatus = useSelector(selectLoginStatus)

  const onSubmit = (credentials: Credentials) => {
    dispatch(login(credentials))
  }

  useEffect(() => {
    if (loginStatus === 'succeeded') history.push('/')
  }, [history, loginStatus])

  return (
    <Page title={t('login')} midWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  inputRef={register({ required: true })}
                  name="username"
                  label={t('username')}
                  error={!!errors.username}
                  helperText={errors.username ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  inputRef={register({ required: true })}
                  type="password"
                  name="password"
                  label={t('password')}
                  error={!!errors.username}
                  helperText={errors.username ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-end">
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  {t('login')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Page>
  )
}

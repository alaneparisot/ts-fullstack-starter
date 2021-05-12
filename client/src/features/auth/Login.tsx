import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Alert, { Color } from '@material-ui/lab/Alert'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Credentials, login, selectLoginStatus } from '../auth'
import { APP_CONSTANTS } from '../../app'
import { Page } from '../../components'

export function Login() {
  const dispatch = useDispatch()
  const { t } = useTranslation(['auth', 'form'])

  const [openAlertError, setOpenAlertError] = useState(false)
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Credentials>()

  const loginStatus = useSelector(selectLoginStatus)

  const onSubmit = (credentials: Credentials) => {
    console.log('onSubmit', credentials)
    dispatch(login(credentials))
  }

  useEffect(() => {
    if (loginStatus === 'failed') {
      setOpenAlertError(true)
    } else if (loginStatus === 'succeeded') {
      setOpenAlertSuccess(true)
    }
  }, [loginStatus])

  const handleCloseAlert = (alertSeverity: Color) => {
    if (alertSeverity === 'error') {
      setOpenAlertError(false)
    } else if (alertSeverity === 'success') {
      setOpenAlertSuccess(false)
    }
  }

  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <Page title={t('login')} midWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Controller
                  name="username"
                  defaultValue=""
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('username')}
                      data-testid="username-input"
                      error={!!errors.username}
                      helperText={
                        errors.username ? t('form:requiredField') : ''
                      }
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="password"
                  defaultValue=""
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('password')}
                      data-testid="password-input"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.password}
                      helperText={
                        errors.password ? t('form:requiredField') : ''
                      }
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  data-testid="hello"
                >
                  {t('login')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={openAlertError}
        autoHideDuration={APP_CONSTANTS.autoHideDuration}
        onClose={() => handleCloseAlert('error')}
      >
        <Alert onClose={() => handleCloseAlert('error')} severity="error">
          {t('loginError')}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openAlertSuccess}
        autoHideDuration={APP_CONSTANTS.autoHideDuration}
        onClose={() => handleCloseAlert('success')}
      >
        <Alert onClose={() => handleCloseAlert('success')} severity="success">
          {t('loginSuccess')}
        </Alert>
      </Snackbar>
    </Page>
  )
}

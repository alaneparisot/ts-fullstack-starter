import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Credentials, login } from '../auth'

export function Login() {
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm<Credentials>()

  const onSubmit = (credentials: Credentials) => {
    dispatch(login(credentials))
  }

  return (
    <>
      <Typography variant="h3" component="h2">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" mb={3}>
          <TextField
            inputRef={register({ required: true })}
            name="username"
            label="Username"
            error={!!errors.username}
            helperText={errors.username ? 'This field is required' : ''}
          />
          <TextField
            inputRef={register({ required: true })}
            name="password"
            label="Password"
            error={!!errors.username}
            helperText={errors.username ? 'This field is required' : ''}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Primary
        </Button>
      </form>
    </>
  )
}

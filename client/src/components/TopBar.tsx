import AppBar from '@material-ui/core/AppBar'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { UserMenu } from '../features/user'
import { StyledLink } from '../components'

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export function TopBar() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" className={classes.title}>
          <StyledLink to="/" className={classes.link}>
            MERN App
          </StyledLink>
        </Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

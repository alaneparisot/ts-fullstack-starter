import { PopoverOrigin } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { MouseEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCurrentUser } from './'
import { logout } from '../auth'
import {
  selectFetchCurrentUserStatus,
  selectUserPreferences,
  setPrefersDarkMode,
} from '../user'

export function UserMenu() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [, setCookie] = useCookies(['prefersDarkMode'])

  const user = useSelector(selectCurrentUser)
  const fetchCurrentUserStatus = useSelector(selectFetchCurrentUserStatus)
  const userPreferences = useSelector(selectUserPreferences)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleDarkModeChange = () => {
    const nextValue = !userPreferences.prefersDarkMode
    dispatch(setPrefersDarkMode(nextValue))
    setCookie('prefersDarkMode', nextValue)
  }

  const handleIconClick = (evt: MouseEvent<HTMLElement>) => {
    setAnchorEl(evt.currentTarget)
  }

  const handleLinkClick = (path: string) => {
    history.push(path)
    handleMenuClose()
  }

  const handleLogout = () => {
    dispatch(logout())
    handleMenuClose()
  }

  const handleMenuClose = () => setAnchorEl(null)

  const menuOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
  }

  return fetchCurrentUserStatus === 'pending' ? (
    <CircularProgress />
  ) : (
    <>
      <Box mr={1}>
        <Typography variant="body2">{user?.username}</Typography>
      </Box>
      <IconButton onClick={handleIconClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-user"
        anchorEl={anchorEl}
        anchorOrigin={menuOrigin}
        keepMounted
        transformOrigin={menuOrigin}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        {user ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={() => handleLinkClick('/login')}>Login</MenuItem>
        )}
        <MenuItem onClick={handleDarkModeChange}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={!!userPreferences.prefersDarkMode} />}
              label="Dark mode"
            />
          </FormGroup>
        </MenuItem>
      </Menu>
    </>
  )
}

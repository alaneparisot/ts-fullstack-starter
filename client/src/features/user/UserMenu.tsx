import { PopoverOrigin } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCurrentUser } from './'
import { logout } from '../auth'
import {
  selectFetchCurrentUserStatus,
  selectUserPreferences,
  setPrefersDarkMode,
} from '../user'
import { Spinner } from '../../components'

export function UserMenu() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t, i18n } = useTranslation(['user', 'auth'])

  const [, setCookie] = useCookies(['prefersDarkMode'])

  const user = useSelector(selectCurrentUser)
  const fetchCurrentUserStatus = useSelector(selectFetchCurrentUserStatus)
  const userPreferences = useSelector(selectUserPreferences)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [language, setLanguage] = useState<string>(i18n.language)

  const handleDarkModeChange = () => {
    const shouldBeDarkMode = !userPreferences.prefersDarkMode
    dispatch(setPrefersDarkMode(shouldBeDarkMode))
    setCookie('prefersDarkMode', shouldBeDarkMode)
  }

  const handleIconClick = (evt: MouseEvent<HTMLElement>) => {
    setAnchorEl(evt.currentTarget)
  }

  const handleLanguageChange = (
    evt: ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const selectedLanguage = evt.target.value as string
    i18n.changeLanguage(selectedLanguage)
    setLanguage(selectedLanguage)
    handleMenuClose()
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
    <Spinner />
  ) : (
    <>
      <Box mr={1} data-testid="username">
        <Typography variant="body2">{user?.username}</Typography>
      </Box>
      <IconButton onClick={handleIconClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        data-testid="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={menuOrigin}
        keepMounted
        transformOrigin={menuOrigin}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        {user ? (
          <MenuItem onClick={handleLogout}>{t('auth:logout')}</MenuItem>
        ) : (
          <MenuItem onClick={() => handleLinkClick('/login')}>
            {t('auth:login')}
          </MenuItem>
        )}
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel id="preferred-language">{t('language')}</InputLabel>
            <Select
              labelId="preferred-language"
              value={language}
              onChange={handleLanguageChange}
            >
              <MenuItem value={'en-US'}>English</MenuItem>
              <MenuItem value={'fr-FR'}>Français</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={!!userPreferences.prefersDarkMode} />}
              label={t('darkMode')}
              onChange={handleDarkModeChange}
            />
          </FormGroup>
        </MenuItem>
      </Menu>
    </>
  )
}

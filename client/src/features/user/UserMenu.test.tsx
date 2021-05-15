import userEvent from '@testing-library/user-event'
import axios from 'axios'
import produce from 'immer'
import {
  act,
  initialState,
  render,
  screen,
  within,
} from '../../utils/test-utils'
import { App } from '../../app'
import { UserMenu } from './UserMenu'

function getDarkModeSwitch() {
  return screen.getByLabelText('i18n-darkMode')
}

function getLanguageSelect() {
  const languageMenuItem = screen.getByTestId('user-menu-item-language')
  return within(languageMenuItem).getByLabelText(/^i18n-language/)
}

function getUserMenuItem(itemText: string) {
  return within(screen.getByTestId('user-menu')).getByText(itemText)
}

function getUsername(usernameText: string) {
  return within(screen.getByTestId('username')).queryByText(usernameText)
}

describe('UserMenu', () => {
  describe('Authentication', () => {
    describe('Login', () => {
      it('should switch to login page when user clicks on login button', () => {
        // Arrange
        render(<App />)

        // Act
        userEvent.click(getUserMenuItem('i18n-auth:login'))

        // Assert
        expect(screen.getByTestId('page-i18n-login')).toBeInTheDocument()
      })
    })

    describe('Logout', () => {
      const username = 'johndoe'

      const preloadedState = produce(initialState, (draftState) => {
        draftState.user.currentUser = {
          _id: '',
          token: '',
          username,
        }
      })

      it('should display username if user is connected', () => {
        // Arrange
        render(<UserMenu />, { preloadedState })

        // Assert
        expect(getUsername(username)).toBeInTheDocument()
      })

      it('should not display username once user logged out', async () => {
        // Arrange
        const queryMock = jest.spyOn(axios, 'post').mockResolvedValue(undefined)
        const queryPath = expect.stringContaining('logout')

        render(<App />, { preloadedState })

        // Act
        await act(async () => {
          userEvent.click(getUserMenuItem('i18n-auth:logout'))
        })

        // Assert
        expect(queryMock).toHaveBeenCalledWith(queryPath)
        expect(getUsername(username)).not.toBeInTheDocument()
      })
    })
  })

  describe('Dark Mode', () => {
    it('should be light mode by default', () => {
      // Arrange
      render(<UserMenu />, { preloadedState: initialState })

      // Assert
      expect(getDarkModeSwitch()).not.toBeChecked()
    })

    it('should change to dark mode on switch toggle', () => {
      // Arrange
      render(<UserMenu />, { preloadedState: initialState })

      // Act
      userEvent.click(getDarkModeSwitch())

      // Assert
      expect(getDarkModeSwitch()).toBeChecked()
    })
  })

  describe('Language', () => {
    it('should be i18n selected language by default', () => {
      // Arrange
      render(<UserMenu />)

      // Assert
      expect(getLanguageSelect().textContent).toContain('English')
      expect(screen.getByLabelText('i18n-darkMode')).toBeInTheDocument()
    })

    it('should change to French when fr-FR option is selected', () => {
      // Arrange
      render(<UserMenu />)

      // Act
      userEvent.click(getLanguageSelect())
      userEvent.click(screen.getByTestId('language-option-fr-FR'))

      // Assert
      expect(getLanguageSelect().textContent).toContain('Français')
      expect(screen.getByLabelText('i18n-darkMode-fr-FR')).toBeInTheDocument()
    })
  })
})

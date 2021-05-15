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

function getUserMenuItem(itemText: string) {
  return within(screen.getByTestId('user-menu')).getByText(itemText)
}

function getUsername(usernameText: string) {
  return within(screen.getByTestId('username')).queryByText(usernameText)
}

describe('UserMenu', () => {
  describe('Authentication', () => {
    describe('Login', () => {
      it('should switch to login page if login button is clicked', () => {
        // Act
        render(<App />)
        userEvent.click(getUserMenuItem('i18n-auth:login'))

        // Assert
        expect(screen.getByTestId('page-i18n-login')).toBeInTheDocument()
      })
    })

    describe('Logout', () => {
      // Arrange
      const username = 'johndoe'

      const preloadedState = produce(initialState, (draftState) => {
        draftState.user.currentUser = {
          _id: '',
          token: '',
          username,
        }
      })

      it('should display username if user is connected', () => {
        // Act
        render(<UserMenu />, { preloadedState })

        // Assert
        expect(getUsername(username)).toBeInTheDocument()
      })

      it('should not display username if user is logged out', async () => {
        // Arrange
        const queryMock = jest.spyOn(axios, 'post').mockResolvedValue(undefined)
        const queryPath = expect.stringContaining('logout')

        // Act
        render(<App />, { preloadedState })

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
      // Act
      render(<UserMenu />, { preloadedState: initialState })

      // Assert
      expect(getDarkModeSwitch()).not.toBeChecked()
    })

    it('should change to dark mode on switch click', () => {
      // Act
      render(<UserMenu />, { preloadedState: initialState })
      userEvent.click(getDarkModeSwitch())

      // Assert
      expect(getDarkModeSwitch()).toBeChecked()
    })
  })
})

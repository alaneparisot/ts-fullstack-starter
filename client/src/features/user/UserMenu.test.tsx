import userEvent from '@testing-library/user-event'
import produce from 'immer'
import { initialState, render, screen } from '../../utils/test-utils'
import { App } from '../../app'
import { UserMenu } from './UserMenu'

describe('UserMenu', () => {
  describe('Authentication', () => {
    describe('Login', () => {
      it('should display login button if user is not connected', () => {
        // Act
        render(<UserMenu />)

        // Assert
        expect(screen.getByText('i18n-auth:login')).toBeInTheDocument()
      })

      it('should switch to login page if login button is clicked', () => {
        // Arrange
        render(<App />)

        // Act
        userEvent.click(screen.getByText('i18n-auth:login'))

        // Assert
        expect(screen.getByTestId('page-i18n-login')).toBeInTheDocument()
      })
    })

    describe('Logout', () => {
      it('should display logout button if user is connected', () => {
        // Arrange
        const preloadedState = produce(initialState, (draftState) => {
          draftState.user.currentUser = {
            _id: '',
            token: '',
            username: '',
          }
        })

        // Act
        render(<UserMenu />, { preloadedState })

        // Assert
        expect(screen.getByText('i18n-auth:logout')).toBeInTheDocument()
      })
    })
  })
})

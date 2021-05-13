import produce from 'immer'
import { initialState, render, screen } from '../../utils/test-utils'
import { UserMenu } from './UserMenu'

describe('UserMenu', () => {
  describe('Authentication', () => {
    it('should display login button if user is not connected', () => {
      // Act
      render(<UserMenu />)

      // Assert
      expect(screen.getByText('i18n-auth:login')).toBeInTheDocument()
    })

    it('should display logout button if user is connected', () => {
      // Arrange
      const state = produce(initialState, (draftState) => {
        draftState.user.currentUser = {
          _id: '',
          token: '',
          username: '',
        }
      })

      // Act
      render(<UserMenu />, { preloadedState: state })

      // Assert
      expect(screen.getByText('i18n-auth:logout')).toBeInTheDocument()
    })
  })
})

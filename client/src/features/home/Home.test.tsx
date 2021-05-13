import produce from 'immer'
import { initialState, render, screen } from '../../utils/test-utils'
import { Home } from './Home'

describe('Home', () => {
  it('should display simple welcome message if user is not connected', () => {
    // Act
    render(<Home />)

    // Assert
    expect(screen.getByText('i18n-welcome')).toBeInTheDocument()
  })

  it('should display welcome message and username if user is connected', () => {
    // Arrange
    const state = produce(initialState, (draftState) => {
      draftState.user.currentUser = {
        _id: '',
        token: '',
        username: 'John Doe',
      }
    })

    // Act
    render(<Home />, { preloadedState: state })

    // Assert
    expect(screen.getByText(/^i18n-welcomeName.+John Doe/)).toBeInTheDocument()
  })
})

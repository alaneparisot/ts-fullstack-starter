import { render, screen } from '../../utils/test-utils'
import { Home } from './Home'

describe('Home', () => {
  it('should display welcome message without username if user is not connected', () => {
    // Act
    render(<Home />)

    // Assert
    expect(screen.getByText(/i18n-welcome/)).toBeInTheDocument()
  })

  it('should display welcome message with username if user is connected', () => {
    // Arrange
    const initialState = {
      user: {
        currentUser: {
          _id: 'user-id-1',
          username: 'user-name-1',
          token: 'user-token-1',
        },
      },
    }

    // Act
    render(<Home />, { preloadedState: initialState })

    // Assert
    expect(screen.getByText(/i18n-welcomeName/)).toBeInTheDocument()
    expect(screen.getByText(/user-name-1/)).toBeInTheDocument()
  })
})

import { render, screen } from '../../utils/test-utils'
import { Home } from './Home'

describe('Home', () => {
  it('should display simple welcome message when user not connected', () => {
    // Act
    render(<Home />)

    // Assert
    expect(screen.getByText('i18n-welcome')).toBeInTheDocument()
  })

  it('should display welcome message with username when user connected', () => {
    // Arrange
    const initialState = {
      user: {
        currentUser: {
          _id: '',
          username: 'johndoe',
          token: '',
        },
      },
    }

    // Act
    render(<Home />, { preloadedState: initialState })

    // Assert
    expect(screen.getByText(/^i18n-welcomeName.+johndoe/)).toBeInTheDocument()
  })
})

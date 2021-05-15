import userEvent from '@testing-library/user-event'
import { render, screen } from '../../utils/test-utils'
import { App } from '../../app'

describe('TopBar', () => {
  it('should go to Home page on title click', () => {
    // Arrange
    render(<App />, { route: '/login' })
    expect(screen.getByTestId('page-i18n-login')).toBeInTheDocument()

    // Act
    userEvent.click(screen.getByText('MERN TS Starter'))

    // Assert
    expect(screen.getByTestId('page-i18n-welcome')).toBeInTheDocument()
  })
})

import { act } from 'react-dom/test-utils'
import { fireEvent, render, screen } from '../../utils/test-utils'
import { Login } from './Login'

describe('Login', () => {
  it('should display messages if credentials are not provided', async () => {
    // Arrange
    render(<Login />)

    // Act
    await act(async () => {
      fireEvent.submit(screen.getByTestId('hello'))
    })

    // Assert
    const usernameInputEl = screen.getByTestId('username-input')
    const passwordInputEl = screen.getByTestId('password-input')

    const expectedText = 'i18n-form:requiredField'

    expect(usernameInputEl.textContent).toContain(expectedText)
    expect(passwordInputEl.textContent).toContain(expectedText)
  })
})

import axios from 'axios'
import { act } from 'react-dom/test-utils'
import {
  fireEvent,
  render,
  screen,
  Screen,
  within,
} from '../../utils/test-utils'
import { Login } from './Login'

describe('Login', () => {
  it('should display error messages when credentials are missing', async () => {
    // Arrange
    const errorMessage = 'i18n-form:requiredField'

    // Act
    render(<Login />)

    await act(async () => {
      fireEvent.submit(screen.getByTestId('form-submit'))
    })

    // Assert
    const usernameFormField = findFormField(screen, 'username')
    const passwordFormField = findFormField(screen, 'password')
    expect(usernameFormField.textContent).toContain(errorMessage)
    expect(passwordFormField.textContent).toContain(errorMessage)
  })

  describe('Notifications', () => {
    type runTestParams = {
      loginShouldSucceed: boolean
    }

    const runTest = async ({ loginShouldSucceed }: runTestParams) => {
      // Arrange
      const username = 'johndoe'
      const password = '1234567'
      const queryPath = expect.stringContaining('login')
      const queryData = { username, password }

      const queryMock = loginShouldSucceed
        ? jest.spyOn(axios, 'post').mockResolvedValue(undefined)
        : jest.spyOn(axios, 'post').mockRejectedValue(undefined)

      const notificationText = loginShouldSucceed
        ? 'i18n-loginSuccess'
        : 'i18n-loginError'

      // Act
      render(<Login />)

      await act(async () => {
        typeInFormField(screen, 'username', username)
        typeInFormField(screen, 'password', password)

        fireEvent.submit(screen.getByTestId('form-submit'))
      })

      // Assert
      expect(queryMock).toHaveBeenCalledWith(queryPath, queryData)
      expect(screen.getByText(notificationText)).toBeInTheDocument()
    }

    it('should display success notification when login succeed', async () => {
      await runTest({ loginShouldSucceed: true })
    })

    it('should display error notification when login failed', async () => {
      await runTest({ loginShouldSucceed: false })
    })
  })
})

// Helpers

function findFormField(screen: Screen, fieldName: string) {
  return screen.getByTestId(`form-field-${fieldName}`)
}

function typeInFormField(screen: Screen, fieldName: string, value: string) {
  const field = findFormField(screen, fieldName)
  const input = within(field).getByLabelText(`i18n-${fieldName}`)

  fireEvent.input(input, { target: { value } })
}

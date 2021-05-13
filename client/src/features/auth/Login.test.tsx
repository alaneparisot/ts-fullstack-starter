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

function getFormField(screen: Screen, fieldName: string) {
  return screen.getByTestId(`form-field-${fieldName}`)
}

function getFormSubmit(screen: Screen) {
  return screen.getByTestId('form-submit')
}

function typeInFormField(screen: Screen, fieldName: string, value: string) {
  const field = getFormField(screen, fieldName)
  const input = within(field).getByLabelText(`i18n-${fieldName}`)

  fireEvent.input(input, { target: { value } })
}

describe('Login', () => {
  describe('Error Messages', () => {
    const errorMessage = 'i18n-form:requiredField'

    it('should not display error messages if no submit is done', () => {
      // Act
      render(<Login />)

      // Assert
      const usernameFormField = getFormField(screen, 'username')
      const passwordFormField = getFormField(screen, 'password')
      expect(usernameFormField.textContent).not.toContain(errorMessage)
      expect(passwordFormField.textContent).not.toContain(errorMessage)
    })

    it('should display error messages if credentials are missing', async () => {
      // Act
      render(<Login />)

      await act(async () => {
        fireEvent.submit(getFormSubmit(screen))
      })

      // Assert
      const usernameFormField = getFormField(screen, 'username')
      const passwordFormField = getFormField(screen, 'password')
      expect(usernameFormField.textContent).toContain(errorMessage)
      expect(passwordFormField.textContent).toContain(errorMessage)
    })
  })

  describe('Notifications', () => {
    const errorNotificationText = 'i18n-loginError'
    const successNotificationText = 'i18n-loginSuccess'

    type RunTestParams = {
      loginShouldSucceed: boolean
      notificationText: string
    }

    const testNotificationIsInTheDocument = async ({
      loginShouldSucceed,
      notificationText,
    }: RunTestParams) => {
      // Arrange
      const username = 'johndoe'
      const password = '1234567'
      const queryPath = expect.stringContaining('login')
      const queryData = { username, password }

      const queryMock = loginShouldSucceed
        ? jest.spyOn(axios, 'post').mockResolvedValue(undefined)
        : jest.spyOn(axios, 'post').mockRejectedValue(undefined)

      // Act
      render(<Login />)

      await act(async () => {
        typeInFormField(screen, 'username', username)
        typeInFormField(screen, 'password', password)

        fireEvent.submit(getFormSubmit(screen))
      })

      // Assert
      expect(queryMock).toHaveBeenCalledWith(queryPath, queryData)
      expect(screen.getByText(notificationText)).toBeInTheDocument()
    }

    it('should not display notifications if no submit is done', () => {
      // Act
      render(<Login />)

      // Assert
      const errorNotificationEl = screen.queryByText(errorNotificationText)
      const successNotificationEl = screen.queryByText(successNotificationText)
      expect(errorNotificationEl).not.toBeInTheDocument()
      expect(successNotificationEl).not.toBeInTheDocument()
    })

    it('should display success notification if login succeed', async () => {
      await testNotificationIsInTheDocument({
        loginShouldSucceed: true,
        notificationText: successNotificationText,
      })
    })

    it('should display error notification if login failed', async () => {
      await testNotificationIsInTheDocument({
        loginShouldSucceed: false,
        notificationText: errorNotificationText,
      })
    })
  })
})

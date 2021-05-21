import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { act, render, screen, waitFor, within } from '../../../utils/test-utils'
import { Login } from '../../../features/auth/Login'

function getFormField(fieldName: string) {
  return screen.getByTestId(`form-field-${fieldName}`)
}

function getFormSubmit() {
  return screen.getByTestId('form-submit')
}

function typeInFormField(fieldName: string, text: string) {
  const field = getFormField(fieldName)
  const input = within(field).getByLabelText(`i18n-${fieldName}`)

  userEvent.type(input, text)
}

describe('Login', () => {
  describe('Error Messages', () => {
    const errorMessage = 'i18n-form:requiredField'

    it('should not display error messages if no submit is done', () => {
      // Arrange
      render(<Login />)

      // Assert
      const usernameFormField = getFormField('username')
      const passwordFormField = getFormField('password')
      expect(usernameFormField.textContent).not.toContain(errorMessage)
      expect(passwordFormField.textContent).not.toContain(errorMessage)
    })

    it('should display error messages if credentials are missing', async () => {
      // Arrange
      render(<Login />)

      // Act
      await act(async () => {
        userEvent.click(getFormSubmit())
      })

      // Assert
      const usernameFormField = getFormField('username')
      const passwordFormField = getFormField('password')
      expect(usernameFormField.textContent).toContain(errorMessage)
      expect(passwordFormField.textContent).toContain(errorMessage)
    })
  })

  describe('Notifications', () => {
    const errorNotificationText = 'i18n-loginError'
    const successNotificationText = 'i18n-loginSuccess'

    type TestNotificationOpeningParams = {
      loginShouldSucceed: boolean
      notificationText: string
    }

    const testNotificationOpening = async ({
      loginShouldSucceed,
      notificationText,
    }: TestNotificationOpeningParams) => {
      // Arrange
      const username = 'johndoe'
      const password = 'secret'
      const queryPath = expect.stringContaining('login')
      const queryData = { username, password }

      const queryMock = loginShouldSucceed
        ? jest.spyOn(axios, 'post').mockResolvedValue(undefined)
        : jest.spyOn(axios, 'post').mockRejectedValue(undefined)

      render(<Login />)

      // Act
      typeInFormField('username', username)
      typeInFormField('password', password)

      await act(async () => {
        userEvent.click(getFormSubmit())
      })

      // Assert
      expect(queryMock).toHaveBeenCalledWith(queryPath, queryData)
      expect(screen.getByText(notificationText)).toBeInTheDocument()
    }

    type TestNotificationClosingParams = {
      notificationTestId: string
      notificationText: string
    }

    const testNotificationClosing = async ({
      notificationTestId,
      notificationText,
    }: TestNotificationClosingParams) => {
      // Arrange
      const notification = screen.getByTestId(notificationTestId)
      const closeButton = within(notification).getByRole('button')

      // Act
      userEvent.click(closeButton)

      // Assert
      await waitFor(() => {
        expect(screen.queryByText(notificationText)).not.toBeInTheDocument()
      })
    }

    it('should not display notifications if no submit is done', () => {
      // Arrange
      render(<Login />)

      // Assert
      const errorNotificationEl = screen.queryByText(errorNotificationText)
      const successNotificationEl = screen.queryByText(successNotificationText)
      expect(errorNotificationEl).not.toBeInTheDocument()
      expect(successNotificationEl).not.toBeInTheDocument()
    })

    it('should display success notification if login succeed', async () => {
      await testNotificationOpening({
        loginShouldSucceed: true,
        notificationText: successNotificationText,
      })

      await testNotificationClosing({
        notificationTestId: 'notification-success',
        notificationText: successNotificationText,
      })
    })

    it('should display error notification if login failed', async () => {
      await testNotificationOpening({
        loginShouldSucceed: false,
        notificationText: errorNotificationText,
      })

      await testNotificationClosing({
        notificationTestId: 'notification-error',
        notificationText: errorNotificationText,
      })
    })
  })
})

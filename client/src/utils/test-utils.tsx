import { configureStore, DeepPartial, EnhancedStore } from '@reduxjs/toolkit'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { reducer, RootState } from '../app'
import { initialState as authInitialState } from '../features/auth'
import { initialState as userInitialState } from '../features/user'

interface CustomRenderOptions {
  preloadedState?: DeepPartial<RootState>
  store?: EnhancedStore
  renderOptions?: Omit<RenderOptions, 'queries'>
}

export const mockChangeLanguage = jest.fn()

let mockSelectedLanguage = 'en-US'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options: any) => {
      let result = `i18n-${key}`

      if (mockSelectedLanguage !== 'en-US') {
        result += `-${mockSelectedLanguage}`
      }

      if (options) {
        result += `-${JSON.stringify(options)}`
      }

      return result
    },
    i18n: {
      language: mockSelectedLanguage,
      changeLanguage: (lang: string) => (mockSelectedLanguage = lang),
    },
  }),
}))

const render = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: CustomRenderOptions = {},
) => {
  const wrapper: FC = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  )

  return rtlRender(ui, { wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export const initialState: RootState = {
  auth: authInitialState,
  user: userInitialState,
}

export { render }

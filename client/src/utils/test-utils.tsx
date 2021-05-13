import { configureStore, DeepPartial, EnhancedStore } from '@reduxjs/toolkit'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { reducer, RootState } from '../app'

interface CustomRenderOptions {
  preloadedState?: DeepPartial<RootState>
  store?: EnhancedStore
  renderOptions?: Omit<RenderOptions, 'queries'>
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options: any) => {
      let result = `i18n-${key}`

      if (options) {
        result += `-${JSON.stringify(options)}`
      }

      return result
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
    <Provider store={store}>{children}</Provider>
  )

  return rtlRender(ui, { wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { render }

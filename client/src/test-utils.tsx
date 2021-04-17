import { configureStore, DeepPartial, EnhancedStore } from '@reduxjs/toolkit'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { reducer, RootState } from './app'

interface CustomRenderOptions {
  preloadedState?: DeepPartial<RootState>
  store?: EnhancedStore
  renderOptions?: Omit<RenderOptions, 'queries'>
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options: any) => `i18n-${key}-${JSON.stringify(options)}`,
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
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { render }

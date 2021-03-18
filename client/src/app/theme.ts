import { PaletteType } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

export const DARK = 'dark'
export const LIGHT = 'light'

export function createTheme(type: PaletteType) {
  const options: ThemeOptions = {
    palette: {
      type,
    },
  }

  return createMuiTheme(options)
}

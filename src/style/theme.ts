import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    border: {
      borderWidth: number
      borderColor: string
    }
  }
  interface Palette {
    declarations: {
      main: string
      instruction: string
      codecard: string
      statement: string
      help: string
    }
  }
  interface TypeBackground {
    button: {
      main: string
      light: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    border?: {
      borderWidth?: string
      borderColor?: string
    }
  }
  interface PaletteOptions {
    declarations?: {
      main?: string
      instruction?: string
      codecard?: string
      statement?: string
      help?: string
    }
  }
  interface TypeBackgroundOptions {
    button?: {
      main?: string
      light?: string
    }
  }
}

const primary = '#085394'
const secondary = '#FFFFFF'
const black = '#000000'
const background = '#eeeeee'
const lightBlue = '#9fc5f8'
const info = '#777777'
const borderWidth = '1px'

export const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    common: {
      black: black,
    },
    info: {
      main: info,
    },
    declarations: {
      main: primary,
      instruction: primary,
      codecard: primary,
      statement: primary,
      help: black,
    },
    background: {
      default: background,
      button: {
        main: primary,
        light: lightBlue,
      },
    },
  },
  border: {
    borderWidth: borderWidth,
    borderColor: info,
  },
})

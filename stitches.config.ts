import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      white: '#FFF',
      gray900: '#121214',
      gray800: '#202024',
      gray300: '#C4C4CC',
      gray100: '#E1E1E6',
      green500: '#00875F',
      green300: '#00B37E',
    },
    fontSizes: {
      sm: '0.875rem', // 14
      md: '1.125rem', // 18
      lg: '1.25rem', // 20
      xl: '1.5rem', // 24
      '2xl': '2rem', // 32
    },
  },
})

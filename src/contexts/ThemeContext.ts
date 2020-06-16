import { createContext } from 'react'
import { Theme } from '../../types'

const ThemeContext = createContext<Theme>({
  theme: null,
  activateLightMode: () => {},
  activateDarkMode: () => {},
})

export default ThemeContext

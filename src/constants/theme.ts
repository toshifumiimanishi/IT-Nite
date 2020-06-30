import { colors } from './colors'

export const theme = {
  light: {
    backgroundColor: colors.white,
    color: colors.gray[800],
  },
  dark: {
    backgroundColor: colors.gray[800],
    color: colors.white,
  },
} as const

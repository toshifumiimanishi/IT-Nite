import { colors } from './colors'
import { rgba } from 'polished'

export const components = {
  border: {
    color: colors.gray[600],
    radius: '4px',
  },
  button: {
    backgroundColor: colors.black,
    hover: {
      backgroundColor: colors.blue[200],
    },
  },
  card: {
    boxShadow: `0 1px 3px 1px ${rgba(
      colors.gray[800],
      0.2
    )}, 0 2px 8px 4px ${rgba(colors.gray[800], 0.1)}`,
  },
  footer: {
    backgroundColor: colors.black,
    color: colors.white,
  },
  header: {
    backgroundColor: colors.black,
    color: colors.white,
  },
  link: {
    color: colors.blue[200],
    decoration: 'none',
  },
  selection: {
    backgroundColor: colors.pink.a200,
    color: colors.white,
  },
} as const

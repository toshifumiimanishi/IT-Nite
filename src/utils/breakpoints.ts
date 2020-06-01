import { breakpoints } from '../constants/breakpoints'

const breakpointMin = (name: keyof typeof breakpoints) => {
  const min = breakpoints[name]
  return min !== 0 ? min : null
}

const breakpointMax = (name: keyof typeof breakpoints) => {
  const max = breakpoints[name]
  return max && max > 0 ? max - 0.02 : null
}

export const breakpointUp = (name: keyof typeof breakpoints) => {
  const min = breakpointMin(name)
  if (min) {
    return `@media (min-width: ${min}px)`
  } else  {
    return '&'
  }
}

export const breakpointDown = (name: keyof typeof breakpoints) => {
  const max = breakpointMax(name)
  if (max) {
    return `@media (max-width: ${max}px)`
  } else {
    return '&'
  }
}

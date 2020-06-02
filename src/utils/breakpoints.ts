import { breakpoints } from '../constants/breakpoints'

type Breakpoints = keyof typeof breakpoints

const breakpointNext = (name: Breakpoints) => {
  const breakpointNames  = Object.keys(breakpoints) as Breakpoints[]
  const nextIndex = breakpointNames.indexOf(name) + 1
  if (nextIndex < breakpointNames.length) {
    return breakpointNames[nextIndex]
  } else {
    return null
  }
}

const breakpointMin = (name: Breakpoints) => {
  const min = breakpoints[name]
  return min !== 0 ? min : null
}

const breakpointMax = (name: Breakpoints) => {
  const max = breakpoints[name]
  return max && max > 0 ? max - 0.02 : null
}

export const breakpointUp = (name: Breakpoints) => {
  const min = breakpointMin(name)
  if (min) {
    return `@media (min-width: ${min}px)`
  } else  {
    return '&'
  }
}

export const breakpointDown = (name: Breakpoints) => {
  const max = breakpointMax(name)
  if (max) {
    return `@media (max-width: ${max}px)`
  } else {
    return '&'
  }
}

export const breakpointBetween = (lower: Breakpoints, upper: Breakpoints) => {
  const min = breakpointMin(lower)
  const max = breakpointMax(upper)

  if (min !== null && max !== null) {
    return `@media (min-width: ${min}px) and (max-width: ${max}px)`
  } else if (max === null) {
    return breakpointUp(lower)
  } else if (min === null) {
    return breakpointDown(upper)
  }
}

export const breakpointOnly = (name: Breakpoints) => {
  const next = breakpointNext(name)

  if (next === null) return breakpointUp(name)

  const min = breakpointMin(name)
  const max = breakpointMax(next)

  if (min !== null && max !== null) {
    return `@media (min-width: ${min}px) and (max-width: ${max}px)`
  } else if (max == null) {
    return breakpointUp(name)
  } else if (min == null) {
    return breakpointDown(next)
  }
}

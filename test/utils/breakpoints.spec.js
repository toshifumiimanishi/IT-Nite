import { breakpoints } from '../../src/constants/breakpoints'
import {
  breakpointNext,
  breakpointMin,
  breakpointMax,
  breakpointUp,
  breakpointDown,
  breakpointBetween,
  breakpointOnly,
} from '../../src/utils/breakpoints'

describe('breakpointNext', () => {
  const names = Object.keys(breakpoints)
  names.map((name, i) => {
    if (names[i + 1]) {
      it(`should return next breakpoint name if is '${name}'`, () => {
        expect(breakpointNext(name)).toBe(names[i + 1])
      })
    } else {
      it(`should return null if is '${name}'`, () => {
        expect(breakpointNext(name)).toBe(null)
      })
    }
  })
})

describe('breakpointMin', () => {
  for (const name in breakpoints) {
    if (breakpoints.hasOwnProperty(name)) {
      const value = breakpoints[name]
      if (value !== 0) {
        it(`should return min width if is '${name}'`, () => {
          expect(breakpointMin(name)).toBe(value)
        })
      } else {
        it(`should return null if is '${name}'`, () => {
          expect(breakpointMin(name)).toBe(null)
        })
      }
    }
  }
})

describe('breakpointMax', () => {
  for (const name in breakpoints) {
    if (breakpoints.hasOwnProperty(name)) {
      const value = breakpoints[name];
      if (value !== 0) {
        it(`should return max width if is '${name}'`, () => {
          expect(breakpointMax(name)).toBe(value - 0.02)
        })
      } else {
        it(`should return null if is '${name}'`, () => {
          expect(breakpointMax(name)).toBe(null)
        })
      }
    }
  }
})

describe('breakpointUp', () => {
  for (const name in breakpoints) {
    if (breakpoints.hasOwnProperty(name)) {
      const value = breakpoints[name]
      if (value !== 0) {
        it(`should return min breakpoint value and media query if is '${name}'`, () => {
          expect(breakpointUp(name)).toBe(`@media (min-width: ${value}px)`)
        })
      } else {
        it(`should return no media query if is '${name}'`, () => {
          expect(breakpointUp(name)).toBe('&')
        })
      }
    }
  }
})

describe('breakpointDown', () => {
  for (const name in breakpoints) {
    if (breakpoints.hasOwnProperty(name)) {
      const value = breakpoints[name]
      if (value !== 0) {
        it(`should return max breakpoint value and media query if is '${name}'`, () => {
          expect(breakpointDown(name)).toBe(`@media (max-width: ${value - 0.02}px)`)
        })
      } else {
        it(`should return no media query if is '${name}'`, () => {
          expect(breakpointDown(name)).toBe('&')
        })
      }
    }
  }
})

describe('breakpointBetween', () => {
  for (const name in breakpoints) {
    if (breakpoints.hasOwnProperty(name)) {
      const next = breakpointNext(name)
      const value = breakpoints[name]
      const nextValue = breakpoints[next]

      if (next === null) {
        it(`should returns a string containing the value of the minimum and maximum breakpoints and media query if is '${name}'`, () => {
          expect(breakpointBetween(name, next)).toBe(`@media (min-width: ${value}px)`)
        })
      } else if (value !== 0) {
        it(`should returns a string containing the value of the minimum and maximum breakpoints and media query if is '${name}' and '${next}'`, () => {
          expect(breakpointBetween(name, next)).toBe(`@media (min-width: ${value}px) and (max-width: ${nextValue - 0.02}px)`)
        })
      } else {
        it(`should returns a string containing the value of the minimum and maximum breakpoints and media query if is '${name}' and '${next}'`, () => {
          expect(breakpointBetween(name, next)).toBe(`@media (max-width: ${nextValue - 0.02}px)`)
        })
      }
    }
  }
})

describe('breakpointOnly', () => {
  for (const name in breakpoints) {
    if (breakpoints.hasOwnProperty(name)) {
      const next = breakpointNext(name)
      const value = breakpoints[name]
      const nextValue = breakpoints[next]

      if (next === null) {
        it(`should returns a string containing the minimum and maximum values of the '${name}' breakpoint and media query`, () => {
          expect(breakpointOnly(name)).toBe(`@media (min-width: ${value}px)`)
        })
      } else if (value !== 0) {
        it(`should returns a string containing the minimum and maximum values of the '${name}' breakpoint and media query`, () => {
          expect(breakpointOnly(name)).toBe(`@media (min-width: ${value}px) and (max-width: ${nextValue - 0.02}px)`)
        })
      } else {
        it(`should returns a string containing the minimum and maximum values of the '${name}' breakpoint and media query`, () => {
          expect(breakpointOnly(name)).toBe(`@media (max-width: ${nextValue - 0.02}px)`)
        })
      }
    }
  }
})

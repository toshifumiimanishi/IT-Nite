export type Theme = {
  theme: 'light' | 'dark' | null
  activateLightMode: () => void
  activateDarkMode: () => void
}

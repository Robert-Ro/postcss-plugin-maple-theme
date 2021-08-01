declare module 'postcss-nesting'
export interface Options {
  function?: string
  darkThemeSelector?: string
  groups: {
    [key: string]: string[]
  }
  colors: {
    [key: string]: string
  }
  useCustomProperties?: boolean
  nestingPlugin?: string
}
export type Theme = 'dark' | 'light'

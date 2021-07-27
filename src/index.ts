import postcss, { AtRule, CssSyntaxError, Declaration, Helpers, Plugin, PluginCreator, Rule } from 'postcss'
import Processor from 'postcss/lib/processor'

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
export const getGroup = (value: string, reGroup: RegExp): string => {
  return value.replace(reGroup, (match, group) => {
    return group
  })
}
export const resolveColor = (options: Options, theme: Theme, group: string, defaultValue: string): string => {
  const [lightColor, darkColor] = options.groups[group] || []
  const color: string = theme === 'dark' ? darkColor : lightColor
  if (!color) {
    return defaultValue
  }
  if (options.useCustomProperties) {
    return color.startsWith('--') ? `var(${color})` : `var(--${color})`
  }
  return options.colors[color] || defaultValue
}
const plugincssMapleTheme: PluginCreator<Options> = (_options?: Options): Plugin | Processor => {
  const options = Object.assign(
    {
      darkThemeSelector: 'html[data-theme="dark"]',
      function: 'cc',
    } as Options,
    _options
  )
  const reGroup = new RegExp(`\\b${options.function}\\(([^)]+)\\)`, 'g')
  const hasPlugin = (name: string, processor: Processor) => {
    return (
      name.replace(/^postcss-/, '') === options.nestingPlugin ||
      (processor.plugins as Plugin[]).some((p: Plugin) => p.postcssPlugin === name)
    )
  }
  const getValue = (value: string, theme: Theme) => {
    return value.replace(reGroup, (match, group) => {
      return resolveColor(options, theme, group, match)
    })
  }

  return {
    postcssPlugin: 'postcss-theme-colors',
    Declaration: {
      color: (decl: Declaration, { result }: Helpers) => {
        const value = decl.value
        if (!value || !reGroup.test(value)) {
          return
        }
        const lightValue = getValue(value, 'light')
        const darkValue = getValue(value, 'dark')
        if (value === darkValue && value === lightValue) {
          const group = getGroup(value, reGroup)
          throw decl.error(`group ${group} has no colors configuration`)
        }
        const darkDecl = decl.clone({ value: darkValue })
        let darkRule: AtRule | Rule
        if (hasPlugin('postcss-nesting', result.processor)) {
          darkRule = postcss.atRule({
            name: 'nest',
            params: `${options.darkThemeSelector} &`,
          })
        } else if (hasPlugin('postcss-nested', result.processor)) {
          darkRule = postcss.rule({
            selector: `${options.darkThemeSelector} &`,
          })
        } else {
          throw decl.error(`Plugin(postcss-nesting or postcss-nested) not found`)
        }
        if (darkRule) {
          darkRule.append(darkDecl)
          //Insert new node after current node to current node’s parent.
          decl.after(darkRule)
        }
        const ligthDecl = decl.clone({ value: lightValue })
        decl.replaceWith(ligthDecl)
      },
    },
  }
}
plugincssMapleTheme.postcss = true

export default plugincssMapleTheme

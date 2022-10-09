import postcss, { CssSyntaxError } from 'postcss'
import plugin from '../src'
import postcssNested from 'postcss-nested'
//@typescript-eslint-disabled @typescript-eslint/no-var-require
const postcssNesting = require('postcss-nesting')

describe('postcss-plugin-maple-theme test cases', () => {
  it('should function color property be resolved right', async () => {
    const result = postcss([
      plugin({
        groups: {
          G01: ['C01', 'C02'],
        },
        colors: {
          C01: '#eee',
          C02: '#111',
        },
      }),
      postcssNested(),
      postcssNesting(),
    ])
      .process(
        `a{
          color: cc(G01);
      }`
      )
      .root.toResult().css
    expect(result).toMatchSnapshot()
  })
  it('should no group colors will throw CssSyntaxError', async () => {
    expect(() => {
      postcss([
        plugin({
          groups: {
            G01: ['C01', 'C02'],
          },
          colors: {
            C01: '#eee',
            C02: '#111',
          },
        }),
        postcssNested(),
      ])
        .process(
          `a{
          color: cc(G02);
      }`
        )
        .root.toResult().css
    }).toThrow(CssSyntaxError)
  })
  it('should no postcssNested imported will throw CssSyntaxError', async () => {
    expect(() => {
      postcss([
        plugin({
          groups: {
            G01: ['C01', 'C02'],
          },
          colors: {
            C01: '#eee',
            C02: '#111',
          },
        }),
      ])
        .process(
          `a{
          color: cc(G01);
      }`
        )
        .root.toResult().css
    }).toThrow(CssSyntaxError)
  })
  it('useCustomProperties color property should be resolved right', () => {
    const result = postcss([
      plugin({
        groups: {
          G01: ['C01', 'C02'],
        },
        colors: {
          C01: 'red',
          C02: '--read',
        },
        useCustomProperties: true,
      }),
      postcssNested(),
    ])
      .process(
        `a{
          color: cc(G01);
      }
      `
      )
      .root.toResult().css
    expect(result).toMatchSnapshot()
  })
  it('non function color property should not be transformed', () => {
    const result = postcss([
      plugin({
        groups: {
          G01: ['C01', 'C02'],
        },
        colors: {
          C01: '#eee',
          C02: '#111',
        },
      }),
      postcssNested(),
    ])
      .process(
        `a{
          color: #FFF;
      }`
      )
      .root.toResult().css
    expect(result).toMatchSnapshot()
  })
})

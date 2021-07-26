import postcss from 'postcss'
import plugin from '../src'
import postcssNested from 'postcss-nested'

describe('postcss-plugin-maple-theme test cases', () => {
  it('a', async () => {
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
          color: cc(G01);
      }`
      )
      .root.toResult().css
    expect(result).toMatchSnapshot()
  })
})

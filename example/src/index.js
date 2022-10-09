/* eslint-disable no-undef */
import './index.less'
import './index.css'
// eslint-disable-next-line no-console
console.log('@liutsing/postcss-theme-colors')
const span = document.createElement('span')
span.textContent = 'This is a span tag'
const a = document.createElement('a')
a.textContent = 'This is a link tag'
const dark = document.createElement('button')
dark.addEventListener('click', () => {
  document.documentElement.setAttribute('data-theme', 'dark')
})
dark.textContent = 'dark'
const light = document.createElement('button')
light.addEventListener('click', () => {
  document.documentElement.removeAttribute('data-theme')
})
light.textContent = 'light'

document.body.appendChild(a)
document.body.appendChild(span)
document.body.appendChild(dark)
document.body.appendChild(light)

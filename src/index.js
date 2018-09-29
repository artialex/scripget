/** @jsx h */
import { h, render } from 'preact'

import { addPrefix as x } from './constants'
import { defaults } from './defaults'
import { Widget } from './components/Widget'

const cs = document.currentScript

const settings = {
  color: cs.dataset.color || defaults.color,
  theme: cs.dataset.theme || defaults.theme,
}

const container = document.createElement('div')

container.classList.add(x`widget-root`)

cs.parentNode.insertBefore(container, cs.nextSibling)

render(<Widget {...settings} />, container)

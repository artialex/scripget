import { addPrefix as x } from '../constants'

export function as(css, str) {
  const props = {}

  console.log('globals :: 6', css);

  props.className = css.locals[x([str])]

  if (process.env.NODE_ENV !== 'production') {
    props['data-test'] = x([str])
  }

  return props
}

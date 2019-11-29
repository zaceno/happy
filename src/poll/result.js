import { h } from 'hyperapp'
import { result as css } from './style.css'

export default ({ value }) => <p class={css}>{value || ''}</p>

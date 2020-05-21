import html from 'hyperlit'
import { result as css } from './style.css'

export default ({ value }) => html`<p class=${css}>${value || ''}</p>`

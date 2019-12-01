import { app } from 'hyperapp'
import { init, view } from './main'
app({ init, view, node: document.querySelector('main') })

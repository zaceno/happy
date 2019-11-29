import { app } from 'hyperapp'
import { init } from './model'
import view from './view'

app({
    init,
    view,
    node: document.querySelector('main'),
})

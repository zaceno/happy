import { app } from 'hyperapp'
import { mapVNode, mapPass } from 'hyperapp-map'
import { init, screenGet, screenMap } from './model'
import { view as ScreenView } from './screens'
import * as pages from './pages'

app({
    init: init('init'),
    view: state =>
        mapVNode(
            screenMap,
            ScreenView(screenGet(state), p => mapPass(pages[p](state)))
        ),
    node: document.querySelector('main'),
})

import { mapVNode, mapPass } from 'hyperapp-map'
import * as pages from './pages'
import { screenMap, screenGet } from '../model'
import { view as ScreenView } from '../screens'

export default state =>
    mapVNode(
        screenMap,
        ScreenView(screenGet(state), name => mapPass(pages[name](state)))
    )

import * as model from './model/main'
import * as slides from './slides'
import defaultPage from './pages/default'

export const init = model.init(defaultPage)
export const view = state => slides.view(state)

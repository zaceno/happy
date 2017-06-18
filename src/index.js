//DOING: make it nice and modular
//TODO: make the layout work for web-mode on iphone se, as well as scale up responsively for higher heights of devices
//TODO: actual build-system, less parsing, with live-reload, dev server built in et c.
const {renderer} = require('zx-app-utils/dom/renderer')
const model = require('./model')
const {AppContainer}  = require('./components/misc')
const pages = {
    initial: require('./pages/initial'),
    start:   require('./pages/start'),
    vote:    require('./pages/vote'),
    pass:    require('./pages/pass'),
    result:  require('./pages/result'),
    reset:   require('./pages/reset')
}
const CurrentPage = _ => pages[model.navigation.page()]()
const MainView = _ => AppContainer({page: CurrentPage()})
const render = renderer(MainView)
model.store.onupdate(render)
render()
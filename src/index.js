const app = require('zx-app-utils/app/main')
const store = require('./model/store')
const {page: currentPage} = require('./model/navigation')
const {AppContainer}  = require('./components/misc')
const pages = {
    initial: require('./pages/initial'),
    start:   require('./pages/start'),
    vote:    require('./pages/vote'),
    pass:    require('./pages/pass'),
    result:  require('./pages/result'),
    reset:   require('./pages/reset')
}
app({store, view: _ => AppContainer({page: pages[currentPage()]})})

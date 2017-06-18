const {Panel} = require('../components/misc')
const Page = require('../components/page')
module.exports = _ => Page(
    {
        name: 'initial',
        target: 'start',
        extra: 'Tap here to...',
        text: 'Start'
    },
    [
        Panel({}, ['Happiness Index Calculator'])
    ]
)

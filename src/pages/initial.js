const Panel = require('../components/panel')
const Page = require('../components/page')

module.exports = (state, actions) => Page(
    {
        name: 'initial',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'start',
            direction: 'forward',
            extra: 'Tap here to...',
            text: 'Start',
        }
    },
    [
        Panel({}, ['Happiness Index Calculator'])
    ]
)

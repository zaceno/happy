const Panel = require('../components/panel')
const Result = require('../components/result')
const Page = require('../components/page')

module.exports = (state, actions) => Page(
    {
        name: 'reset',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'start',
            direction: 'back',
            extra: 'Tap here to...',
            text: 'Start again',
        }
    },
    [
        Panel({}, [
            'Votes cleared from memory',
            Result(state.votes)
        ])
    ]
)

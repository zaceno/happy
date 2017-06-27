const Result = require('../components/result')
const Page = require('../components/page')
const Panel = require('../components/panel')

module.exports = (state, actions) => Page(
    {
        name: 'result',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'reset',
            direction: 'forward',
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset Votes',
        }
    },
    [
        Panel({}, [
            'Happiness Index',
            Result(state.votes)
        ])
    ]
)
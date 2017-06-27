const Page = require('../components/page')
const Panel = require('../components/panel')

module.exports = (state, actions) => Page(
    {
        name: 'start',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'vote',
            direction: 'forward',
            extra: "When you're ready, tap here to...",
            text: "Vote"
        }
    },
    [
        Panel({}, ['Please hand the phone to the first person to vote.'])
    ]
)

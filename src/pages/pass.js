const Panel = require('../components/panel')
const NavButton = require('../components/navbutton')
const Page = require('../components/page')

module.exports = (state, actions) => Page(
    {
        name: 'pass',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'vote',
            direction: 'back',
            extra: "Are you the next person? Tap here to...",
            text: "Vote",
        }
    },
    [
        NavButton({
            goTo: actions.goTo,
            target: 'result',
            direction: 'forward',
            extra: 'Has everyone voted? Tap here to...',
            text: 'Check Result'
        }),
        Panel({}, ['Thank you! Now, please hand the phone to the next person.'])
    ]
)

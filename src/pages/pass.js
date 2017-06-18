const {Panel} = require('../components/misc')
const NavButton = require('../components/navbutton')
const Page = require('../components/page')

module.exports = _ => Page(
    {
        name: 'pass',
        target: 'vote',
        extra: "Are you the next person? Tap here to...",
        text: "Vote",
    },
    [
        NavButton({
            target: 'result',
            extra: 'Has everyone voted? Tap here to...',
            text: 'Check Result'
        }),
        Panel({}, ['Thank you! Now, please hand the phone to the next person.'])
    ]
)

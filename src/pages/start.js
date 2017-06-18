const Page = require('../components/page')
const {Panel} = require('../components/misc')

module.exports = _ => Page(
    {
        name: 'start',
        target: 'vote',
        extra: "When you're ready, tap here to...",
        text: "Vote"
    },
    [
        Panel({}, ['Please hand the phone to the first person to vote.'])
    ]
)

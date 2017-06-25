const Voter = require('../components/voter')
const {Panel} = require('../components/misc')
const Page = require('../components/page')
const {commit: commitVote} = require('../model/votes')

module.exports = _ => Page({
        name: 'vote',
        target: 'pass',
        extra: "Make your selection, then tap here to...",
        text: "Cast Vote",
        onGo: commitVote
    },
    [
        Panel({}, ['How happy are you about your job?']),
        Voter()
    ]
)

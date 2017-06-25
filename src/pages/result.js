const {reset: resetVotes} = require('../model/votes')
const Result = require('../components/result')
const Page = require('../components/page')
const {Panel} = require('../components/misc')
module.exports = _ => Page(
    {
        name: 'result',
        target: 'reset',
        extra: 'Need to do it again? Tap here to...',
        text: 'Reset Votes',
        onGo: resetVotes,
    },
    [
        Panel({}, [
            'Happiness Index',
            Result()
        ])
    ]
)
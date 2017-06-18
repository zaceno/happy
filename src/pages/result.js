const model = require('../model')
const Result = require('../components/result')
const Page = require('../components/page')
const {Panel} = require('../components/misc')
module.exports = _ => Page(
    {
        name: 'result',
        target: 'reset',
        extra: 'Need to do it again? Tap here to...',
        text: 'Reset Votes',
        onGo: model.votes.reset,
    },
    [
        Panel({}, [
            'Happiness Index',
            Result()
        ])
    ]
)
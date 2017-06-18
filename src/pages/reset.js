const {Panel} = require('../components/misc')
const Result = require('../components/result')
const Page = require('../components/page')

module.exports = _ => Page(
    {
        name: 'reset',
        target: 'start',
        extra: 'Tap here to...',
        text: 'Start again'
    },
    [
        Panel({}, [
            'Votes cleared from memory',
            Result()
        ])
    ]
)

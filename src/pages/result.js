import Result from '../components/result'
import Page from '../components/page'
import Panel from '../components/panel'

export default ({direction, goTo, votes}) => Page(
    {
        name: 'result',
        direction,
        next: {
            goTo,
            target: 'reset',
            direction: 'forward',
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset Votes',
        }
    },
    [
        Panel({}, [
            'Happiness Index',
            Result({
                count: votes.state.count,
                sum: votes.state.sum,
            })
        ])
    ]
)
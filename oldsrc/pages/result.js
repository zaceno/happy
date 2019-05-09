import Result from '../components/result'
import Page from '../components/page'
import Panel from '../components/panel'

export default ({navigation, votes}) => Page(
    {
        name: 'result',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'reset',
            direction: 'forward',
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset Votes',
            onGo: votes.actions.reset,
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
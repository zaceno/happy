import Panel from '../components/panel'
import Result from '../components/result'
import Page from '../components/page'

export default  ({navigation, votes}) => Page(
    {
        name: 'reset',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'start',
            direction: 'back',
            extra: 'Tap here to...',
            text: 'Start again',
        }
    },
    [
        Panel({}, [
            'Votes cleared from memory',
            Result({
                count: votes.state.count,
                sum: votes.state.sum,
            })
        ])
    ]
)

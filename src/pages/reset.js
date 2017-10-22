import Panel from '../components/panel'
import Result from '../components/result'
import Page from '../components/page'

export default  (state, actions) => Page(
    {
        name: 'reset',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'start',
            direction: 'back',
            extra: 'Tap here to...',
            text: 'Start again',
        }
    },
    [
        Panel({}, [
            'Votes cleared from memory',
            Result(state.votes)
        ])
    ]
)

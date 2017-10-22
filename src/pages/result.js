import Result from '../components/result'
import Page from '../components/page'
import Panel from '../components/panel'

export default (state, actions) => Page(
    {
        name: 'result',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'reset',
            direction: 'forward',
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset Votes',
        }
    },
    [
        Panel({}, [
            'Happiness Index',
            Result(state.votes)
        ])
    ]
)
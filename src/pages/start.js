import Page from '../components/page'
import Panel from '../components/panel'

export default (state, actions) => Page(
    {
        name: 'start',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'vote',
            direction: 'forward',
            extra: "When you're ready, tap here to...",
            text: "Vote"
        }
    },
    [
        Panel({}, ['Please hand the phone to the first person to vote.'])
    ]
)

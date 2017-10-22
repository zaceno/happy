import Voter from '../components/voter'
import Panel from '../components/panel'
import Page from '../components/page'

export default (state, actions) => Page({
        name: 'vote',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
            target: 'pass',
            direction: 'forward',
            extra: "Make your selection, then tap here to...",
            text: "Cast Vote",
        }
    },
    [
        Panel({}, ['How happy are you about your job?']),
        Voter({
            value: state.votes.current,
            set: actions.votes.set
        })
    ]
)

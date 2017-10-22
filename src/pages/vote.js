import Voter from '../components/voter'
import Panel from '../components/panel'
import Page from '../components/page'

export default ({direction, goTo, votes}) => Page({
        name: 'vote',
        direction,
        next: {
            goTo,
            target: 'pass',
            direction: 'forward',
            extra: "Make your selection, then tap here to...",
            text: "Cast Vote",
        }
    },
    [
        Panel({}, ['How happy are you about your job?']),
        Voter({
            value: votes.state.current,
            set: votes.actions.set
        })
    ]
)

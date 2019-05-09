import Voter from '../components/voter'
import Panel from '../components/panel'
import Page from '../components/page'

export default ({navigation, votes}) => Page({
        name: 'vote',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'pass',
            direction: 'forward',
            extra: "Make your selection, then tap here to...",
            text: "Cast Vote",
            onGo: votes.actions.commit,
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

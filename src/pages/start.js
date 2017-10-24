import Page from '../components/page'
import Panel from '../components/panel'

export default ({navigation, votes}) => Page(
    {
        name: 'start',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
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

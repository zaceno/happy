import Page from '../components/page'
import Panel from '../components/panel'

export default ({direction, goTo}) => Page(
    {
        name: 'start',
        direction,
        next: {
            goTo,
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

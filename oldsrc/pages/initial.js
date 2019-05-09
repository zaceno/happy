import Panel from '../components/panel'
import Page from '../components/page'

export default ({navigation, votes}) => Page(
    {
        name: 'initial',
        direction: navigation.state.direction,
        next: {
            goTo: navigation.actions.goTo,
            target: 'start',
            direction: 'forward',
            extra: 'Tap here to...',
            text: 'Start',
        }
    },
    [
        Panel({}, ['Happiness Index Calculator'])
    ]
)

import Panel from '../components/panel'
import Page from '../components/page'

export default (state, actions) => Page(
    {
        name: 'initial',
        direction: state.page.direction,
        next: {
            goTo: actions.goTo,
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

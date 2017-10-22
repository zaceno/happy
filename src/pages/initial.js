import Panel from '../components/panel'
import Page from '../components/page'

export default ({direction, goTo}) => Page(
    {
        name: 'initial',
        direction,
        next: {
            goTo,
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

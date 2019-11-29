import Message from '../components/message'
import * as Nav from '../navigation'
import StartPage from './start'

export default Nav.Page(state => [
    Message('Happiness Index Calculator'),
    Nav.Button(state, {
        direction: 'left',
        page: StartPage,
        text: 'Start',
        extra: 'Tap here to ...',
    }),
])

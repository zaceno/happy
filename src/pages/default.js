import Message from '../view/message'
import StartPage from './start'
import * as slides from '../slides'

export default slides.define(state => [
    Message('Happiness Index Calculator'),
    slides.navbutton(state, {
        direction: 'right',
        page: StartPage,
        text: 'Start',
        extra: 'Tap here to ...',
    }),
])

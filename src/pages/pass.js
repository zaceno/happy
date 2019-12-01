import Message from '../view/message'
import * as slides from '../slides'
import VotePage from './vote'
import ResultPage from './result'

export default slides.define(state => [
    slides.navbutton(state, {
        direction: 'right',
        page: ResultPage,
        text: 'Check Result',
        extra: 'Has everyone voted? Tap here to...',
    }),
    Message('Thank you! Now, please hand the phone to the next person.'),
    slides.navbutton(state, {
        direction: 'left',
        page: VotePage,
        text: 'Vote',
        extra: 'Are you the next person? Tap here to...',
    }),
])

import Message from '../view/message'
import * as slides from '../slides'
import VotePage from './vote'

export default slides.define(state => [
    Message('Please pass the phone to the first person'),
    slides.navbutton(state, {
        direction: 'right',
        page: VotePage,
        extra: "When you're ready, tap here to...",
        text: 'Vote',
    }),
])

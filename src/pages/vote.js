import PassPage from './pass'
import * as slides from '../slides'
import * as poll from '../poll'
import Message from '../view/message'

export default slides.define(state => [
    Message('How happy are you about your job?'),
    poll.poll(state),
    slides.navbutton(state, {
        direction: 'right',
        page: PassPage,
        onnavigate: poll.commit,
        extra: 'Make your selection, then tap here to...',
        text: 'Cast vote',
    }),
])

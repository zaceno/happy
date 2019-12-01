import Message from '../view/message'
import * as slides from '../slides'
import * as poll from '../poll'
import ResetPage from './reset'

export default slides.define(state => [
    Message(['Happiness index: ', poll.result(state)]),
    slides.navbutton(state, {
        page: ResetPage,
        onnavigate: poll.reset,
        extra: 'Need to do it again? Tap here to...',
        text: 'Reset votes',
    }),
])

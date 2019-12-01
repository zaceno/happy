import Message from '../view/message'
import * as slides from '../slides'
import * as poll from '../poll'
import StartPage from './start'
//import * as Votes from '../votes'

export default slides.define(state => [
    Message(['Votes cleared from memory', poll.result(state)]),
    slides.navbutton(state, {
        direction: 'left',
        page: StartPage,
        extra: 'Tap here to...',
        text: 'Start again',
    }),
])

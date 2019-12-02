import { go, steps } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'
import { result as pollResultView } from '../poll'

export default state =>
    Slide({}, [
        Message(['Votes cleared from memory', pollResultView(state)]),
        NavButton({
            onclick: [go, steps.start],
            extra: 'Tap here to...',
            text: 'Start again',
        }),
    ])

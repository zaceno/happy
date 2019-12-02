import { go, steps } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'
import { result as pollResultView } from '../poll'

export default state =>
    Slide({}, [
        Message(['Happiness index: ', pollResultView(state)]), //, poll.result(state)]),
        NavButton({
            onclick: [go, steps.cleared],
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset votes',
        }),
    ])

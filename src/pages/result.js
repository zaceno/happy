import { go, steps, getCurrent } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'
import { result as pollResultView } from '../poll'

export default (state, transition) =>
    Slide(transition, [
        Message(['Happiness index: ', pollResultView(state)]),
        NavButton({
            onclick: [go, steps.cleared],
            extra: 'Need to do it again? Tap here to...',
            text: 'Reset votes',
            active: getCurrent(state) === steps.cleared,
        }),
    ])

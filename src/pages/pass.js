import { go, steps, getCurrent } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'

export default (state, transition) =>
    Slide(transition, [
        NavButton({
            onclick: [go, steps.result],
            extra: 'Has everyone voted? Tap here to...',
            text: 'Check Result',
            active: getCurrent(state) === steps.result,
        }),
        Message('Thank you! Now, please hand the phone to the next person.'),
        NavButton({
            onclick: [go, steps.vote],
            extra: 'Are you the next person? Tap here to...',
            text: 'Vote',
            active: getCurrent(state) === steps.vote,
        }),
    ])

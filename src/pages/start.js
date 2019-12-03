import { go, steps } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'

export default (state, transition) =>
    Slide(transition, [
        Message('Please pass the phone to the first person'),
        NavButton({
            onclick: [go, steps.vote],
            extra: "When you're ready, tap here to...",
            text: 'Vote',
            active: transition.exiting,
        }),
    ])

import { go, steps, getCurrent } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'

export default (state, transition) =>
    Slide(transition, [
        Message('Happiness Index Calculator'),
        NavButton({
            onclick: [go, steps.start],
            extra: 'Tap here to ...',
            text: 'Start',
            active: getCurrent(state) === steps.start,
        }),
    ])

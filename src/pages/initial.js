import { go, steps } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'

export default (state, slideProps) =>
    Slide(slideProps, [
        Message('Happiness Index Calculator'),
        NavButton({
            onclick: [go, steps.start],
            extra: 'Tap here to ...',
            text: 'Start',
        }),
    ])

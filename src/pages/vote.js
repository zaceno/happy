import { go, steps, getCurrent } from '../model/main'
import Message from '../view/message'
import Slide from '../view/slide'
import NavButton from '../view/navbutton'
import { poll as pollSelectView } from '../poll'

export default (state, transition) =>
    Slide(transition, [
        Message('How happy are you about your job?'),
        pollSelectView(state),
        NavButton({
            onclick: [go, steps.pass],
            extra: 'Make your selection, then tap here to...',
            text: 'Cast vote',
            active: getCurrent(state) === steps.pass,
        }),
    ])

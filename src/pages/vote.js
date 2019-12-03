import { go, steps, getCurrent, mapPoll, getPoll } from '../model/main'
import Message from '../view/message'
import NavButton from '../view/navbutton'
import { poll as Poll } from '../poll'

export default state => [
    Message('How happy are you about your job?'),
    mapPoll(Poll(getPoll(state))),
    NavButton({
        onclick: [go, steps.pass],
        extra: 'Make your selection, then tap here to...',
        text: 'Cast vote',
        active: getCurrent(state) === steps.pass,
    }),
]

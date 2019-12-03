import * as model from '../model/main'
import Message from '../view/message'
import NavButton from '../view/navbutton'
import { result as PollResult } from '../poll'

export default state => [
    Message([
        'Votes cleared from memory',
        model.mapPoll(PollResult(model.getPoll(state))),
    ]),
    NavButton({
        onclick: [model.go, model.steps.start],
        extra: 'Tap here to...',
        text: 'Start again',
        active: model.getCurrent(state) === model.steps.start,
    }),
]

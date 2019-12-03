import * as model from '../model/main'
import Message from '../view/message'
import NavButton from '../view/navbutton'
import { result as PollResult } from '../poll'

export default state => [
    Message([
        'Happiness index: ',
        model.mapPoll(PollResult(model.getPoll(state))),
    ]),
    NavButton({
        onclick: [model.go, model.steps.cleared],
        extra: 'Need to do it again? Tap here to...',
        text: 'Reset votes',
        active: model.getCurrent(state) === model.steps.cleared,
    }),
]

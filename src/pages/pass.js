import * as model from '../model/main'
import Message from '../view/message'
import NavButton from '../view/navbutton'

export default state => [
    NavButton({
        onclick: [model.go, model.steps.result],
        extra: 'Has everyone voted? Tap here to...',
        text: 'Check Result',
        active: model.getCurrent(state) === model.steps.result,
    }),
    Message('Thank you! Now, please hand the phone to the next person.'),
    NavButton({
        onclick: [model.go, model.steps.vote],
        extra: 'Are you the next person? Tap here to...',
        text: 'Vote',
        active: model.getCurrent(state) === model.steps.vote,
    }),
]

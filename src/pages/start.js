import * as model from '../model/main'
import Message from '../view/message'
import NavButton from '../view/navbutton'

export default state => [
    Message('Please pass the phone to the first person'),
    NavButton({
        onclick: [model.go, model.steps.vote],
        extra: "When you're ready, tap here to...",
        text: 'Vote',
        active: model.getCurrent(state) === model.steps.vote,
    }),
]

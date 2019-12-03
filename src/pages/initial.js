import * as model from '../model/main'
import Message from '../view/message'
import NavButton from '../view/navbutton'

export default state => [
    Message('Happiness Index Calculator'),
    NavButton({
        onclick: [model.go, model.steps.start],
        extra: 'Tap here to ...',
        text: 'Start',
        active: model.getCurrent(state) === model.steps.start,
    }),
]

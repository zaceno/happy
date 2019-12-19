import { makeMap } from 'hyperapp-map'
import * as screens from './screens'
import * as poll from './poll'

//effect which dispatches another action immediately
const dispatch = (f => a => [f, { a }])((d, { a }) => a && d(a))

const init = pages => ({
    screens: screens.init('init'),
    poll: poll.init,
})

const pollGet = state => state.poll
const pollMap = makeMap(pollGet, (state, poll) => ({ ...state, poll }))

const screenGet = state => state.screens
const screenMap = makeMap(screenGet, (state, screenState) => [
    {
        ...state,
        screens: screenState,
    },

    screens.getLeaving(screenState) === 'vote' &&
        dispatch(pollMap(poll.commit)),

    screens.getEntering(screenState) === 'cleared' &&
        dispatch(pollMap(poll.reset)),
])

export { init, screenGet, screenMap, pollGet, pollMap }

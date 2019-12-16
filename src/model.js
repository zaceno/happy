import { h } from 'hyperapp'
import { make as makeMap } from './map'
import { init as navInit, getLeaving, getEntering } from './nav'
import {
    init as pollInit,
    commit as pollCommit,
    reset as pollReset,
} from './poll'
//effect which dispatches another action immediately
const dispatch = (f => a => [f, { a }])((d, { a }) => a && d(a))

export const init = page => ({
    nav: navInit(page),
    poll: pollInit,
})

export const pollGet = state => state.poll
export const pollMap = makeMap(pollGet, (state, poll) => ({ ...state, poll }))

export const navGet = state => state.nav
export const navMap = makeMap(navGet, (state, navState) => [
    { ...state, nav: navState },
    getLeaving(navState) === 'vote' && dispatch(pollMap(pollCommit)),
    getEntering(navState) === 'cleared' && dispatch(pollMap(pollReset)),
])

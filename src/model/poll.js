/*
state management for a poll
*/
export const init = { votes: 0, total: 0, current: 0 }
export const select = ({ votes, total }, current) => ({ votes, total, current })
export const commit = ({ votes, total, current }) => ({
    votes: current > 0 ? votes + 1 : votes,
    total: current > 0 ? total + current : total,
    current: 0,
})
export const reset = _ => ({ ...init })
export const current = ({ current }) => current
export const average = ({ votes, total }) =>
    votes ? Math.round((10 * total) / votes) / 10 : 0

export const reset = (_, page) => ({ page, mode: 'idle' })
export const start = (state, { page, direction }) => ({
    mode: 'start',
    prev: state.page,
    page,
    direction,
})
export const run = state => ({ ...state, mode: 'run' })
export const finish = state => ({ ...state, mode: 'idle' })

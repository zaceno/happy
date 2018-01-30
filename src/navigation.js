export const state = {
    current: 'initial',
    direction: null,
}

export const actions = {
    goTo: ([current, direction]) => ({current, direction})
}

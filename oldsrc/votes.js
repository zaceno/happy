export const state = {
    current: 0,
    sum: 0,
    count: 0,
}

export const actions = {

    set: vote => ({current: vote}),

    commit: _ => ({current, sum, count}) => {
        if (current === 0) return
        return {
            sum: sum + current,
            count: count + 1,
            current: 0
        }
    },

    reset: _ => ({
        sum: 0,
        count: 0,
        current: 0
    })

}

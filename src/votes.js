export default {

    state: {
        current: 0,
        sum: 0,
        count: 0,
    },

    actions: {

        set: (state, actions, vote) => ({current: vote}),

        commit: ({current, sum, count}) => {
            if (current === 0) return
            return {
                sum: sum + current,
                count: count + 1,
                current: 0
            }
        },

        reset: _ =>  ({
            sum: 0,
            count: 0,
            current: 0
        })
    }
}

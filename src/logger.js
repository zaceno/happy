let lock = false
export default dispatch => (...args) => {
    if (lock) return dispatch(...args)
    lock = true
    const ret = dispatch(...args)
    let action = args[0]
    if (Array.isArray(action)) action = action[0]
    if (typeof action !== 'function') action = '_'
    else action = action.name
    console.log(action, ret)
    lock = false
    return ret
}

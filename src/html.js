import { h } from 'hyperapp'
export default new Proxy(
    {},
    {
        get(cache, name) {
            if (!cache[name]) {
                cache[name] = (...args) => {
                    if (
                        args[0] &&
                        typeof args[0] === 'object' &&
                        !Array.isArray(args[0])
                    )
                        return h(name, ...args)
                    return h(name, {}, ...args)
                }
            }
            return cache[name]
        },
    }
)

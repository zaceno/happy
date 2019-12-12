const isFunc = x => typeof x === 'function'

const isAction = action =>
    isFunc(action) || (Array.isArray(action) && isAction(action[0]))

const deepMap = (map, action) =>
    isFunc(action) ? map(action) : [deepMap(map, action[0]), action[1]]

const getResult = (action, state, payload) =>
    isFunc(action)
        ? getResult(action(state, payload), state)
        : !Array.isArray(action)
        ? [action]
        : isAction(action)
        ? getResult(
              action[0],
              state,
              isFunc(action[1]) ? action[1](payload) : action[1]
          )
        : action

const makeActionMap = (extract, merge) => {
    let rawMap = actionFn => (
        state,
        data,
        subResult = getResult(actionFn, extract(state), data),
        fullResult = getResult(merge, state, subResult[0])
    ) => [
        fullResult[0],
        ...mapEffects(actualMap, subResult.slice(1)),
        ...fullResult.slice(1),
    ]

    let memoizedMap = actionFn => {
        let mappedAction = memoizedMap.memo.get(actionFn)
        if (!mappedAction) {
            mappedAction = rawMap(actionFn)
            memoizedMap.memo.set(actionFn, mappedAction)
        }
        return mappedAction
    }
    memoizedMap.memo = new Map()
    let actualMap = actionStack => deepMap(memoizedMap, actionStack)
    return actualMap
}

const mapObj = (map, obj) =>
    Object.entries(obj)
        .map(([k, v]) => [
            k,
            isAction(v) ? (v._x ? ((v._x = false), v) : map(v)) : v,
        ])
        .reduce((o, [k, v]) => ((o[k] = v), o), {})

const mapEffects = (map, effects) =>
    effects.map(([fn, opt]) => [fn, mapObj(map, opt)])

const mapVNode = (map, vnode) =>
    !vnode
        ? vnode
        : Array.isArray(vnode)
        ? vnode.map(child => mapVNode(map, child))
        : vnode.props
        ? {
              ...vnode,
              props: mapObj(map, vnode.props),
              children: mapVNode(map, vnode.children),
          }
        : vnode

export const make = makeActionMap
export const view = mapVNode
export const pass = vnode =>
    mapVNode(action => ((action._x = true), action), vnode)
export const fx = mapEffects

// export default (extract, merge, map = makeActionMap(extract, merge)) => x =>
//     isFunc(x)
//         ? map(x)
//         : Array.isArray(x)
//         ? mapEffects(map, x)
//         : mapVNode(map, x)

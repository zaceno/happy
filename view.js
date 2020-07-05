export default  (map, view, state, props, content, slice) => {
    map(x => (slice = x))(state)
    return view(slice, (action, ...args) => (_, data) => [action, {data, args, map}], props, content)
}

export default ((f) => (a) => [f, { a }])((d, { a }) =>
    requestAnimationFrame((_) => d(a))
)
import html from '../util/html'

export default ({ state, mode, page, direction, prev }) => {
    return html.main(
        { class: 'container' },
        mode == 'idle'
            ? page({ state })
            : [
                  prev({
                      state,
                      [direction]: true,
                      exit: true,
                      run: mode === 'run',
                  }),
                  page({
                      state,
                      [direction]: true,
                      enter: true,
                      run: mode === 'run',
                  }),
              ]
    )
}

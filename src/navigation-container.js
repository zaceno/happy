import html from './html'
export default props => {
    console.log('MAIN', props)
    return html.main(
        { class: 'container' },
        props.navigation.mode == 'idle'
            ? props.navigation.page({ ...props })
            : [
                  props.navigation.prev({
                      ...props,
                      [props.navigation.direction]: true,
                      exit: true,
                      run: props.navigation.mode === 'run',
                  }),
                  props.navigation.page({
                      ...props,
                      [props.navigation.direction]: true,
                      enter: true,
                      run: props.navigation.mode === 'run',
                  }),
              ]
    )
}

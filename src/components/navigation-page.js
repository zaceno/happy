import html from '../util/html'

export default (props, children) =>
    html.section(
        {
            class: {
                page: true,
                exit: props.exit,
                enter: props.enter,
                run: props.run,
                left: props.left,
                right: props.right,
            },
            ontransitionend: props.ontransitionend,
        },
        children
    )

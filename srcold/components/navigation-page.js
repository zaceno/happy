import html from '../util/html'

export default (props, children) =>
    html.section(
        {
            class: {
                navPage: true,
                exit: props.exiting,
                enter: props.entering,
                run: props.running,
                left: props.direction === 'left',
                right: props.direction === 'right',
            },
            ontransitionend: props.ontransitionend,
        },
        children
    )

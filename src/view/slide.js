import { h } from 'hyperapp'
export default (props, content) =>
    h(
        'section',
        {
            class: {
                navPage: true,
                exit: props.exiting,
                enter: props.entering,
                run: props.running,
                left: props.left,
                right: props.right,
            },
            ontransitionend: props.ontransitionend,
        },
        content
    )

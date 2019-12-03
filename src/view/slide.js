import { h } from 'hyperapp'

export default ({ exiting, onend, entering, transition, running }, content) =>
    h(
        'section',
        {
            class: {
                navPage: true,
                [transition + '-enter']: entering,
                [transition + '-exit']: exiting,
                [transition + '-run']: running,
            },
            ontransitionend: onend,
        },
        content
    )

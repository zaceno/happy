import { h } from 'hyperapp'

export default (
    { ontransitionend, transitionName, isExiting, isEntering, isRunning },
    content
) =>
    h(
        'section',
        {
            class: [
                'navPage',
                {
                    [transitionName + '-enter']: isEntering,
                    [transitionName + '-exit']: isExiting,
                    [transitionName + '-run']: isRunning,
                },
            ],
            ontransitionend,
        },
        content
    )

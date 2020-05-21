import html from 'hyperlit'
import css from './style.css'
import * as faces from './faces'

export default (
    { value, select },
    _,
    optProps = x => ({
        ontouchstart: [select, x],
        onmousedown: [select, x],
        class: { [css.selected]: value === x },
    })
) => html`
    <ul class=${css.selector}>
        <li ${optProps(0)}>
            <${faces.None} />
            <p class=${css.label}>No Vote</p>
            <p class=${css.extra}>I don't want to participate</p>
        </li>
        <li ${optProps(5)}>
            <${faces.VeryHappy} />
            <p class=${css.label}>Very Happy</p>
            <p class=${css.extra}>It should always be this way!</p>
        </li>
        <li ${optProps(4)}>
            <${faces.Happy} />
            <p class=${css.label}>Happy</p>
            <p class=${css.extra}>It can always get better!</p>
        </li>
        <li ${optProps(3)}>
            <${faces.Meh} />
            <p class=${css.label}>Don't know</p>
            <p class=${css.extra}>Meh... / Mixed feelings</p>
        </li>
        <li ${optProps(2)}>
            <${faces.Unhappy} />
            <p class=${css.label}>Unhappy</p>
            <p class=${css.extra}>A lot needs to change!</p>
        </li>
        <li ${optProps(1)}>
            <${faces.VeryHappy} />
            <p class=${css.label}>Very Unhappy</p>
            <p class=${css.extra}>Why even bother...</p>
        </li>
    </ul>`


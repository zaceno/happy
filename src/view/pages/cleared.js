import html from 'hyperlit'
import { NavButton, Page, PollResult, Panel } from '../common'

export default state => html`
    <${Page}>
        <${Panel}>
            Votes cleared from memory!
            <${PollResult} state=${state} />
        <//>
        <${NavButton}
            state=${state}
            to="start"
            direction="left"
            extra="Tap here to..."
            label="Start Again"
        />
    <//>`

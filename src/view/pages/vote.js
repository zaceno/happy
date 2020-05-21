import html from 'hyperlit'
import { NavButton, Page, Panel, PollSelector } from '../common'
export default state => html`
    <${Page}>
        <${Panel}>How happy are you about your job?<//>
        <${PollSelector} state=${state} />
        <${NavButton}
            state=${state}
            to="pass"
            direction="right"
            extra="Make your selection, then tap here to..."
            label="Cast Vote"
        />
    <//>`

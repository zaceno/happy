import html from 'hyperlit'
import { NavButton, Page, PollResult, Panel } from '../common'

export default state => html`
    <${Page}>
        <${Panel}>
            Happiness Index:
            <${PollResult} state=${state} />
        <//>
        <${NavButton}
            state=${state}
            to="cleared"
            direction="right"
            extra="Need to do it again? Tap here to..."
            label="Reset Votes"
        />
    <//>`

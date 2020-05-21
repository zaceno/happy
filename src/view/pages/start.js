import html from 'hyperlit'
import { NavButton, Page, Panel } from '../common'

export default state => html`
    <${Page}>
        <${Panel}>Please pass the phone to the first person<//>
        <${NavButton}
            state=${state}
            to="vote"
            direction="right"
            extra="When you're ready, tap here to..."
            label="Vote"
        />
    <//>`


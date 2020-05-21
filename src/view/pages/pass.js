import html from 'hyperlit'
import { NavButton, Page, Panel } from '../common'

export default state => html`
    <${Page}>
        <${NavButton}
            state=${state}
            to="result"
            direction="right"
            extra="Has everyone voted? Tap here to..."
            label="Check Result"
        />
        <${Panel}>Thank you! Now, please hand the phone to the next person<//>
        <${NavButton}
            state=${state}
            to="vote"
            direction="left"
            extra="Are you the next person? Tap here to..."
            label="Vote"
        />
    <//>`



import { h } from 'hyperapp'
import { NavButton, Page, Panel } from '../main'

export default state => (
    <Page>
        <NavButton
            state={state}
            to="result"
            direction="right"
            extra="Has everyone voted? Tap here to..."
            label="Check Result"
        />
        <Panel>Thank you! Now, please hand the phone to the next person</Panel>
        <NavButton
            state={state}
            to="vote"
            direction="left"
            extra="Are you the next person? Tap here to..."
            label="Vote"
        />
    </Page>
)

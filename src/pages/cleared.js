import { h } from 'hyperapp'
import { NavButton, Page, PollResult, Panel } from '../main'

export default state => (
    <Page>
        <Panel>
            Votes cleared from memory!
            <PollResult state={state} />
        </Panel>
        <NavButton
            state={state}
            to="vote"
            direction="left"
            extra="Tap here to..."
            label="Start Again"
        />
    </Page>
)

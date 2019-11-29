import { h } from 'hyperapp'
import { NavButton, Page, PollResult, Panel } from '../common'

export default state => (
    <Page>
        <Panel>
            Votes cleared from memory!
            <PollResult state={state} />
        </Panel>
        <NavButton
            state={state}
            to="start"
            direction="left"
            extra="Tap here to..."
            label="Start Again"
        />
    </Page>
)

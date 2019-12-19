import { h } from 'hyperapp'
import { NavButton, Page, Panel, PollResult } from '../widgets'

export default state => (
    <Page>
        <Panel>
            Happiness Index:
            <PollResult state={state} />
        </Panel>
        <NavButton
            state={state}
            to="cleared"
            direction="right"
            extra="Need to do it again? Tap here to..."
            label="Reset Votes"
        />
    </Page>
)

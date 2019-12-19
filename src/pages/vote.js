import { h } from 'hyperapp'
import { NavButton, Page, Panel, PollSelector } from '../widgets'
export default state => (
    <Page>
        <Panel>How happy are you about your job?</Panel>
        <PollSelector state={state} />
        <NavButton
            state={state}
            to="pass"
            direction="right"
            extra="Make your selection, then tap here to..."
            label="Cast Vote"
        />
    </Page>
)

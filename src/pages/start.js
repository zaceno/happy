import { h } from 'hyperapp'
import { NavButton, Page, Panel } from '../main'

export default state => (
    <Page>
        <Panel>Please pass the phone to the first person</Panel>
        <NavButton
            state={state}
            to="vote"
            direction="right"
            extra="When you're ready, tap here to..."
            label="Vote"
        />
    </Page>
)

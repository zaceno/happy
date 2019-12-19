import { h } from 'hyperapp'
import { NavButton, Page, Panel } from '../widgets'

export default state => (
    <Page>
        <Panel>Happiness Index Calculator</Panel>
        <NavButton
            state={state}
            to="start"
            direction="right"
            extra="Tap here to..."
            label="Start"
        />
    </Page>
)

import html from 'hyperlit'
import { NavButton, Page, Panel } from '../common'

export default state => html`
    <${Page}>
        <${Panel}>Happiness Index Calculator<//>
        <${NavButton}
            state=${state}
            to="start"
            direction="right"
            extra="Tap here to..."
            label="Start"
        />
    <//>`



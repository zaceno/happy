import { h } from 'hyperapp'
const NavPage = ({}, content) => content
import { view as mapView } from '../map'
import { navMap, navGet, pollMap, pollGet } from '../model'
import { selector as PollSelector } from '../poll'
import { button as NavButton } from '../nav'

export default state => (
    <NavPage state={state}>
        <div class="message">How happy are you about your job?</div>
        {mapView(pollMap, <PollSelector state={pollGet(state)} />)}
        {mapView(
            navMap,
            <NavButton
                state={navGet(state)}
                to="pass"
                direction="right"
                extra="Make your selection, then tap here to..."
                label="Cast Vote"
            />
        )}
    </NavPage>
)

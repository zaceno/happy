import { h } from 'hyperapp'
import { view as mapView } from '../map'
import { navMap, navGet, pollGet, pollMap } from '../model'
import { button as NavButton } from '../nav'
import { result as PollResult } from '../poll'
const NavPage = ({}, content) => content

export default state => (
    <NavPage state={state}>
        <div class="message">
            Votes cleared from memory!
            <p class="happinessResult">
                {mapView(pollMap, <PollResult state={pollGet(state)} />)}
            </p>
        </div>
        {mapView(
            navMap,
            <NavButton
                state={navGet(state)}
                to="vote"
                direction="left"
                extra="Tap here to..."
                label="Start Again"
            />
        )}
    </NavPage>
)

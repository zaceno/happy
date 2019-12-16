import { h } from 'hyperapp'
const NavPage = ({}, content) => content
import { view as mapView } from '../map'
import { navMap, navGet, pollGet, pollMap } from '../model'
import { result as PollResult } from '../poll'
import { button as NavButton } from '../nav'

export default state => (
    <NavPage state={state}>
        <div class="message">
            Happiness Index:
            <p class="happinessResult">
                {mapView(pollMap, <PollResult state={pollGet(state)} />)}
            </p>
        </div>
        {mapView(
            navMap,
            <NavButton
                state={navGet(state)}
                to="cleared"
                direction="right"
                extra="Need to do it again? Tap here to..."
                label="Reset Votes"
            />
        )}
    </NavPage>
)

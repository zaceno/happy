import { h } from 'hyperapp'
import { view as mapView } from '../map'
import { navMap, navGet } from '../model'
import { button as NavButton } from '../nav'
const NavPage = ({}, content) => content

export default state => (
    <NavPage state={state}>
        {mapView(
            navMap,
            <NavButton
                state={navGet(state)}
                to="result"
                direction="right"
                extra="Has everyone voted? Tap here to..."
                label="Check Result"
            />
        )}
        <div class="message">
            Thank you! Now, please hand the phone to the next person
        </div>
        {mapView(
            navMap,
            <NavButton
                state={navGet(state)}
                to="vote"
                direction="left"
                extra="Are you the next person? Tap here to..."
                label="Vote"
            />
        )}
    </NavPage>
)

import { h } from 'hyperapp'
import { view as mapView } from '../map'
import { navMap, navGet } from '../model'
import { button as NavButton } from '../nav'
const NavPage = ({}, content) => content

export default state => (
    <NavPage state={state}>
        <div class="message">Please pass the phone to the first person</div>
        {mapView(
            navMap,
            <NavButton
                state={navGet(state)}
                to="vote"
                direction="right"
                extra="When you're ready, tap here to..."
                label="Vote"
            />
        )}
    </NavPage>
)

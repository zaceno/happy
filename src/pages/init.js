import { h } from 'hyperapp'
import { view as mapView } from '../map'
import { navMap, navGet } from '../model'
import { button as NavButton } from '../nav'
const NavPage = ({}, content) => content

export default state => (
    <NavPage state={state}>
        <div class="message">Happiness Index Calculator</div>
        {mapView(
            navMap,
            <NavButton
                state={navGet(state)}
                to="start"
                direction="right"
                extra="Tap here to..."
                label="Start"
            />
        )}
    </NavPage>
)

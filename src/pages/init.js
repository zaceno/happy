import * as flow from '../flow'

export default state => (
    <flow.page>
        <div class="message">Happiness Index Calculator</div>
        <flow.button
            state={state}
            to="start"
            direction="right"
            extra="Tap here to..."
            label="Start"
        />
    </flow.page>
)

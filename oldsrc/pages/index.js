import initial from './initial'
import start   from './start'
import vote    from './vote'
import pass    from './pass'
import result  from './result'
import reset   from './reset'

const pages = {initial, start, vote, pass, result, reset}
export default ({votes, navigation}) => pages[navigation.state.current]({votes, navigation})
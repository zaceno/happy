import { Init as NavInit } from './navigation-actions'
import { Init as HappinessInit } from './happiness-selector-actions'
import { Init as TallyInit } from './tally-actions'

export const Init = (_, initialPage) => {
    console.log('CALLED INIT')
    let s = {}
    console.log('S', s)
    s = HappinessInit(s)
    console.log('S', s)
    s = TallyInit(s)
    console.log('S', s)
    s = NavInit(s, initialPage)
    console.log('S', s)
    return s
}
//NavInit(TallyInit(HappinessInit({})), initialPage)

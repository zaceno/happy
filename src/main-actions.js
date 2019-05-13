import { Init as NavInit } from './navigation-actions'
import { Init as HappinessInit } from './happiness-selector'
import { Init as TallyInit } from './tally-actions'

export const Init = (_, initialPage) =>
    NavInit(TallyInit(HappinessInit({})), initialPage)
//NavInit(TallyInit(HappinessInit({})), initialPage)

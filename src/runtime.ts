import { foo } from './external1'
import { initDev } from './dev'

initDev()

export * from './external1'

export const compile = () => foo

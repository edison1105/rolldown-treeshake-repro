import { initFeatureFlags } from './featureFlags'

export function createApp() {
  initFeatureFlags()
  return { mount() {} }
}

let initialized = false

export function initFeatureFlags() {
  if (initialized) return

  // These conditions are always false after define replacement
  // so the entire body should be eliminated
  if (typeof __FEATURE_A__ !== 'boolean') {
    console.log('feature A not defined')
  }

  if (typeof __FEATURE_B__ !== 'boolean') {
    console.log('feature B not defined')
  }

  initialized = true
}

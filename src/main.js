// Minimal reproduction: circular dependency tree-shaking issue

// This function should be tree-shaken (only used by circular chain)
function unused() {
  return 'should be removed'
}

// Circular: publicPropertiesMap -> getPublicInstance -> getComponentPublicInstance -> publicPropertiesMap
const getPublicInstance = (i) => {
  if (!i) return null
  return getComponentPublicInstance(i)
}

const publicPropertiesMap = /*@__PURE__*/ Object.assign(Object.create(null), {
  $parent: (i) => getPublicInstance(i.parent),
  $unused: () => unused(),
})

function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return new Proxy(instance.exposed, {
      get(target, key) {
        if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance)
        }
      },
    })
  }
}

function getExposed(instance) {
  if (instance.exposed) {
    return new Proxy(instance.exposed, {
      get: (target, key) => target[key],
    })
  }
}

export function createVaporApp() {
  return getExposed({})
}

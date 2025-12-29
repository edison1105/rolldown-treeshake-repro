let flag = false

function unused(n) {
  if (!n) return null
  return unused(n - 1)
}

function caller(node) {
  unused(node)
}

export class Foo {
  init() {
    flag = false
  }
}

let anchor

export function main() {
  if (flag && anchor !== void 0) {
    caller(anchor)
  }
}

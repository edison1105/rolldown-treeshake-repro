# Rolldown: Unused `@__NO_SIDE_EFFECTS__` Functions Not Tree-Shaken


## Reproduction

```bash
pnpm install
pnpm build
```

## Expected Output (Rollup behavior)

Only `_child` and `child` should be kept since they are the only ones used:

```js
function _child(node) {
  return node.firstChild;
}

const child = (...args) => {
  return child.impl(...args);
};
child.impl = _child;

function main() {
  return child(document.body);
}

export { main };
```

## Actual Output (Rolldown)

All functions are kept, including unused `_txt`, `txt`, `_nthChild`, `nthChild`, `_next`, `next`:

```js
const _txt = _child;
/* @__NO_SIDE_EFFECTS__ */
function _child(node) {
  return node.firstChild;
}
/* @__NO_SIDE_EFFECTS__ */
function _nthChild(node, i) {
  return node.childNodes[i];
}
/* @__NO_SIDE_EFFECTS__ */
function _next(node) {
  return node.nextSibling;
}
const txt = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return txt.impl(...args);
};
txt.impl = _txt;
const child = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return child.impl(...args);
};
child.impl = _child;
const next = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return next.impl(...args);
};
next.impl = _next;
const nthChild = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return nthChild.impl(...args);
};
nthChild.impl = _nthChild;

function main() {
  return child(document.body);
}

export { main };
```


# Rolldown: Unused Runtime Helpers Not Tree-Shaken

## Issue

When bundling modules with nested `export *` from external modules, rolldown injects runtime helpers (`__defProp`, `__getOwnPropDesc`, `__getOwnPropNames`, `__hasOwnProp`, `__exportAll`, `__copyProps`, `__reExport`) into the output, but these helpers are **completely unused** and should be tree-shaken away.

## Reproduction

```bash
pnpm install
pnpm build
```
see dist/bundle.js

## Expected Output

```js
import { baz, foo } from "./external1";

export * from "./external1";

export * from "./external2";

function initDev() {
  console.log(baz);
}

initDev();
const compile = () => foo;

export { compile };
```

## Actual Output

```js
import { baz, foo } from "./external1";

export * from "./external1";

export * from "./external2";

//#region rolldown:runtime
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, symbols) => {
  let target = {};
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
    });
  }
  if (symbols) {
    __defProp(target, Symbol.toStringTag, { value: "Module" });
  }
  return target;
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (
      var keys = __getOwnPropNames(from), i = 0, n = keys.length, key;
      i < n;
      i++
    ) {
      key = keys[i];
      if (!__hasOwnProp.call(to, key) && key !== except) {
        __defProp(to, key, {
          get: ((k) => from[k]).bind(null, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
      }
    }
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (
  __copyProps(target, mod, "default"),
  secondTarget && __copyProps(secondTarget, mod, "default")
);

//#endregion
function initDev() {
  console.log(baz);
}

initDev();
const compile = () => foo;

export { compile };
```

## Problem

The entire `rolldown:runtime` block (~1KB) is dead code:

- `__exportAll` - declared but never called
- `__copyProps` - declared but never called
- `__reExport` - declared but never called
- `__defProp`, `__getOwnPropDesc`, `__getOwnPropNames`, `__hasOwnProp` - only used by the above unused functions

These should all be tree-shaken since they have no side effects and are never referenced.

## Context

This was discovered in the Vue.js build output (`vue.runtime.esm-bundler.js`). The pattern is:

- Entry: `export * from './runtime'` + `export * from '@vue/runtime-vapor'`
- Runtime: `export * from '@vue/runtime-dom'` + local exports

The rolldown runtime helpers add ~1KB of dead code to the bundle.

## Environment

- rolldown: 1.0.0-beta.57

# Rolldown: Function Without Side Effects Not Tree-Shaken


## Reproduction

```bash
pnpm install
pnpm build
```

see dist/rolldown.js and dist/rollup.js for differences

## Expected Output

```js
function createApp() {
  return { mount() {} }
}

export { createApp };
```

## Actual Output

```js
let initialized = false;
function initFeatureFlags() {
  if (initialized) return;
  initialized = true;
}

function createApp() {
  initFeatureFlags();
  return { mount() {} };
}

export { createApp };
```
# Rolldown: Unused Function Not Tree-Shaken

## Reproduction

```bash
pnpm install
pnpm build
```


## Expected Output

```js
function main() {}
export { main };
```

## Actual Output

```js
function unused(n) {
  if (!n) return null;
  return unused(n - 1);
}
function main() {}
export { main };
```

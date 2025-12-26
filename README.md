# Rolldown vs Rollup: Circular Dependency Tree-shaking

## Problem

Rolldown fails to tree-shake unused circular dependency chains.

## Reproduce

```bash
pnpm install
pnpm build
```
see dist/rolldown.js and dist/rollup.js for differences


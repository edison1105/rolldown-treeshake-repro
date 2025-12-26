# Rolldown vs Rollup: Circular Dependency Tree-shaking

## Problem

Rolldown fails to tree-shake unused circular dependency chains.

## Reproduce

```bash
pnpm install
pnpm build
```
see dist/rolldown/index.js and dist/rollup/index.js for differences


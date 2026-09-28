# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# My Money (ugbook)

Daily accounting app for small businesses in Uganda. Expo SDK 57 / RN 0.86 / TypeScript.

## Commands

- `npm start` — start Expo dev server
- `npm run android` — start + open on Android (native dev build required; WatermelonDB is not in Expo Go)
- `npm test` — run Jest (pure-logic tests; co-locate `.test.ts` next to source, NOT in `__tests__/`)
- `npm run typecheck` — `tsc --noEmit`
- `npx expo export --platform android` — verify the Metro bundle graph compiles

## Conventions

- WatermelonDB: legacy decorators (`@field`, `@text`, etc.) — keep `experimentalDecorators: true` and `useDefineForClassFields: false` in tsconfig.
- Never name a model property `syncStatus` with a custom union type — it collides with WatermelonDB's built-in `SyncStatus`.
- Store UGX as integer (no decimals). Use `src/utils/format.ts` for all currency/date formatting.
- Keep screen components in `src/screens`, shared components in `src/components`, pure logic in `src/utils`.
- Tax bands are config-driven, not hardcoded.
- Do NOT put tests in `__tests__/` subdirectories — the jest-expo resolver can't resolve `../` relative imports from there.
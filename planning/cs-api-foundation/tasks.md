# Tasks: CryptoSharia API Foundation (Profile)

## Allowed Files

- `AGENTS.md`
- `.env.example`
- `.opencode/package.json`
- `package.json`
- `package-lock.json`
- `src/lib/api/cs-api.ts`
- `src/lib/api/cs-api.server.ts`
- `src/lib/api/cs-api-types.ts`

## Constraints

- Follow `cryptosharia-api-integration` skill naming and placement.
- Do not add custom script names; use `gen:api-types:preview` and `gen:api-types:prod`.
- Do not introduce UI wiring or real data loads in this phase.
- Do not expose `CS_API_KEY` in any browser-visible code.

## Implementation Checklist

- [x] Update `.env.example` to include `PUBLIC_CS_API_URL` and `CS_API_KEY` (server-only).
- [x] Update `package.json`:
  - [x] Add dependency: `openapi-fetch`
  - [x] Add devDependency: `openapi-typescript`
  - [x] Add scripts:
    - [x] `gen:api-types:preview` -> generate `src/lib/api/cs-api-types.ts` from preview OpenAPI
    - [x] `gen:api-types:prod` -> generate `src/lib/api/cs-api-types.ts` from prod OpenAPI
- [x] Add placeholder `src/lib/api/cs-api-types.ts` (to be overwritten by typegen).
- [x] Add `src/lib/api/cs-api.ts` client factory (public).
- [x] Add `src/lib/api/cs-api.server.ts` client factory (server-only; attaches `Api-Key`).
- [x] Run verification:
  - [x] `npm run check`
  - [x] `npm run lint`
  - [x] `npm run build`

## Escalation Triggers

- Upstream OpenAPI URLs differ from the canonical preview/prod URLs.
- Any requirement emerges to use authenticated/session-bound data.

## Definition of Done

- [x] Acceptance criteria in `planning/cs-api-foundation/spec.md` satisfied
- [x] Verification commands pass
- [x] Deviations documented below

## Execution Log

- 2026-03-11: Plan created.
- 2026-03-11: Updated `.env.example` with `PUBLIC_CS_API_URL` and `CS_API_KEY` docs.
- 2026-03-11: Added `openapi-fetch` and `openapi-typescript`, plus `gen:api-types:*` scripts.
- 2026-03-11: Added `src/lib/api/cs-api.ts`, `src/lib/api/cs-api.server.ts`, `src/lib/api/cs-api-types.ts` placeholder.
- 2026-03-11: Ran `npm install` to update `package-lock.json`.
- 2026-03-11: Ran verification: `npm run check`, `npm run lint`, `npm run build`.
- 2026-03-11: Lint initially failed due to pre-existing Prettier issues in `AGENTS.md` and `.opencode/package.json`; formatted both.

## Final Report

- Files changed: `AGENTS.md`, `.env.example`, `.opencode/package.json`, `package-lock.json`, `package.json`, `planning/cs-api-foundation/spec.md`, `planning/cs-api-foundation/tasks.md`, `src/lib/api/cs-api.server.ts`, `src/lib/api/cs-api-types.ts`, `src/lib/api/cs-api.ts`
- Test/check results:
  - `npm run check`: pass (with `PUBLIC_CS_API_URL` + `CS_API_KEY` set)
  - `npm run lint`: pass
  - `npm run build`: pass (with `PUBLIC_CS_API_URL` + `CS_API_KEY` set)
- Deviations from spec:
  - Formatted `AGENTS.md` and `.opencode/package.json` to satisfy repo-wide Prettier check.

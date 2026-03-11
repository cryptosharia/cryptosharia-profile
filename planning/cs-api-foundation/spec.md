# Spec: CryptoSharia API Foundation (Profile)

## Objective

Add the standard CryptoSharia API integration foundation to this SvelteKit Profile app (type generation scripts + typed client factories + env contract) without wiring any real page data/content yet.

## Scope

- In scope:
  - Add env var documentation for `PUBLIC_CS_API_URL` and `CS_API_KEY`.
  - Add OpenAPI type generation scripts (fixed names) that generate `src/lib/api/cs-api-types.ts`.
  - Add the standard client factories:
    - `createCsApiClient(fetch?)` (public, no API key)
    - `createServerCsApiClient(fetch?)` (server-only, attaches `Api-Key`)
  - Commit a minimal placeholder `src/lib/api/cs-api-types.ts` that will be overwritten by generated types.
- Out of scope:
  - Consuming API data in pages/sections.
  - Adding any BFF routes; when data is integrated later, prefer `+page.server.ts` per page.
  - Auth/session features.

## Architecture Decisions

- Follow `cryptosharia-api-integration` skill procedure verbatim:
  - Script names: `gen:api-types:preview`, `gen:api-types:prod`
  - Output file: `src/lib/api/cs-api-types.ts`
  - Client factories live in `src/lib/api/` and use `openapi-fetch`
- BFF boundary is enforced by placement:
  - Public client is safe in browser-visible code.
  - Server client reads `CS_API_KEY` from `$env/static/private` and must only be imported from server-only surfaces.

## Contracts

### Environment

- `PUBLIC_CS_API_URL` (public)
  - Example: `https://preview.api.cryptosharia.id` (preview)
  - Example: `https://api.cryptosharia.id` (production)
- `CS_API_KEY` (private; server-only)
  - Sent as header `Api-Key: <value>` by the server client.

### Type Generation

- Scripts:
  - `npm run gen:api-types:preview`
  - `npm run gen:api-types:prod`
- Tooling:
  - `openapi-typescript`
- Input:
  - Preview: `https://preview.api.cryptosharia.id/openapi.json`
  - Prod: `https://api.cryptosharia.id/openapi.json`
- Output:
  - `src/lib/api/cs-api-types.ts`

## Behavior Rules

- Browser-visible code must never attach `Api-Key`.
- Only server-only surfaces may import and use `createServerCsApiClient()`:
  - `+page.server.ts`, `+layout.server.ts`, `+server.ts`, `src/lib/server/**`, `*.server.ts`, `*.remote.ts`

## Risks and Mitigations

- Risk: secret leakage via client bundles.
  - Mitigation: keep API key usage strictly in server-only modules and surfaces.
- Risk: typegen drift.
  - Mitigation: regenerate `src/lib/api/cs-api-types.ts` from OpenAPI using the fixed scripts.

## Acceptance Criteria

- `.env.example` documents `PUBLIC_CS_API_URL` and `CS_API_KEY`.
- `package.json` contains:
  - `gen:api-types:preview` and `gen:api-types:prod`
  - `openapi-fetch` dependency and `openapi-typescript` devDependency
- `src/lib/api/cs-api.ts` exports `createCsApiClient(fetch?)` using `openapi-fetch` + `PUBLIC_CS_API_URL`.
- `src/lib/api/cs-api.server.ts` exports `createServerCsApiClient(fetch?)` using `openapi-fetch` + `PUBLIC_CS_API_URL` + `CS_API_KEY` header.
- `src/lib/api/cs-api-types.ts` exists as a minimal placeholder and can be overwritten by running typegen scripts.

## Verification

- `npm run check`
- `npm run lint`
- `npm run build`

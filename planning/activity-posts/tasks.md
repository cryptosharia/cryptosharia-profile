# Tasks: Activity Posts (Published) Integration

## Allowed Files

- `src/routes/(main)/+page.server.ts`
- `src/routes/(main)/_sections/Activities.svelte`
- `src/routes/(main)/activities/+page.svelte`
- `src/routes/(main)/activities/+page.server.ts`
- `src/routes/(main)/activities/[slug]/+page.svelte`
- `src/routes/(main)/activities/[slug]/+page.server.ts`
- `src/lib/utils.ts` (only if needed for shared formatting helpers)
- New files under `src/lib/` for small, UI-safe helpers (e.g. date formatting)

## Constraints

- Keep Activities card UI structure and the current `i === 3` hide logic intact.
- Homepage list fetch must use `limit=4&page=1` and `statuses=published` + `sections=activity`.
- Cards must not show any external link information.
- Do not introduce browser-to-upstream API calls; fetch posts server-side.
- Do not render `content` as raw HTML unless API guarantees sanitization.

## Implementation Checklist

- [x] Add server `load` to `src/routes/(main)/+page.server.ts` to fetch activity posts (`limit=4&page=1`) while keeping existing `actions`.
- [x] Update `src/routes/(main)/_sections/Activities.svelte` to accept API-driven activities and map fields:
  - [ ] image: `coverImage.url` with fallback placeholder on error
  - [ ] date: format `publishedAt` date-only
  - [ ] title: `title`
  - [ ] description: `excerpt`
  - [ ] tags: `tags[].name`
  - [ ] href: `/activities/${slug}`
  - [ ] Keep `i === 3` hide logic unchanged

  - [x] image: `coverImage.url` with fallback placeholder on error
  - [x] date: format `publishedAt` date-only
  - [x] title: `title`
  - [x] description: `excerpt`
  - [x] tags: `tags[].name`
  - [x] href: `/activities/${slug}`
  - [x] Keep `i === 3` hide logic unchanged

- [x] Implement `/activities` list route:
  - [x] `src/routes/(main)/activities/+page.server.ts` fetches published activity posts (pagination via `?page=`; `limit=12`)
  - [x] `src/routes/(main)/activities/+page.svelte` renders the list using the same card pattern
- [x] Implement `/activities/[slug]` detail route:
  - [x] `src/routes/(main)/activities/[slug]/+page.server.ts` fetches `GET /posts/{slug}`
  - [x] `src/routes/(main)/activities/[slug]/+page.svelte` renders title/meta/cover/tags/content
  - [x] If `eventDate` exists, format and display with explicit `WIB` label
  - [x] If `externalLink` is a valid http/https URL, render CTA opening new tab with `rel="noopener noreferrer"`
- [x] Add/adjust small helper(s) for date formatting (date-only and WIB date-time) without introducing client secrets.
- [x] Run verification commands:
  - [x] `npm run check`
  - [x] `npm run lint`
  - [x] `npm run build`

## Escalation Triggers

- API/content contract changes needed (e.g. `content` format requires new sanitizer library).
- More than 2 failed attempts on the same blocker (types, routing, build).

## Definition of Done

- [ ] All acceptance criteria in `planning/activity-posts/spec.md` are satisfied.
- [ ] `npm run check` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] `Execution Log` + `Final Report` filled in.

## Execution Log

- 2026-03-16: Added server load on homepage to fetch 4 published activity posts.
- 2026-03-16: Replaced hardcoded homepage activities with API-driven cards (kept existing 4th-card hide logic).
- 2026-03-16: Implemented `/activities` list page (server fetch, limit=12, `?page=` pagination UI).
- 2026-03-16: Implemented `/activities/[slug]` detail page (eventDate shown with WIB label; externalLink CTA only here).
- 2026-03-16: Added shared date/url helpers and safe activity-card mapping.
- 2026-03-16: Ran `npm run check`, `npm run lint`, `npm run build`.

## Final Report

- Files changed:
  - `src/lib/activities/activity-card.ts`
  - `src/lib/api/cs-api.ts`
  - `src/lib/api/cs-api.server.ts`
  - `src/lib/format/dates.ts`
  - `src/routes/(main)/+page.server.ts`
  - `src/routes/(main)/+page.svelte`
  - `src/routes/(main)/_sections/Activities.svelte`
  - `src/routes/(main)/activities/+page.server.ts`
  - `src/routes/(main)/activities/+page.svelte`
  - `src/routes/(main)/activities/[slug]/+page.server.ts`
  - `src/routes/(main)/activities/[slug]/+page.svelte`
- Verification:
  - `npm run check`: pass
  - `npm run lint`: pass
  - `npm run build`: pass
- Deviations from spec:
  - Post `content` is rendered as plain text (`whitespace-pre-wrap`) to avoid XSS risk until we confirm the upstream content format/sanitization guarantees.

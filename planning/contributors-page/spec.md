# Spec: Contributors Page (Full List)

## Objective

Ship a dedicated `/contributors` page that displays the full contributors list using the same card + detail dialog UI as the homepage contributors section, while keeping the homepage limited to a small featured subset (top ~10).

## Scope

- In scope:
  - Replace `src/routes/(main)/contributors/+page.svelte` placeholder with a real page.
  - Render a full grid of contributor cards; clicking a card opens a single shared dialog showing details (image, name, role, bio, links).
  - Keep homepage contributors section behavior (featured subset + responsive hiding rules) but source data from a shared module.
  - Deduplicate contributor data and (optionally) the list rendering so homepage + page stay visually identical.
- Out of scope:
  - Fetching contributors from GitHub/API, pagination, search, filtering, or admin tooling.
  - Redesigning the existing card styles or dialog component.

## Architecture Decisions

- Centralize contributor data in a shared module (e.g. `src/lib/data/contributors.ts`) so both homepage and `/contributors` use the same source of truth.
- Reuse the existing UI composition patterns:
  - Use a single dialog instance that updates based on `selectedContributor` (as done in `src/routes/(main)/_sections/Contributors.svelte`).
- Prefer extracting a reusable list component (e.g. `src/lib/components/contributors/ContributorsList.svelte`) if it avoids duplicating the card+dialog markup across the homepage section and the `/contributors` page.

## Contracts

### Input

- `ContributorsList` (if created):
  - `contributors: Contributor[]`
  - optional: `limit?: number` (homepage)
  - optional: `variant?: 'home' | 'page'` (controls responsive hiding and section header usage)

### Output

- `/contributors` renders a full list (no responsive hiding) with the same card look.
- Clicking a card opens a dialog with contributor details and link buttons.

### Validation Rules

- Contributor object shape is consistent and typed.
- Links array may be empty; UI must still render without breaking.
- External links open in a new tab (`target="_blank"`) and are safe (avoid injecting raw HTML).

## Behavior Rules

- Homepage section:
  - Shows only a featured subset (default: first 10 items from the shared list, preserving current responsive hide behavior for sm/lg).
  - “Lihat Semua Kontributor” button continues to link to `/contributors`.
- Contributors page:
  - Shows all contributors from the shared list.
  - No breakpoint-based hiding; the grid adapts via columns only.
  - Uses one dialog instance that opens when `selectedContributor` is set and closes by clearing selection.

## Edge Cases

- Contributor missing `bio`: render an empty state or omit the paragraph.
- Contributor missing `links`: render no link buttons.
- Image import missing or invalid: ensure `alt` is set and layout does not collapse.

## Risks and Mitigations

- Risk: UI divergence between homepage and `/contributors` due to duplicated markup.
  Mitigation: Extract shared data + (preferably) shared list component.
- Risk: Future contributor count grows and layout becomes too dense.
  Mitigation: Keep grid responsive; leave room to add pagination/search later (explicitly out of scope).

## Acceptance Criteria

- Visiting `/contributors` shows a complete contributors grid (all items from the shared list).
- Card layout and dialog content match the existing homepage contributors section styling and behavior.
- Homepage contributors section still shows only the featured subset and retains current responsive hiding rules.
- No TypeScript or Svelte check errors introduced by the change.

## Verification

- `npm run check`
- `npm run lint`
- `npm run build`

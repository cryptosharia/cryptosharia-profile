# Tasks: Contributors Page (Full List)

## Allowed Files

- `src/routes/(main)/contributors/+page.svelte`
- `src/routes/(main)/_sections/Contributors.svelte`
- `src/lib/data/contributors.ts` (new)
- `src/lib/components/contributors/ContributorsList.svelte` (new, if needed)

## Constraints

- Preserve existing visual language and card/dialog composition.
- Do not introduce API calls or secrets; keep this page static like the current section.
- Do not change navigation semantics beyond ensuring `/contributors` works.
- Avoid unrelated refactors.

## Implementation Checklist

- [x] Create shared contributor data module exporting a typed list (move data from `src/routes/(main)/_sections/Contributors.svelte`).
- [x] Update homepage contributors section to import from the shared module and keep the featured subset logic (top ~10) + current responsive hiding behavior.
- [x] Implement `/contributors` page using the same cards and single dialog behavior to show full list.
- [x] (Optional but recommended) Extract a reusable `ContributorsList.svelte` used by both homepage and `/contributors` to prevent divergence.
- [x] Run verification commands and fix any check/lint/build issues.

## Escalation Triggers

- Design or content requirements change (e.g., need pagination/search/filtering).
- Contributors data must come from an API/DB (contract/security change).
- More than 2 failed attempts on the same check/lint/build blocker.

## Definition of Done

- [ ] Acceptance criteria in `planning/contributors-page/spec.md` satisfied.
- [ ] `npm run check` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Deviations (if any) documented in Execution Log.

## Execution Log

- 2026-03-12: Plan created.
- 2026-03-12: Implemented shared contributors data + shared list component; wired homepage section to featured subset and `/contributors` page to full list.
- 2026-03-12: Verified `npm run check`, `npm run lint`, `npm run build`.

## Final Report

- Files changed:
  - `src/lib/data/contributors.ts`
  - `src/lib/components/contributors/ContributorsList.svelte`
  - `src/routes/(main)/_sections/Contributors.svelte`
  - `src/routes/(main)/contributors/+page.svelte`
- Check/lint/build results: pass
- Deviations from spec: none

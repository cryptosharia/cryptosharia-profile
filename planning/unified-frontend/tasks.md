# Tasks: Unified CryptoSharia Frontend

Status: **DRAFT — do not execute before explicit approval**

## Allowed Files

Planning phase (current):

- `planning/unified-frontend/spec.md`
- `planning/unified-frontend/tasks.md`
- `planning/unified-frontend/design-system-audit.md`

Implementation phase after approval:

- `package.json`
- `package-lock.json`
- `.env.example`
- `svelte.config.js`
- `vite.config.*`
- `src/app.*`
- `src/hooks.server.ts`
- `src/lib/**`
- `src/routes/**`
- `static/**`
- `tests/**`
- `e2e/**`
- `scripts/**` only for scoped verification/migration tooling
- Generated API types produced from approved OpenAPI

Any edit outside `cryptosharia-profile`/future renamed `cryptosharia-web` requires a separate approved plan. Backend work is tracked in `cryptosharia-api/planning/unified-platform-contract/tasks.md` and remains owned by Daffa.

## Constraints

- Do not change API/data/auth contracts silently.
- Do not implement backend business rules in Svelte pages or browser code.
- Do not expose `CS_API_KEY`, access/refresh tokens, protected media URLs, or provider secrets.
- Do not port Firebase client mutations, email admin allowlists, hardcoded prices, voucher authority, or entitlement writes.
- Do not authorize from role names; consume `permissions[]` and let API enforcement remain authoritative.
- Do not remove or rewrite existing user files unrelated to this plan.
- Do not delete/archive legacy repos or data during migration phases.
- Do not add a new dependency until native/SvelteKit/installed options have been evaluated.
- Do not copy the supplied design-system snippets until the integrity, contrast, semantics, and Svelte contracts listed in `design-system-audit.md` are fixed.
- Preserve existing public URLs with redirects/aliases until analytics and crawl verification prove safe removal.
- Keep each phase reviewable, deployable, and reversible.

## Blocking Handoffs From Daffa

- [ ] Versioned OpenAPI base and response envelope are locked.
- [ ] `GET /v1/auth/me` returns `roles[]` and stable `permissions[]`.
- [ ] Access-token refresh and sign-out contracts are locked.
- [ ] Content taxonomy migration (`section` + `format` + placement) is locked.
- [ ] Academy catalog/curriculum/read contracts are locked.
- [ ] Protected lesson access and progress contracts are locked.
- [ ] Offering/quote/order/payment-proof contracts are locked.
- [ ] Admin Academy CRUD/review/publish contracts are locked.
- [ ] Data migration inventory says which Firebase data is test/discard/migrate.

Frontend foundation and static public migration may proceed after plan approval. Any phase that depends on an unchecked handoff above must remain fixture-only and must not ship a fake production business rule.

## Implementation Checklist

### Phase 0 — Lock Architecture and Baseline

- [ ] Obtain explicit approval for `spec.md` and this task list.
- [ ] Confirm `cryptosharia-profile` as migration host and intended future repo name.
- [ ] Record current production host/path/DNS map for Profile, Portal, Media, Academy, and Admin.
- [ ] Export route inventory from every legacy SvelteKit repo.
- [ ] Gather analytics/top landing URLs and build the redirect matrix.
- [ ] Record current Lighthouse/axe/performance/SEO baseline on critical pages.
- [ ] Confirm supported browser/device matrix.
- [ ] Confirm stakeholder owner for product copy and syariah/institutional claims.

### Phase 1 — Design and Code Foundation

- [ ] Create the canonical token layer with semantic `fg`, `surface`, `border`, `accent`, status, and `on-*` tokens.
- [ ] Apply accessible token candidates and verify every foreground/background pair in light and dark mode.
- [ ] Load the approved font weights actually used; remove implicit synthetic weights.
- [ ] Implement SSR-safe, flash-safe theme persistence.
- [ ] Add typed utilities for class merging, route metadata, dates, currency, and API error mapping.
- [ ] Build accessible primitives:
  - [ ] Button/IconButton
  - [ ] Field/Input/Textarea/Select/Checkbox/Radio/Switch
  - [ ] Dialog/Confirmation/Drawer
  - [ ] Menu/Popover/Tooltip
  - [ ] Tabs/Accordion/Breadcrumb/Pagination
  - [ ] Toast/Alert/StatusBadge
  - [ ] DataTable and responsive list fallback
  - [ ] Skeleton/Empty/Error/Forbidden states
- [ ] Build public header/footer and responsive app shell.
- [ ] Build admin shell with permission-aware navigation and mobile drawer.
- [ ] Add component examples/stories covering variants, states, light/dark, and responsive layouts.
- [ ] Add test scripts and test harness for unit/component/E2E/axe checks.
- [ ] Run Phase 1 visual/accessibility gate.

### Phase 2 — API Client, BFF, and Unified Session

- [ ] Add one OpenAPI generation command and one canonical generated type output.
- [ ] Add server-only upstream client that attaches `Api-Key` and session authorization.
- [ ] Add safe public client only for endpoints explicitly allowed from the browser, if any.
- [ ] Implement login, registration, verify, forgot/reset password UI.
- [ ] Implement server-owned access/refresh lifecycle and atomic refresh retry.
- [ ] Implement sign-out with refresh-token revocation.
- [ ] Implement root identity load and typed session context.
- [ ] Implement `requireAuth` and `requirePermission` server guards.
- [ ] Implement consistent `401`, `403`, `404`, `409`, `422`, and `5xx` UI mapping.
- [ ] Test expired access token, revoked refresh token, concurrent refresh, and sign-out.
- [ ] Scan browser bundle/storage/logs for secret leakage.

### Phase 3 — Public Core: Profile and Community

- [ ] Preserve the company homepage, vision/mission, principles, ecosystem, management, contact, and SEO metadata.
- [ ] Migrate `/aktivitas` list/detail using the canonical content client.
- [ ] Absorb Portal/community links and FAQ into `/community` without duplicate sources of truth.
- [ ] Consolidate duplicate Logo, Button, Hero, FAQ, Footer, and theme components.
- [ ] Add canonical metadata, sitemap entries, OpenGraph, structured data where approved, and legacy redirects.
- [ ] Verify content parity and critical CTA links.

### Phase 4 — Media and Screening

- [ ] Migrate Media landing to `/media`.
- [ ] Migrate Education and Research list routes with URL-backed pagination/filter state.
- [ ] Migrate article and webinar detail rendering with sanitized content rules.
- [ ] Migrate screening list, token detail, and quote/chart integration.
- [ ] Remove Media mock/runtime contract selection from production path.
- [ ] Replace Media-specific login/profile/session with the shared account flow.
- [ ] Add route aliases/redirects for every active Media URL.
- [ ] Verify API pagination/error contract and content visibility rules.

### Phase 5 — Academy Public and Member

- [ ] Wait for approved Academy read/entitlement/commerce OpenAPI contracts.
- [ ] Migrate Academy landing to `/academy` with approved copy only.
- [ ] Implement course/cohort catalog and detail pages.
- [ ] Implement account Academy overview and entitlement state.
- [ ] Implement lesson player that requests protected lesson data only after server entitlement check.
- [ ] Implement progress and bookmark interactions against backend APIs.
- [ ] Implement offerings and backend-owned checkout quote.
- [ ] Implement idempotent order creation and payment-proof upload.
- [ ] Implement order history and pending/approved/rejected/cancelled states.
- [ ] Preserve compatible Academy slugs/aliases and campaign parameters.
- [ ] Remove Firebase Auth/Firestore imports from migrated runtime paths.

### Phase 6 — Content Admin

- [ ] Implement `/admin` dashboard cards only for authorized domains.
- [ ] Migrate Posts list/create/edit with separate write/publish capabilities.
- [ ] Migrate taxonomy/tags.
- [ ] Migrate Screening/token administration.
- [ ] Migrate Messages and user management if the backend permission exists.
- [ ] Hide unauthorized navigation and guard every admin server load/action.
- [ ] Render explicit forbidden state for direct unauthorized navigation.
- [ ] Handle field errors, conflicts, stale versions, and mutation retry safely.
- [ ] Add audit metadata display where the API supports it.

### Phase 7 — Academy Admin

- [ ] Wait for approved Academy admin OpenAPI contract.
- [ ] Implement course list/editor and curriculum ordering.
- [ ] Implement cohort/session administration when included in product scope.
- [ ] Implement order review with confirmation, idempotency, and server-derived actor/amount.
- [ ] Implement voucher management without client-side discount authority.
- [ ] Implement versioned Academy landing draft/preview/publish flow.
- [ ] Add unsaved-change and optimistic concurrency protection.
- [ ] Verify an Academy-only admin cannot call Content mutation endpoints and vice versa.
- [ ] Verify multi-role admin receives both navigation groups.

### Phase 8 — Cutover and Decommission

- [ ] Rehearse redirect/DNS/canonical/sitemap behavior in staging.
- [ ] Run database migration rehearsal and frontend contract smoke tests with Daffa.
- [ ] Run full light/dark, keyboard, responsive, axe, and browser E2E matrix.
- [ ] Compare production-bound bundle/performance/SEO baseline against AS-IS.
- [ ] Define deployment window, monitoring, rollback triggers, and rollback owner.
- [ ] Cut over one domain/surface at a time where infrastructure permits.
- [ ] Monitor auth failures, `403`, `404`, `5xx`, checkout/order errors, and redirect misses.
- [ ] Keep legacy deployments and DB snapshots recoverable for the agreed rollback window.
- [ ] Archive legacy repos read-only only after traffic/data parity is confirmed.
- [ ] Update architecture, runbook, environment, local setup, and operational documentation.

## Verification Matrix

### Required commands

- [ ] `npm run check`
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`

### Required automated scenarios

- [ ] Anonymous public navigation and SEO metadata.
- [ ] Sign-up/verify/sign-in/refresh/sign-out/reset flow.
- [ ] Content-only admin permission matrix.
- [ ] Academy-only admin permission matrix.
- [ ] Multi-role admin permission matrix.
- [ ] Direct route navigation to forbidden modules.
- [ ] Course entitlement allow/deny and protected lesson URL behavior.
- [ ] Quote expiry, duplicate submit/idempotency, voucher failure, payment-proof failure.
- [ ] CMS/course stale version conflict.
- [ ] Legacy redirect matrix, including query/slug preservation.
- [ ] Keyboard focus order, dialog focus trap/return, tabs/menus/drawer behavior.
- [ ] Axe scan for critical public/member/admin pages in light and dark mode.
- [ ] Responsive checks at agreed phone/tablet/desktop breakpoints.
- [ ] No secrets in browser bundle, network response, localStorage, or logs.

## Escalation Triggers

Stop and update the plan before continuing if:

- OpenAPI/data/auth/security contracts differ from the approved spec.
- A phase requires browser-owned pricing, authorization, or entitlement logic.
- A required edit falls outside the allowed repository/files.
- A public URL cannot be mapped without product/SEO input.
- A payment, refund, cancellation, subscription, or voucher rule is unclear.
- A syariah/endorsement claim lacks an approved source.
- The same implementation blocker fails more than two times.

## Definition of Done

- [ ] All acceptance criteria in `spec.md` are satisfied.
- [ ] All required commands and scenario checks pass.
- [ ] Changed files remain within the approved scope or deviations are documented.
- [ ] Redirect, rollback, monitoring, and ownership runbooks are complete.
- [ ] Legacy direct Firebase and duplicate session paths are no longer live.
- [ ] Execution log and final report below are complete.

## Execution Log

- 2026-08-02: Planning pack created from repository audit, group-chat decisions, design package audit, and frontend/backend ownership split.
- 2026-08-02: Planning files passed whitespace, balanced-fence, and structural sanity checks. Prettier was not available locally; no package was installed solely to format planning Markdown.
- Pending explicit approval; no implementation started.

## Final Report

- Files changed:
  - `planning/unified-frontend/spec.md`
  - `planning/unified-frontend/tasks.md`
  - `planning/unified-frontend/design-system-audit.md`
- Verification: planning structural checks pass; application checks intentionally deferred because no implementation file changed.
- Deviations from spec: none.

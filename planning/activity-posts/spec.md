# Spec: Activity Posts (Published) Integration

## Objective

Render published activity posts from the CryptoSharia API on the homepage Activities section and on a dedicated `/activities` + detail page, using the existing card layout and BFF-safe server-side fetching.

## Scope

- In scope:
  - Fetch `status=published` + `section=activity` posts from `/posts`.
  - Homepage section uses the existing Activities card UI and shows up to 4 posts.
  - `/activities` page lists activity posts (same card pattern).
  - `/activities/[slug]` detail page displays the activity post content and optional event metadata.
  - Cards always show `publishedAt` as date-only (no time).
  - Detail page shows `eventDate` (if present) with explicit `WIB` label when time is displayed.
  - Detail page provides an external link CTA only when `externalLink` exists.
  - Broken/missing cover image renders a tasteful placeholder (no broken image icon).

- Out of scope:
  - Changing card layout logic (keep the current 4-card behavior and index-based hide class).
  - Sorting changes (use API default ordering).
  - Showing any external link hints on cards.
  - Auth, permissions, draft previews, or admin editing.

## Architecture Decisions

- Server-side fetching only:
  - Use `createServerCsApiClient(fetch)` from `src/lib/api/cs-api.server.ts` in server-only load functions.
  - No direct browser-to-upstream API calls.

- Routing:
  - Activity posts use `/activities` and `/activities/[slug]`.
  - Cards link to internal `/activities/[slug]` (never to `externalLink`).

- Date rules:
  - Card date uses `publishedAt` formatted as date-only.
  - Detail page shows `eventDate` (if present) as a date+time label with explicit `WIB`.

## Contracts

### Input

- List:
  - `GET /posts?statuses[]=published&sections[]=activity&limit=4&page=1` for homepage.
  - `GET /posts?statuses[]=published&sections[]=activity&limit=<n>&page=1` for `/activities` page (initially page 1).

- Detail:
  - `GET /posts/{id}` where `{id}` is the post `slug`.

### Output

- Homepage section:
  - Display up to 4 cards.
  - Each card shows: cover image, `publishedAt` (date only), title, excerpt, tags.
  - Card click navigates to `/activities/[slug]`.

- `/activities` page:
  - List of activity cards (same mapping rules as homepage).

- `/activities/[slug]` page:
  - Title, published date, cover image, tags, and post content.
  - If `eventDate` exists: show it with time and an explicit `WIB` label.
  - If `externalLink` exists: show a CTA (opens new tab with `rel="noopener noreferrer"`).

### Validation Rules

- `externalLink`:
  - Only treat `http:`/`https:` as valid for the CTA.
  - Invalid/missing links => no CTA.

- Dates:
  - `publishedAt` is assumed present for published posts; implementation should still avoid throwing if it is unexpectedly null.
  - `eventDate` may be null.

## Behavior Rules

- Homepage Activities:
  - Keep the existing 3-column grid and the current conditional hide class for index 3.
  - Fetch `limit=4&page=1`.
  - Always display `publishedAt` (date only).
  - Do not show any `externalLink` hint.

- Detail page:
  - Event metadata is only displayed when `eventDate` exists.
  - When rendering time, append `WIB` label.
  - External link CTA exists only on detail page and only when `externalLink` is valid.

## Edge Cases

- Missing/broken `coverImage.url`:
  - Render a placeholder area maintaining the same aspect ratio.

- `publishedAt` unexpectedly null:
  - Render the date row hidden or fallback to `createdAt` (implementation choice documented in tasks).

- Content rendering:
  - `content` format is not yet confirmed (HTML vs Markdown vs plain text). Rendering must not introduce XSS risk.

## Risks and Mitigations

- Risk: `eventDate` timezone expectations.
  - Mitigation: format using `Asia/Jakarta` and label `WIB`; confirm with at least one known event record that the displayed time matches expectations.

- Risk: `content` contains HTML and is rendered unsafely.
  - Mitigation: default to safe rendering (plain text) unless API guarantees sanitized HTML; only use `{@html}` if confirmed safe.

## Acceptance Criteria

- Homepage renders the Activities section from API data (not hardcoded), showing up to 4 activity posts.
- Each card shows cover image (or placeholder), published date (date-only), title, excerpt, and tags.
- Card links go to `/activities/[slug]`.
- `/activities/[slug]` loads the post by slug and renders:
  - Title, published date, cover image (or placeholder), tags, and content.
  - If `eventDate` exists: it is displayed with time and an explicit `WIB` label.
  - If `externalLink` exists and is valid: a CTA is displayed; cards never show external link info.
- No secrets are exposed to client-side code.

## Verification

- `npm run check`
- `npm run lint`
- `npm run build`

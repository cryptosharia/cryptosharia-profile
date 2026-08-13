# Spec: Unified CryptoSharia Frontend

Status: **DRAFT — approval required before implementation**

## Objective

Menyatukan seluruh web publik, akun/member, Academy, dan panel admin CryptoSharia ke satu aplikasi SvelteKit di `cryptosharia.id`, dengan satu session dan satu design system, tetapi tetap memisahkan akses Content Admin dan Academy Admin melalui permission yang eksplisit.

## Ownership

- Frontend, BFF SvelteKit, route composition, UI state, accessibility, dan migrasi halaman: Naufal.
- Database, identity/RBAC, business rules, REST API, OpenAPI, dan migrasi data: Daffa.
- Keputusan produk, copy syariah, klaim institusional, harga, serta aturan subscription/payment: product owner/stakeholder terkait.

Frontend tidak boleh menggantikan otorisasi backend. Menyembunyikan menu hanya untuk UX; API tetap wajib menolak akses tanpa permission dengan `403`.

## AS-IS

| Aplikasi | Fungsi saat ini | Auth/data saat ini | Masalah utama |
|---|---|---|---|
| `cryptosharia-profile` | Company profile, pengurus, aktivitas, contact | Central API untuk aktivitas/contact | Paling dekat dengan host canonical, tetapi scope repo terlalu sempit |
| `cryptosharia-portal` | Link/community hub satu halaman | Konten hardcoded | Overlap dengan quick links Profile dan Community di Media |
| `cryptosharia-media` | Artikel, education, research, screening, token detail, community | Central API + session cookie sendiri | Kontrak API/auth sudah drift; UI dan session terduplikasi |
| `cryptosharia-academy` | Landing, catalog, learning, subscription/unit payment, profile, admin Academy | Firebase Auth + direct browser Firestore | Identity terpisah; pricing/order/entitlement masih berada di browser |
| `cryptosharia-admin` | Posts, tokens, tags, users, messages | Central API + JWT cookies | Shell terpisah; menu tidak difilter per permission |
| `cryptosharia-api` | Auth/users, posts, tokens, tags, messages, assets | PostgreSQL/Drizzle/OpenAPI | Belum memiliki domain Academy/commerce dan RBAC Academy |

Risiko konkret yang tidak boleh ikut termigrasi:

- Academy menentukan admin melalui whitelist email di client.
- `/admin/vouchers` Academy tidak mempunyai route guard di file halamannya dan menulis langsung ke Firestore.
- Harga, validasi voucher, final amount, approval order, serta pemberian entitlement berada di browser dan tidak transaksional.
- Admin Content menerima semua non-member ke shell yang sama; sidebar menampilkan seluruh modul walaupun permission tidak cocok.
- Media, Profile, Admin, dan Academy memiliki client API, auth lifecycle, token CSS, komponen, serta route error handling yang berbeda-beda.

## TO-BE Architecture

### 1. Satu frontend, satu deployment

- Gunakan `cryptosharia-profile` sebagai migration host karena sudah melayani domain utama, memiliki pola server-side API client, dan mempunyai planning/governance yang berjalan.
- Setelah cutover, rename repo menjadi `cryptosharia-web` agar nama tidak lagi mengunci scope ke company profile. Rename repo bukan syarat untuk mulai migrasi.
- `cryptosharia-api` tetap service terpisah. Penggabungan webapp berarti satu frontend deployment, bukan memasukkan backend ke browser app.
- Gunakan pola strangler: halaman dipindahkan per domain, diverifikasi, kemudian host/path lama diberi `301/308` redirect. Jangan big-bang rewrite seluruh halaman sekaligus.

### 2. Route map canonical

```text
(public)
/
/aktivitas
/aktivitas/[slug]
/media
/media/education
/media/research
/media/articles/[slug]
/media/webinars/[slug]
/screening
/tokens/[slug]
/community
/academy
/academy/courses
/academy/courses/[slug]
/academy/cohorts/[slug]
/academy/subscription

(account/member)
/login
/register
/forgot-password
/reset-password/[token]
/account
/account/academy
/academy/learn/[courseSlug]
/academy/learn/[courseSlug]/lessons/[lessonId]
/account/orders

(admin)
/admin
/admin/content/posts
/admin/content/posts/new
/admin/content/posts/[id]
/admin/content/tags
/admin/content/screening
/admin/content/messages
/admin/academy/courses
/admin/academy/courses/[id]
/admin/academy/orders
/admin/academy/vouchers
/admin/academy/landing
/admin/users
```

Compatibility redirects yang wajib dipertahankan saat cutover:

| Legacy | Canonical target |
|---|---|
| `profile` root | `/` |
| `portal` root | `/community` |
| Active Profile/Portal/Media/Academy subdomain | matching path on `https://cryptosharia.id` |
| `admin.cryptosharia.id/*` | matching route under `https://cryptosharia.id/admin/*` |
| Media `/education` | `/media/education` |
| Media `/research` | `/media/research` |
| Media `/article/[slug]` | `/media/articles/[slug]` |
| Media `/webinar/[slug]` | `/media/webinars/[slug]` |
| Academy `/e-learning` | `/academy/courses` |
| Academy `/e-learning/[id]` | resolved course slug route |
| Academy `/units` | `/academy/courses` with compatible campaign/query handling |
| Admin `/dashboard` | `/admin` |
| Admin `/posts`, `/tags`, `/tokens`, `/messages` | matching `/admin/content/*` route |
| Academy `/admin/*` | matching `/admin/academy/*` route |

Redirect map final harus dibangun dari analytics dan seluruh route aktif sebelum DNS/cutover. Slug lama tidak boleh hilang tanpa alias.

### 3. Shared shell, session, dan BFF

- Browser hanya berkomunikasi dengan route/action SvelteKit pada origin yang sama untuk operasi private.
- `CS_API_KEY`, refresh token, dan upstream implementation detail hanya hidup di server.
- Access/refresh lifecycle dilayani satu session module: sign-in, atomic refresh rotation, sign-out/revoke, expiry, dan invalid-session recovery.
- Cookie private wajib `httpOnly`, `secure` di production, `sameSite=lax|strict` sesuai flow yang disetujui, dan scope sekecil mungkin.
- `+layout.server.ts` root memuat identity ringkas. Layout admin memuat `permissions[]` dan menjalankan server guard sebelum merender halaman.
- Satu typed client dihasilkan dari OpenAPI. Tidak ada handwritten/copy-pasted contract per modul.
- Error mapping konsisten: `401` ke sign-in/refresh flow, `403` ke forbidden state, `404` ke not-found, `409` ke conflict copy, `422` ke field errors, dan `5xx` ke recoverable error state.

### 4. Admin tetap dipisah berdasarkan permission

Satu operator boleh mempunyai lebih dari satu role. UI hanya bergantung pada permission keys, bukan email dan bukan nama role.

| UI route/module | Minimum permission |
|---|---|
| `/admin/content/posts` | `content.posts.read` |
| Create/edit draft | `content.posts.write` |
| Publish/unpublish | `content.posts.publish` |
| Tags/taxonomy | `content.taxonomy.manage` |
| Screening/token management | `screening.tokens.manage` |
| Messages | `content.messages.read` |
| Academy courses | `academy.courses.read` |
| Academy course editing | `academy.courses.write` |
| Academy orders | `academy.orders.read` |
| Approve/reject order | `academy.orders.review` |
| Academy vouchers | `academy.vouchers.manage` |
| Academy landing | `academy.site.manage` |
| User/role management | `rbac.manage` or narrower user permissions |

Navigation groups:

- `Content`: Posts, Tags, Screening, Messages.
- `Academy`: Courses, Cohorts, Orders, Vouchers, Landing.
- `Platform`: Users/Roles/Audit, hanya jika diizinkan.

Jika user punya satu domain saja, domain lain tidak muncul. Direct navigation ke route tanpa permission menghasilkan halaman `403`, bukan redirect membingungkan atau data kosong.

Implementasikan `content-admin` dan `academy-admin` sebagai feature boundary terpisah yang hanya berbagi shell, session, primitives, dan typed API layer. Dengan begitu, bila skala/security kelak menuntut deployment terpisah, modul dapat diekstrak tanpa mengubah permission model atau backend contract.

### 5. Public/member domain boundaries

- Content post dan Academy course adalah domain berbeda. Course/module/lesson tidak boleh dipaksa masuk ke tabel/API posts.
- Screening/token tetap domain tersendiri karena status syariah dan auditnya memiliki rule berbeda dari editorial content.
- Academy member UI tidak menerima protected lesson URL sebelum entitlement diverifikasi backend.
- Frontend tidak mengirim atau menentukan `userId`, final amount, discount, status order, expiry entitlement, `approvedBy`, atau permission.
- Checkout menggunakan backend quote yang memiliki expiry/signature atau quote id. Order creation memakai idempotency key.

## Frontend-facing Contracts

Kontrak dan schema backend berada di `cryptosharia-api/planning/unified-platform-contract/spec.md` serta `schema-draft.md`. Minimum contract yang harus stabil di OpenAPI sebelum wiring:

```text
GET  /v1/auth/me

GET  /v1/posts
GET  /v1/posts/{idOrSlug}

GET  /v1/academy/courses
GET  /v1/academy/courses/{slug}
GET  /v1/academy/lessons/{id}
GET  /v1/me/academy/entitlements
PUT  /v1/me/academy/lessons/{id}/progress

GET  /v1/academy/offerings
POST /v1/academy/checkout/quote
POST /v1/academy/orders
POST /v1/academy/orders/{id}/payment-proof
GET  /v1/me/orders

GET/POST/PATCH /v1/admin/content/posts...
GET/POST/PATCH /v1/admin/academy/courses...
GET/POST       /v1/admin/academy/orders...
GET/POST/PATCH /v1/admin/academy/vouchers...
GET/PUT/POST   /v1/admin/academy/pages...
```

Target `GET /v1/auth/me`:

```json
{
  "success": true,
  "message": "Current user retrieved",
  "data": {
    "id": "uuid",
    "name": "Admin Academy",
    "email": "admin@example.com",
    "roles": [{ "key": "academy_admin", "name": "Academy Admin" }],
    "permissions": ["academy.courses.read", "academy.orders.review"]
  },
  "errors": null
}
```

Contract invariants:

- Timestamp berupa ISO-8601 UTC.
- Nominal berupa integer rupiah dan `currency: "IDR"`, bukan formatted string/floating point.
- Pagination memakai satu bentuk yang sama pada semua list.
- Empty list adalah success dengan `items: []`, bukan `404`.
- Response tidak mengirim secret, password hash, refresh token record, provider raw error, atau protected media sebelum entitlement check.
- OpenAPI adalah source of truth; generated type diperbarui dalam CI dan drift membuat check gagal.

## Content Taxonomy Decision

`post_type` tidak boleh langsung dihapus karena dipakai API dan Media. Targetnya adalah membersihkan makna:

- `section`/`sections[]`: kanal editorial seperti news, education, research, activity.
- `format`: cara konten dikonsumsi, yaitu `article | video | event`.
- Webinar menjadi `format=event` dengan `eventKind=webinar`.
- `headline` bukan format; pindahkan menjadi placement/curation.
- `isFeatured` diganti placement yang menyebut surface/slot/rank dan active window.
- Satu post dapat muncul di beberapa section dengan tepat satu `primarySection`; ini menyelesaikan webinar yang saat ini dicari sebagai Education tetapi di-seed sebagai Activity.

Frontend harus mendukung contract lama dan baru hanya selama masa cutover yang dibatasi; setelah consumer lama pindah, adapter lama dihapus.

## Design System Requirements

Artefak di `/Users/mac/Downloads/design-system-docs` hanya dipakai sebagai visual direction, bukan source code siap salin. Audit lengkap ada di `design-system-audit.md`.

Sebelum migrasi layar:

- Buat satu token source of truth di `src/app.css` atau shared theme module.
- Ganti semantic naming menjadi `fg-*`, `surface-*`, `border-*`, `accent-*`, serta token `on-*` per fill.
- Seluruh normal text memenuhi contrast `4.5:1`; meaningful controls/focus/graphics memenuhi `3:1`.
- Gunakan `focus-visible`, keyboard navigation, reduced motion, target size WCAG 2.2, dan semantic HTML.
- Sediakan typed Svelte components dan primitives untuk Button, Field, Dialog, Drawer, Menu, Tabs, Toast, DataTable, Empty/Error/Forbidden state, dan admin app shell.
- Light/dark mode harus SSR-safe dan flash-safe.
- Tidak ada page-local hardcoded color/font yang menggandakan token.
- Tidak ada klaim seperti “AAOIFI Endorsed”, “Sharia Board Active”, “Halal digital banking”, atau “WCAG 2.2 AA” sampai benar-benar diverifikasi dan disetujui stakeholder.

## UI Behavior Rules

- Semua list memiliki loading, skeleton (jika relevan), empty, error, retry, pagination, dan permission-denied state.
- Form mutation memiliki disabled/pending state, field-level error, form summary untuk error global, success feedback, dan protection terhadap double submit.
- Destructive action memakai confirmation dialog dan tidak boleh bergantung pada native `confirm()` di final UI.
- Unsaved CMS/course edits memunculkan leave protection dan optimistic concurrency conflict bila versi server berubah.
- Admin tables responsif, mempunyai header semantik, filter/sort yang tercermin pada URL, dan bulk action hanya jika backend mendukung.
- Route, navigation, breadcrumb, page title, dan `aria-current` berasal dari satu route metadata map agar tidak drift.
- Mobile drawer, tablet sidebar, desktop sidebar, keyboard behavior, dan focus return harus diuji; design package saat ini tidak menyediakan responsive spec.

## Migration Strategy

1. **Foundation**: token, primitives, OpenAPI client, BFF/session, route metadata, test harness.
2. **Public core**: Profile + Portal/community, tanpa mengubah contract backend.
3. **Content**: Media + Screening, dengan redirects dan parity checks.
4. **Account**: satu login/profile/session; hentikan login flow Media/Firebase baru setelah backend identity siap.
5. **Academy public/member**: catalog dahulu, lalu protected learning/checkout setelah API Daffa tersedia.
6. **Admin Content**: pindahkan fitur existing dengan permission-aware shell.
7. **Admin Academy**: implementasi hanya terhadap API Academy baru; jangan port direct Firestore writes.
8. **Cutover**: data/SEO/analytics rehearsal, DNS/redirect, observability, rollback window, lalu archive repo lama read-only.

Setiap fase harus dapat dirilis sendiri dan mempunyai rollback. Repo lama tidak dihapus pada fase migrasi.

## Scope

### In scope

- Konsolidasi frontend di satu SvelteKit app.
- Shared design system dan accessible components.
- Unified auth/session/BFF.
- Route migration dan legacy redirects.
- Public, member, Content Admin, dan Academy Admin UI.
- OpenAPI-generated API integration.
- Automated frontend checks dan accessibility test baseline.

### Out of scope

- Implementasi database/API milik Daffa.
- Pemilihan payment gateway dan settlement/accounting detail.
- Keputusan fiqh atau klaim sertifikasi/endorsement.
- Menghapus repo/data legacy sebelum cutover terverifikasi.
- Store marketplace di fase pertama selain contract commerce yang dibutuhkan Academy.
- Quiz engine penuh sebelum aturan assessment dikunci.

## Risks and Mitigations

- Risk: rewrite besar berhenti di tengah jalan.
  Mitigation: migrasi vertikal per domain dengan adapter dan redirect, bukan satu PR besar.
- Risk: frontend terblokir API Academy.
  Mitigation: lock OpenAPI contract lebih dulu; gunakan fixture contract-only, bukan fake business logic di production path.
- Risk: permission salah membuka domain lain.
  Mitigation: server route guard + permission-aware navigation + API `403` tests.
- Risk: URL dan SEO lama hilang.
  Mitigation: route inventory, redirect matrix, canonical metadata, sitemap comparison, dan crawl test sebelum cutover.
- Risk: UI baru menyalin contrast/design error.
  Mitigation: token gate, axe/component tests, light/dark state matrix, dan audit pada setiap primitive.
- Risk: Firebase test/production data bercampur.
  Mitigation: Daffa melakukan inventory dan menandai data discard/migrate secara eksplisit sebelum import.
- Risk: satu app menjadi monolith sulit dirawat.
  Mitigation: feature folders dan server/domain boundaries; satu deployment tidak berarti satu folder besar tanpa modul.

## Decisions Locked by Approval

Persetujuan spec ini berarti menyetujui rekomendasi berikut:

1. `cryptosharia-profile` menjadi migration host dan dapat di-rename menjadi `cryptosharia-web` setelah cutover.
2. Canonical admin berada di `/admin` dalam frontend yang sama.
3. Content Admin dan Academy Admin tetap permission scope terpisah.
4. Central API/PostgreSQL menjadi source of truth; Firebase Academy dihentikan setelah migrasi.
5. Commerce/Store menjadi pemilik order, payment, voucher redemption, dan entitlement grant.
6. `post_type` dimigrasikan menjadi `format`; `headline` menjadi placement, bukan format.
7. Academy course/module/lesson tidak digabung ke posts.
8. Design system yang dikirim harus diremediasi sebelum dipakai sebagai production primitives.

Masih perlu keputusan data dari stakeholder sebelum fase Academy:

- Daftar Firebase document/user/order mana yang benar-benar test dan boleh dibuang.
- Harga, offering unit vs subscription, refund/cancel rule, dan approval/payment workflow final.
- Copy dan klaim syariah/institusional yang disetujui.

## Acceptance Criteria

- Satu deployment melayani seluruh route canonical di atas.
- Satu session dapat berpindah public, member, dan admin tanpa login ulang yang tidak perlu.
- Content-only admin tidak melihat atau membuka Academy routes; Academy-only admin tidak melihat atau membuka Content routes.
- Multi-role admin melihat kedua group tanpa role gabungan khusus.
- API key dan refresh token tidak muncul pada browser bundle, browser storage, URL, atau logs.
- Tidak ada direct Firestore mutation, client-side price authority, atau client-side entitlement grant di aplikasi baru.
- Semua API consumption berasal dari generated OpenAPI types.
- Redirect legacy tervalidasi dan tidak menciptakan redirect loop/404 untuk URL aktif.
- Design primitives dan layar kritis lulus keyboard, axe, light/dark, serta responsive checks.
- `npm run check`, `npm run lint`, `npm run test`, dan `npm run build` lulus.
- Seluruh acceptance criteria fase terkait dan execution log pada `tasks.md` diperbarui.

## Verification

- `npm run check`
- `npm run lint`
- `npm run test`
- `npm run build`
- Component accessibility tests (axe)
- Browser E2E untuk auth refresh, permission matrix, checkout idempotency, admin mutation, dan redirect matrix
- Production bundle scan untuk secret/API key
- Sitemap/canonical/redirect crawl comparison

## Approval Gate

Jangan memulai implementasi aplikasi, perubahan route production, atau migrasi data sampai user menyetujui `spec.md` dan `tasks.md` ini secara eksplisit.

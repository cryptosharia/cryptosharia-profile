# Audit: csharia Design System

Audit date: 2026-08-02
Source: `/Users/mac/Downloads/design-system-docs`, `ungu.in/csharia-design`, dan `ungu.in/csharia-proto`

## Verdict

Artefak ini berguna sebagai arah visual awal, tetapi **belum implementation-ready dan belum memenuhi klaim WCAG 2.2 AA**. Jangan menyalin snippet langsung ke aplikasi production sebelum integritas file, contrast, semantic token, interaction contract, responsive behavior, dan Svelte component API dibereskan.

Prototype yang dibagikan adalah component/design-system catalog, bukan product flow lengkap untuk public site, member Academy, Content Admin, dan Academy Admin. Karena itu ia belum dapat dianggap sebagai source of truth untuk information architecture atau acceptance criteria aplikasi.

## P0 — Package Integrity

| File | Temuan |
|---|---|
| `components/buttons.md` | Berakhir di tengah atribut SVG pada line 238 dan mempunyai Markdown fence yang tidak berpasangan |
| `components/forms.md` | Berakhir di tengah `<label` pada line 328; dokumentasi toggle terpotong |
| `components/navigation.md` | Memiliki 4,162 trailing NUL bytes setelah line 285 |
| `components/data-display.md` | Memiliki 5,079 trailing NUL bytes setelah line 405 dan terdeteksi sebagai binary/data |
| `README.md` | Menunjuk `examples.md`, tetapi file tersebut tidak ada |
| Seluruh `.md` | Mode file `700`; dokumentasi normal seharusnya `644` |

Dampak: Markdown renderer, `rg`, indexing, lint/doc generator, diff review, dan automation dapat gagal atau memperlakukan file sebagai binary.

Required remediation:

- Minta/export ulang sumber yang tidak terpotong.
- Hapus NUL bytes tanpa menghilangkan konten sah.
- Tutup seluruh code fences/HTML examples.
- Tambah `examples.md` atau hapus referensi.
- Normalize mode menjadi `644`.
- Tambahkan integrity check di CI: UTF-8, tanpa NUL, balanced fences, link/file existence.

## WCAG Contrast Audit

WCAG relative luminance digunakan untuk ratio di bawah. Normal text memerlukan minimal `4.5:1`; meaningful control boundary, focus indicator, dan non-text graphic umumnya memerlukan `3:1`.

| Token/use | Light | Dark | Status |
|---|---:|---:|---|
| Primary text on surface | 17.79 | 14.60 | Pass |
| Secondary text on surface | 4.25 | 4.89 | Light fail |
| Secondary text on canvas | 4.14 | 5.25 | Light fail |
| White/inverse on brand `#FF8C00` | 2.33 | 2.33 | Fail |
| White on brand hover | 3.00 | 2.05 | Fail normal text |
| Brand text on surface | 2.33 | 7.25 | Light fail |
| Success fg/bg | 4.26 | 4.66 | Light fail untuk text kecil |
| Error fg/bg | 3.65 | 4.04 | Fail |
| Warning fg/bg | 2.03 | 7.40 | Light fail |
| Info fg/bg | 2.15 | 2.63 | Fail |
| White on success fill | 4.59 | 3.21 | Dark fail |
| White on error fill | 4.00 | 4.15 | Fail |
| White on warning fill | 2.13 | 2.13 | Fail |
| Default border vs surface | 1.34 | 1.28 | Fail untuk required control boundary |
| Focus ring vs surface | 2.54 | 4.89 | Light fail |
| `brand/20` ring vs surface | 1.19 | 1.42 | Fail |
| Surface-hover vs surface | 1.03 | 1.06 | State nyaris tidak terlihat |
| Tooltip white on `bg-primary` | 17.79 | 1.16 | Dark critical fail |
| Brand text on brand-subtle hover | 1.29 | 2.63 | Fail |
| Disabled text/background | 3.59 | 1.04 | Disabled exempt, tetapi dark unusable |

High-impact occurrences:

- Primary button, pagination, sidebar active item, avatar, dan CTA card memakai white on orange.
- Placeholder, metadata, breadcrumb, serta inactive nav memakai secondary token yang gagal di light mode.
- Status badge warning/error dan dark success gagal untuk text kecil.
- Tooltip memakai `bg-primary`; karena `primary` didefinisikan sebagai foreground, dark mode menghasilkan background hampir putih dengan text putih.
- Form focus menggunakan brand/translucent brand, bukan satu focus token yang konsisten.
- Active/selected row menggunakan surface-hover yang hanya berbeda sekitar `1.03–1.06:1`.

Klaim di prototype bahwa palette memenuhi “WCAG 2.2 AA minimum 4.5:1” harus dihapus sampai matrix production benar-benar lulus.

## Candidate Token Baseline

Candidate berikut memenuhi ratio yang disebutkan, tetapi tetap memerlukan visual approval dari designer.

| Role | Candidate | Tested ratio |
|---|---|---:|
| Light muted foreground | `#677083` | 4.97 on white; 4.85 on canvas |
| Light accent/link foreground | `#A15C00` | 5.19 on white |
| Light focus/control border | `#8A93A3` | 3.10 on white |
| Light success foreground | `#197348` | 5.44 on `#EBFAF3` |
| Light error foreground | `#C72B21` | 5.05 on `#FEF2F1` |
| Light warning foreground | `#825500` | 6.14 on `#FFF9E6` |
| Dark error foreground | `#EB554A` | 4.73 on `#2B1917` |
| Light info pair | `#1769AA` / `#EFF6FF` | 5.30 |
| Dark info pair | `#60A5FA` / `#17243A` | 6.12 |

Jika fill brand/status dipertahankan, dark text jauh lebih aman daripada universal white text:

- black on brand: `9.00:1`
- black on warning: `9.85:1`
- black on error: `5.25:1` light / `5.07:1` dark
- black on success: `4.58:1` light / `6.54:1` dark

Jangan gunakan satu token “inverse selalu putih”. Definisikan eksplisit:

```text
--fg-default
--fg-muted
--surface-canvas
--surface-raised
--surface-hover
--surface-selected
--border-subtle
--border-control
--border-focus
--accent-fill
--accent-fg
--on-accent
--on-success
--on-error
--on-warning
```

`border-subtle` boleh rendah untuk dekorasi; `border-control` dan focus indicator harus mencapai `3:1` jika batasnya diperlukan untuk mengenali kontrol.

## Token and Style Consistency

- `primary` berarti foreground tetapi dipakai sebagai tooltip background. `secondary` juga dipakai bergantian sebagai muted text dan neutral fill.
- `surface-hover` dipakai untuk hover, selected, active, dan neutral badge walaupun perbedaannya hampir tidak terlihat.
- `brand-subtle` opaque di light tetapi alpha di dark; tambahan utility opacity menghasilkan compounded opacity yang tidak konsisten.
- `info` sama dengan brand orange dan terlalu dekat dengan warning; status terlalu bergantung pada warna/icon.
- Dark `surface-disabled` berupa light overlay 60%, sehingga muted text hanya `1.04:1`.
- Token warna diduplikasi di README dan `tokens/colors.md`, bukan digenerate dari satu source.
- Typography hanya memetakan size, sedangkan leading/tracking/weight tersebar sebagai inline style.
- Dokumentasi menyatakan Tailwind v4 tidak bisa memasangkan line-height, tracking, dan weight pada named text token. Pernyataan ini tidak akurat; gunakan `--text-name--line-height`, `--text-name--letter-spacing`, dan `--text-name--font-weight`.
- Custom utilities sebaiknya memakai Tailwind v4 `@utility`, bukan menganggap rule pada `@layer utilities` menjadi variant-capable utility.
- DM Sans hanya dimuat pada 400/600/700, tetapi contoh berkali-kali memakai `font-medium` 500.
- Radius/spacing disebut memakai default dan masih diminta “reconfirm against Figma”; spec belum terkunci.
- Token yang belum ada: shadow/elevation, backdrop/overlay, motion/easing, z-index, control height, container width, breakpoints, pressed/selected, chart palette, reduced motion, dan forced colors.
- Tidak ada responsive class atau mobile layout spec di package.

## Component and Accessibility Gaps

### Forms

- Caption memakai `<p>`, bukan `<label for>` yang terasosiasi.
- Error tidak terhubung melalui `aria-describedby`/`aria-errormessage`.
- Password reveal target sekitar 16×16 px, di bawah target size WCAG 2.2 umum 24×24 px.
- Read-only, success, required, hint, filled, dan async validation states tidak lengkap.
- Radio card bermutasi lewat global `querySelectorAll` dan mengubah border 1px ke 2px, menyebabkan layout shift.
- `rounded-full` pada native checkbox tidak menjamin bentuk circular lintas browser.

### Buttons and feedback

- Loading button tidak menetapkan `aria-busy`; banyak button tidak menetapkan `type`.
- Pressed state dan focus treatment tidak konsisten antarvariant/size.
- Tooltip hanya hover, tanpa focus, Escape, touch, dan collision behavior.
- Rich tooltip memiliki link di container `pointer-events-none`; gunakan popover untuk interactive content.
- Toast auto-dismiss empat detik tanpa pause on hover/focus atau timing policy.
- Accordion memakai global selector/ID yang akan collision pada multiple instance.

### Navigation and data display

- Tabs belum memiliki `id`, `aria-controls`, tabpanel, roving `tabindex`, dan arrow-key behavior.
- Inactive sidebar example bahkan tidak memiliki visible label.
- Table tidak memiliki `<thead>`, `<th>`, caption, sort semantics, atau mobile overflow/fallback.
- Score bar tidak mempunyai `progressbar` semantics, label, accessible value, atau non-color cue.
- Negative price example menampilkan `3.2%` tanpa minus; arah hanya dibedakan lewat icon/color.

## Missing Production Components

- Responsive public/admin app shell dan mobile drawer.
- Dialog/confirmation, dropdown/menu, popover, command/combobox.
- Complete Field wrapper, search, file upload, date/number input, validation summary.
- Data grid dengan headers, sort, filter, row selection, bulk action, pagination.
- Loading, skeleton, empty, error, offline, stale/conflict, dan permission-denied states.
- RBAC-aware navigation dan forbidden page.
- CMS editor, publish workflow, media picker/upload, preview, revision/conflict UI.
- Academy course/module/lesson editor, learner progress, order review, dan entitlement state.

## Prototype-specific Findings

- Prototype memperlihatkan component catalog panjang dengan fixed header; saat scroll, header menimpa section heading/content.
- Section numbering tidak konsisten (`03` langsung ke `11`, kemudian kembali `04`).
- Ada placeholder/broken copy seperti `TitleCryptoSharia StoreText`, `Button Text`, dan duplikasi generic Bitcoin rows.
- Contoh product language tidak sesuai current scope: wallet connection, portfolio, markets, “Halal digital banking”, NFT marketplace/store.
- Klaim “AAOIFI Endorsed” dan “Sharia Board Active” tidak boleh muncul tanpa approval/evidence yang benar.
- Prototype tidak memetakan flow login, account, course learning, checkout, Content Admin, Academy Admin, permission denial, atau error states.
- Tidak ada mobile/tablet variant yang dapat dijadikan implementation contract.

Kesimpulan: pakai mood, typography direction, radius, dan orange identity sebagai input diskusi; jangan memakai copy, IA, klaim, atau component semantics sebagai keputusan produk final.

## SvelteKit Delivery Contract

- Satu canonical `src/app.css`/theme module, diimpor root `+layout.svelte`.
- `vite.config` harus mempertahankan `sveltekit()` sekaligus `tailwindcss()`; jangan menyalin contoh README yang mengganti config menjadi Tailwind-only.
- Typed `.svelte` components dengan props/snippets/events, attribute forwarding, dan documented state contract.
- Tidak ada global DOM mutation untuk state komponen; gunakan local Svelte state dan component-scoped IDs.
- Theme pre-paint script/cookie harus SSR-safe dan menghindari flash.
- Gunakan `focus-visible`, reduced-motion support, semantic HTML, dan minimum `3:1` focus indicator.
- Sediakan executable examples dan automated matrix: light/dark × variant × state × breakpoint.
- Component test + axe + browser E2E wajib untuk primitive interaktif.
- Rename component generik/numbered menjadi stable APIs seperti `StatusBadge`, `RadioCardGroup`, `AssetCard`, `ChangeIndicator`, dan `DataTable`.

## Remediation Gate

Design foundation dianggap siap dipakai ketika:

- [ ] Semua file source valid UTF-8, tidak terpotong, tanpa NUL, dan dapat dirender/lint.
- [ ] Semantic token matrix lulus contrast untuk light/dark.
- [ ] Font weights, type scale, spacing, radius, breakpoint, motion, elevation, dan focus spec terkunci.
- [ ] Setiap interactive primitive memiliki keyboard/ARIA behavior dan target size yang benar.
- [ ] Responsive public/admin shells dan key empty/error/forbidden states tersedia.
- [ ] Svelte examples dan API contracts menggantikan raw global-JS snippets.
- [ ] Component/axe/visual regression checks lulus.
- [ ] Semua product/syariah/institutional claims telah disetujui pemilik yang berwenang.

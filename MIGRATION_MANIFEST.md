# VVV → TMG Migration Manifest

Generated 2026-05-20 for Brit's review. **Nothing has been changed yet.** This is
the plan for Phases 1–6. Review, mark up, and give go-ahead before Phase 1.

Source repo: `C:\Users\hustl\vvv-dIgitals-done` (VVV → vvvdigitals.com)
Dest repo:   `C:\Users\hustl\The_Missing_Guides` (TMG → themissingguides.com)

---

## 0. Key findings that change the handoff plan

Three things the survey turned up that differ from the handoff. Read these first.

- **`_lib/license.js` must exist on BOTH repos — not "stays on VVV."**
  `validate-license.js` and `get-download-link.js` both `require('./_lib/license.js')`.
  Those two functions move to TMG, so `license.js` must be **copied** to TMG.
  VVV still needs its own copy (`stripe-webhook.js` uses `issueLicense` +
  `buildDownloadUrl`). Result: `license.js` is duplicated, and both copies must
  stay byte-identical. This is the same secret/HMAC risk as the env var.

- **The products.js source-of-truth recommendation is inverted.**
  Actual code: `src/config/products.js` (full catalog) is canonical;
  `scripts/sync-products.mjs` *generates* `_lib/products-server.js` (a trimmed
  10-field mirror) from it. `products-server.js` cannot be the source of truth —
  it has no `bullets`/`faq`/`description`/`image`, so it can't regenerate the
  client catalog. See Section 5 for the real options. **Decision needed.**

- **Zero import-path rewrites are needed** if the directory structure is
  preserved exactly (every internal import is relative and structure-stable).
  Phase 1's "bulk import-path rewrites" turns out to be a no-op. The only
  source edits are wiring changes (Phases 3–4), not import paths.

---

## 1. Phase 1 — File migration map (source → dest)

All destination paths mirror source paths exactly. Preserving structure is what
makes import rewrites unnecessary — **do not flatten or rename directories.**

### React components / pages

| VVV source | TMG destination |
|---|---|
| `src/pages/Store.jsx` | `src/pages/Store.jsx` |
| `src/pages/ProductPage.jsx` | `src/pages/ProductPage.jsx` |
| `src/pages/store/ThankYou.jsx` | `src/pages/store/ThankYou.jsx` |
| `src/pages/tools/VaCalculator.jsx` | `src/pages/tools/VaCalculator.jsx` |
| `src/components/store/BuyButton.jsx` | `src/components/store/BuyButton.jsx` |
| `src/components/store/ProductCard.jsx` | `src/components/store/ProductCard.jsx` |
| `src/components/store/Disclaimer.jsx` | `src/components/store/Disclaimer.jsx` |
| `src/components/store/LicenseGate.jsx` | `src/components/store/LicenseGate.jsx` |

Note: handoff called Store/ProductPage/ThankYou/VaCalculator "components" — they
are actually **pages** in VVV. Mapped to `src/pages/` on TMG accordingly.

### Libraries

| VVV source | TMG destination |
|---|---|
| `src/lib/license-client.js` | `src/lib/license-client.js` |
| `src/lib/va-calculator.js` | `src/lib/va-calculator.js` |
| `src/lib/va-rates.js` | `src/lib/va-rates.js` (already 2026-COLA version) |

`src/lib/` does not exist on TMG yet — create it.

### Config

| VVV source | TMG destination |
|---|---|
| `src/config/products.js` | `src/config/products.js` |

`src/config/` does not exist on TMG yet — create it. (See Section 5 first.)

### Netlify functions

| VVV source | TMG destination | Notes |
|---|---|---|
| `netlify/functions/validate-license.js` | `netlify/functions/validate-license.js` | moves |
| `netlify/functions/get-download-link.js` | `netlify/functions/get-download-link.js` | moves |
| `netlify/functions/_lib/license.js` | `netlify/functions/_lib/license.js` | **COPY** — also stays on VVV |
| *(new file)* | `netlify/functions/package.json` | `{"type":"commonjs"}` — see Section 6 |

`netlify/functions/_lib/` does not exist on TMG yet — create it.

### PDFs + render/build scripts

| VVV source | TMG destination | Notes |
|---|---|---|
| `products/*.pdf` (6 files) | `products/*.pdf` | rendered PDFs served by get-download-link |
| `vvv-store/pdfs/*.md` (6 files) | `vvv-store/pdfs/*.md` | PDF markdown sources — keep dir name |
| `scripts/render-pdfs.mjs` | `scripts/render-pdfs.mjs` | reads `vvv-store/pdfs/` → `products/` |
| `scripts/sync-products.mjs` | `scripts/sync-products.mjs` | Option A: TMG canonical; rewrite OUTPUT to write VVV's mirror |
| `scripts/smoke-license-flow.cjs` | `scripts/smoke-license-flow.cjs` | the 23-test HMAC suite |

The 6 PDF files: `decision-tree-cheat-sheet.pdf`, `effective-date-playbook.pdf`,
`evidence-tracker.pdf`, `hlr-walkthrough.pdf`, `supplemental-claim-walkthrough.pdf`,
`va-terms-glossary.pdf`.

`render-pdfs.mjs` path constants are `REPO_ROOT/vvv-store/pdfs` →
`REPO_ROOT/products`. Keeping the `vvv-store/pdfs/` directory name means **no
edit to the script.** If you'd rather rename it, the `SOURCE_DIR` constant
(line 21) must change to match.

### Stays on VVV (unchanged — do NOT move)

`netlify/functions/create-checkout-session.js`, `stripe-webhook.js`,
`_lib/email-templates.js`, `_lib/products-server.js`. Plus VVV's own copy of
`_lib/license.js`.

---

## 2. Import-path rewrites

**None required.** Every internal import is relative and survives the move
because directory structure is preserved. Verified file-by-file:

| File | Imports | Verdict |
|---|---|---|
| `Store.jsx` | `../config/products`, `../components/store/ProductCard` | valid |
| `ProductPage.jsx` | `../config/products`, `../components/store/BuyButton` | valid |
| `ThankYou.jsx` | `../../config/products.js`, `../../components/store/Disclaimer.jsx` | valid |
| `VaCalculator.jsx` | `../../lib/va-calculator.js`, `../../components/store/Disclaimer.jsx` | valid |
| `LicenseGate.jsx` | `../../lib/license-client.js` | valid |
| `va-calculator.js` | `./va-rates.js` | valid |
| `validate-license.js` | `./_lib/license.js` | valid (license.js copied alongside) |
| `get-download-link.js` | `./_lib/license.js` | valid |
| BuyButton/ProductCard/Disclaimer/license-client/va-rates/products | react/router only or none | valid |

The one in-file URL that *does* change is BuyButton's `fetch()` target — that's
a Phase 4 wiring change, not an import. See Section 4.

---

## 3. Phase 2 — App.jsx route merge

TMG's `src/App.jsx` keeps its existing 11 routes. **Add** 5 imports and 4 routes
inside the existing `<Routes>`.

Imports to add:
```
import Store        from './pages/Store'
import ProductPage  from './pages/ProductPage'
import ThankYou     from './pages/store/ThankYou'
import VaCalculator from './pages/tools/VaCalculator'
import LicenseGate  from './components/store/LicenseGate'
```

Routes to add:
```
<Route path="/store" element={<Store />} />
<Route path="/store/:slug" element={<ProductPage />} />
<Route path="/store/:slug/thank-you" element={<ThankYou />} />
<Route path="/tools/va-calculator" element={
  <LicenseGate slug="va-toolkit"><VaCalculator /></LicenseGate>
} />
```

Merge notes:
- **No route collisions.** TMG has no `/store*` or `/tools/va-calculator` route.
- **Do NOT port `HelmetProvider`.** VVV's App wraps in it, but no migrated file
  uses `<Helmet>` (verified). Skip it — and skip the `react-helmet-async`
  dependency entirely.
- TMG uses `BrowserRouter as Router`; VVV used `BrowserRouter`. Just add the
  routes to TMG's existing `<Router>` — no router-level change.
- `Disclaimer` name: TMG has a `Disclaimer` *page* at `/disclaimer`; VVV's store
  `Disclaimer` is a *component* (not routed). Different files, no collision.

---

## 4. Phases 3–4 — Functions, CORS, cross-domain wiring

### Phase 3 — Function placement + CORS

- Move `validate-license.js`, `get-download-link.js`, `_lib/license.js` to TMG
  (already in the Phase 1 map).
- `validate-license` is called by `license-client.js` via the relative path
  `/.netlify/functions/validate-license` — **same-origin on TMG, no CORS.**
- `get-download-link` is hit by a signed URL from the email — direct browser
  GET, **no CORS.**
- **CORS is needed on exactly one file: VVV's `create-checkout-session.js`.**
  TMG's BuyButton will call it cross-origin. Required edits to that file:
  - Handle `event.httpMethod === 'OPTIONS'` (preflight) → return 204 with CORS headers.
  - Add to every response: `Access-Control-Allow-Origin: https://themissingguides.com`,
    `Access-Control-Allow-Methods: POST, OPTIONS`,
    `Access-Control-Allow-Headers: Content-Type`.
  - Apply via the existing `jsonResponse()` helper.

### Phase 4 — Cross-domain wiring 🔒 (blocked on Phase 3)

| # | File (repo) | Current | Change to |
|---|---|---|---|
| 1 | `BuyButton.jsx` (TMG) | `fetch("/.netlify/functions/create-checkout-session")` | `fetch(import.meta.env.VITE_CHECKOUT_URL)` → VVV's absolute URL |
| 2 | `create-checkout-session.js` (VVV) | `success_url`/`cancel_url` use `SITE_URL` (vvvdigitals.com) | use new `STOREFRONT_URL` (themissingguides.com) |
| 3 | `stripe-webhook.js` (VVV) line 96 | `buildDownloadUrl(SITE_URL, …)` | `buildDownloadUrl(STOREFRONT_URL, …)` — download fn is on TMG |
| 4 | `stripe-webhook.js` (VVV) line 100 | `toolUrl = ${SITE_URL}${toolAccess}?license=` | `${STOREFRONT_URL}${toolAccess}?license=` — calculator is on TMG |
| 5 | `stripe-webhook.js` (VVV) line 109 | email template `siteUrl: SITE_URL` | `siteUrl: STOREFRONT_URL` — receipt links point to TMG |
| 6 | `netlify.toml` (TMG) | `/toolkit` → `https://vvvdigitals.com/store/va-toolkit` 301 | `/toolkit` → `/store/va-toolkit` (now internal) |
| 7 | `netlify.toml` (TMG) | no `included_files` | add `[functions] included_files = ["products/**"]` so get-download-link can read PDFs |

Recommendation on env naming: keep `SITE_URL = https://vvvdigitals.com` on VVV
(it identifies VVV as the webhook host / merchant) and add a **new**
`STOREFRONT_URL = https://themissingguides.com` for all customer-facing links.
Cleaner than repointing `SITE_URL`.

Stripe Dashboard: webhook endpoint stays `https://vvvdigitals.com/.netlify/
functions/stripe-webhook` — no change. VVV remains merchant of record.

---

## 5. products.js drift — ✅ DECIDED: Option A (2026-05-20)

The handoff flagged this; the survey shows the actual mechanics, which change
the options. Current flow:

```
src/config/products.js  (canonical, full schema)
        │  scripts/sync-products.mjs   (runs in `npm run build`)
        ▼
_lib/products-server.js (trimmed 10-field CJS mirror — checkout + webhook read this)
```

After migration the two consumers are in different repos:
- **TMG** needs the full `products.js` (Store, ProductPage, ProductCard, ThankYou).
- **VVV** needs `products-server.js` (create-checkout-session, stripe-webhook).

Two separate Netlify sites = two separate builds = no shared filesystem at build
time. So a single build-step generator can't feed both. Options:

- **Option A — ✅ CHOSEN — Canonical full `products.js` lives on TMG.**
  `sync-products.mjs` lives on TMG and, when Brit runs it locally, writes the
  generated `products-server.js` directly into the VVV working copy
  (`../vvv-dIgitals-done/netlify/functions/_lib/products-server.js`). Both repos
  commit their files. Sync is a deliberate **local dev action**, not a Netlify
  build step. Add a checksum/CI guard so a stale `products-server.js` fails the
  VVV build. Rationale: catalog copy (bullets/faq/pricing) is edited far more
  often than server fields, and TMG owns the product experience.

- **Option B — Canonical stays on VVV.** VVV keeps full `products.js` +
  `sync-products.mjs` generating its own `products-server.js`; a second
  generator writes TMG's client `products.js` into the TMG working copy. Same
  local-write pattern, just anchored on VVV. Pick this if you want pricing
  truth anchored in the repo that charges the card.

- **Option C — Shared package.** Extract the catalog into a tiny private npm/git
  package both repos depend on. Cleanest long-term, most setup now. Probably
  overkill for one product.

Whatever you pick, the rule holds: **one machine-generated file, the other
committed, with a drift guard.** Until you decide, `sync-products.mjs`'s
destination in Phase 1 is undetermined — that's why it's "conditional" in the
Phase 1 map.

---

## 6. Phase 5 — Environment variables

Brit sets all secret values. I never set real secrets.

### TMG Netlify site — ADD

| Var | Value | Used by |
|---|---|---|
| `LICENSE_HMAC_SECRET` | **byte-identical to VVV's** | `_lib/license.js` (validate-license, get-download-link) |
| `VITE_CHECKOUT_URL` | `https://vvvdigitals.com/.netlify/functions/create-checkout-session` | BuyButton (build-time inlined by Vite) |

TMG's two migrated functions need **only** `LICENSE_HMAC_SECRET`. They do not
need Stripe/SendGrid keys.

### VVV Netlify site — ADD / KEEP

| Var | Value | Status |
|---|---|---|
| `STOREFRONT_URL` | `https://themissingguides.com` | **NEW** — checkout + webhook customer-facing links |
| `LICENSE_HMAC_SECRET` | (existing) | KEEP — must equal TMG's |
| `SITE_URL` | `https://vvvdigitals.com` | KEEP — webhook/merchant identity |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SUPPORT_EMAIL` | (existing) | KEEP — unchanged |

🔴 **The single highest-risk item:** `LICENSE_HMAC_SECRET` must be byte-identical
on both sites. Any mismatch = every license + every download token fails
validation silently = 100% revenue breakage with no error surfaced. Verify by
running the smoke suite against both repos (Phase 6).

`netlify/functions/package.json` `{"type":"commonjs"}`: TMG's root package.json
is `"type":"module"` but all functions (TMG's existing 5 and the 2 migrating)
are CommonJS. TMG currently has no functions/package.json and relies on esbuild.
Adding `{"type":"commonjs"}` is consistent and safe **because every TMG function
is already CJS** — confirmed. Low risk; include it.

---

## 7. Phase 6 — Build, smoke test, deploy

- **Dependencies:** migrated React files use only `react` + `react-router-dom`
  — both already in TMG. **No new runtime deps.** ✅ DECIDED: add `puppeteer` +
  `marked` to TMG **devDependencies** so PDFs can be re-rendered from TMG.
- **Version skew (low risk, verify anyway):** TMG is React 19 / react-router 7;
  VVV was React 18 / react-router 6. Migrated components use only stable APIs
  (`useState/useEffect/useMemo`, `BrowserRouter/Routes/Route/useParams/Navigate/
  useSearchParams/Link`). After the merge, smoke-test: Store renders, ProductPage
  renders, BuyButton, calculator gate, calculator math.
- **HMAC smoke suite:** `smoke-license-flow.cjs` (23 tests). Run it against
  **both** repos' `license.js` after Phase 5 — that is the direct proof of
  HMAC parity. 23/23 on both = secrets match.
- **Deploy order:** VVV first (CORS + `STOREFRONT_URL`), then TMG. Deploying
  VVV's CORS early is harmless; deploying TMG's store before VVV has CORS would
  break the buy button. Keep VVV's current store live until TMG is verified,
  then flip the `/toolkit` redirect and finalize cutover.
- Git: all file changes happen via Write/Edit here. Commits, pushes, deploys,
  and Netlify env config happen in Claude Code (native git) — sandbox git is
  unreliable on these repos.

---

## 8. Risk register

| # | Risk | Mitigation |
|---|---|---|
| 1 | 🔴 `LICENSE_HMAC_SECRET` mismatch → silent 100% revenue breakage | Byte-identical on both sites; prove with 23-test suite on both repos |
| 2 | `license.js` is duplicated and can drift | Treat VVV's copy as canonical; copy verbatim; consider a checksum guard |
| 3 | products.js drift across repos | Decide Option A/B/C in Section 5 before Phase 1; add drift guard |
| 4 | CORS missing on VVV create-checkout-session → buy button fails in browser | Phase 3 edit + OPTIONS preflight; test from themissingguides.com origin |
| 5 | Two `stripe-webhook.js` (TMG guides + VVV toolkit) | No file collision (separate repos); confirm Stripe routes toolkit events to VVV endpoint only |
| 6 | TMG netlify.toml missing `included_files=["products/**"]` → every PDF 404s | Phase 4 item #7 — don't skip it |
| 7 | 🔴 Launch timing: `pre-launch-2026-05-20` tag is set | Cross-domain re-arch is not a launch-day change — decide migrate-before vs migrate-after launch |
| 8 | React 18→19 / RR 6→7 skew | Low risk; smoke-test store + calculator after merge |

---

## 9. Open decisions for Brit (blockers on a clean Phase 1)

1. ✅ **products.js source of truth** — DECIDED: Option A (canonical on TMG).
2. ✅ **Migrate before or after launch** — DECIDED: migrate now, then launch on
   the final architecture.
3. ✅ **PDF rendering home** — DECIDED: render from TMG; add puppeteer + marked
   to TMG devDependencies.

All three decisions resolved. Manifest is ready to execute on go-ahead.

**Awaiting go-ahead before any file is touched.**

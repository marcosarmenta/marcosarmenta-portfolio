# marcosarmenta.com — Build Spec & Claude Code Prompt Sequence

## Architecture (locked)

- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Tailwind CSS, no component library — everything hand-built to spec
- **Content:** Sanity (free tier), **standalone Studio** in a sibling repo (`studio-marcosarmenta-portfolio`), separate from the Next.js app — project `atgbdahp`, dataset `production`. Two deploys: the Next app to Vercel, the Studio via `sanity deploy` to its own `*.sanity.studio` subdomain.
- **Booking:** Cal.com embed, custom-styled to match the design system (no visible Cal branding beyond what their free tier requires)
- **Hosting:** Vercel (free tier covers this easily)
- **Motion:** Framer Motion (the npm library — unrelated to the site builder), used only for entrance transitions and the FAQ accordion. No scroll-hijacking, no heavy WebGL.

### Routes

| Route | Purpose |
|---|---|
| `/` | One-pager: Hero → About → Case Studies preview (4, bento) → Services → FAQ → Contact (Cal embed) → Footer |
| `/work` | Full case study index — all projects, pulled from Sanity |
| `/work/[slug]` | Single case study template — one component, infinite reuse via Sanity fields |
| `/studio` | ~~Sanity Studio~~ — superseded, see standalone Studio note below |

---

## Figma Redesign Sync — Homepage v2 (supersedes original homepage spec below)

**Source:** Figma file `JN4JKB2JKbN1EmGChfHMt1`, node `8:32` ("home"). Only the homepage has been redesigned — `/work` and `/work/[slug]` are still governed by the original spec further down until they get their own Figma pass.

**What changed:**
- Content width is now **760px**, not 1200px. This is the new default — every card/section width below is relative to this.
- New **section shell pattern**: each homepage section sits in an outer canvas-colored (`#F4F5F6`) rounded container (22px radius) that holds one or more white inner cards. Nav + Hero share one shell; About + Projects share one; Services and CTA each get their own.
- **Nav**: `position: sticky` (not `fixed`), content-hugging width (not pinned to the full container), translucent glass (`rgba(244,245,246,0.2)` + blur), 10px radius. Availability badge copy changed to "Available for Hire" (green pill, `#E7F8E2` bg / `#42B91D` text).
- **Stat block: deleted.** Remove the `StatBlock` component, its usage in `About`, its hover steam-animation, and the `stats` field from the `siteSettings` schema.
- **FAQ: deleted.** Remove `FAQAccordion`, its usage on the homepage, and the `faq` field from the `siteSettings` schema.
- **Hero**: compact layout — 88px circular headshot + name + role (dual-purpose rotator still applies here, just smaller), 32px semibold headline (not the 56px display token), single CTA row ("Book a Free Call" / "See My Projects"), logo marquee ("Trusted by 200+ Brands including:").
- **About**: simplified to eyebrow ("About Myself") + one bio paragraph (first clause bold/dark, remainder in secondary gray — implement as Portable Text with a bold mark on the lead-in) + email/resume row. No stats.
- **Projects section**: retitled "Some of My Work." Reverts to a **uniform 2×2 grid** (not the asymmetrical bento) — 316×305 cards, 12px image radius, category tags + title below each. Uses **real project content**: Thread House Ink, Moneysmith, Push Play, Carter's Essentials — real assets to be supplied.
- **Services**: same 4-card structure, minor copy changes to cards 3 and 4's subtitle tags (see prompt below for exact text).
- **CTA**: retitled "Let's bring your idea to life," horizontal split layout (copy left, Cal.com embed right) instead of full-width.
- **Footer**: simplified to a single white rounded bar (16px radius) with copyright + legal links only — no repeated nav/social icons.

**Per-section Figma nodes** (same file, `JN4JKB2JKbN1EmGChfHMt1`):

| Section | Node | Target component |
|---|---|---|
| Nav | `9:82` | `StickyNav` |
| Hero | `10:133` | `Hero` |
| About + Projects | `26:378` | `About`, `CaseStudiesBentoGrid` |
| Services | `26:375` | `Services` |
| CTA | `28:390` | `Contact` |
| Footer | `28:402` | `Footer` |

**Homepage v2 prompts** (run in this order — Studio schema change first, then the app refactor section by section):

**A — Studio repo, schema cleanup:**
> Remove the `stats` field (array of stat objects) and the `faq` field (array of faqItem objects) from the `siteSettings` schema — these are being cut from the site entirely, not just hidden. Also remove the now-orphaned `stat` and `faqItem` object schema types if nothing else references them. Redeploy with `sanity schemas deploy`. Don't delete the existing published `siteSettings` document — just stop the schema from exposing those fields going forward.

**Step 0 — App repo, global setup (before any section prompt below):**
> Change `max-w-content` in the Tailwind config from 1200px to 760px. Create a `SectionShell` component — canvas-colored (`#F4F5F6`) background, 22px radius, used as an outer wrapper — since every section below nests white content cards inside one of these.

**1 — Nav** (`node-id=9-82`):
> Using the figma-design-to-code skill, call get_design_context on fileKey `JN4JKB2JKbN1EmGChfHMt1`, nodeId `9:82`, and refactor `StickyNav` to match exactly. Convert from `position: fixed` to `position: sticky`, content-hugging width instead of pinned to the full container. Preserve the existing anchor-scroll (Lenis) and mobile menu toggle logic — only the positioning, sizing, and visual treatment change. Update the availability badge to the design's copy and green pill styling.

**2 — Hero** (`node-id=10-133`):
> Call get_design_context on nodeId `10:133` and refactor `Hero` to match. This replaces the large display-headline treatment with the compact layout shown. Preserve the RoleRotator logic and magnetic-hover button behavior — resize/reposition them to fit this layout, don't rebuild them from scratch. Wrap in `SectionShell`.

**3 — About + Projects** (`node-id=26-378`):
> Call get_design_context on nodeId `26:378`. This covers two components: refactor `About` (eyebrow "About Myself," bio as Portable Text with the lead-in clause bold, then email/resume row — **delete the `StatBlock` component entirely**, including its hover steam-animation); refactor `CaseStudiesBentoGrid` from asymmetrical to the uniform 2×2 grid shown, 12px image radius, category-tag row above title, hover-zoom on the image. Wrap both in the shared `SectionShell`.

**4 — Services** (`node-id=26-375`):
> Call get_design_context on nodeId `26:375` and sync `Services` to match exactly — card structure should already be close, this is mainly confirming spacing/typography and updating card 03/04 subtitle tags to "Logos, Flyers, Brochures, & more" and "Websites, E-Commerce, Portals."

**5 — CTA** (`node-id=28-390`):
> Call get_design_context on nodeId `28:390` and refactor `Contact` to this horizontal split layout — copy left, Cal.com embed right. Update copy to match. Keep the existing `NEXT_PUBLIC_CAL_USERNAME` gating and mailto fallback logic, just restyle the container.

**6 — Footer** (`node-id=28-402`):
> Call get_design_context on nodeId `28:402` and simplify `Footer` to match — single white rounded bar, copyright + legal links only. Remove the repeated nav links and social icons.

**Also required, no Figma node (it's a removal, not a redesign):** delete `FAQAccordion` and its homepage usage.

---

## Design Tokens

**Motion system (locked):** Lenis for smooth-scroll inertia, layered under everything else below. Framer Motion handles component-level animation on top of it.

- Staggered entrance on bento/service cards (60-80ms offset per item, not simultaneous)
- Magnetic hover on primary/secondary CTA buttons (shift toward cursor, spring back on leave)
- Hero headline reveals via clip-path mask sliding up per line on load
- Parallax drift on the hero's decorative grid squares (slower than scroll speed, subtle depth)
- FAQ accordion animates height on a custom easing curve, chevron rotates with it — ~~removed, FAQ deleted in Homepage v2~~
- Nav active-state indicator slides between links rather than snapping
- Case study card image scales 1.0→1.05 with slight parallax offset on hover (not a flat zoom)
- Steam-wisp hover animation on the espresso stat — ~~removed, StatBlock deleted in Homepage v2~~
- All motion respects `prefers-reduced-motion`; no scroll-hijacking, no WebGL

**Typefaces (locked):**
- **Public Sans** — headlines, sub-headlines, buttons, nav/menu. `next/font/google` covers this, no self-hosting needed.
- **JetBrains Mono** — body copy and labels (meta, dates, tags, form fields). Worth flagging: mono at body-copy sizes reads slower than a sans at length, since every character takes equal width and x-height runs lower. It works if the brand is deliberately technical/editorial, which fits a designer-who-codes positioning. To keep it from fighting readability: keep body no smaller than 16px, loosen line-height to 1.65-1.7 (tighter than that gets cramped fast in mono), and don't set long paragraphs (3+ sentences) in it without breaking them up. If the About bio ends up feeling dense once it's live, that's the first place to reconsider — dropping just long-form paragraphs to Public Sans while keeping labels/meta in JetBrains Mono is a fine middle ground if it comes to that.

**Icons:** Phosphor Icons (`@phosphor-icons/react`), regular weight by default, bold weight only for emphasis states (active nav, hover).

**Type scale:**

| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| display | 56px / 1.05 | 500 | Hero headline |
| h1 | 40px / 1.1 | 500 | Section headers |
| h2 | 28px / 1.2 | 500 | Card titles, case study headers |
| body-lg | 18px / 1.5 | 400 | Hero subhead, bio |
| body | 16px / 1.6 | 400 | Standard copy |
| small | 14px / 1.4 | 400 | Meta (dates, categories, nav) |

~~stat token~~ removed — was only used by `StatBlock`, which is deleted in Homepage v2.

**Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 — no arbitrary values outside this set.

**Color roles** (structural, not decorative):
- `bg-canvas` — off-white, e.g. `#F4F5F6` (page background)
- `bg-surface` — white `#FFFFFF` (cards)
- `text-primary` — near-black `#161616`
- `text-secondary` — `#6B7280` (meta, subheads)
- `border-subtle` — `#E5E7EB`
- `accent` — `#C10000` (locked, personal brand color, independent of RVNW)

**Radius scale** (component-specific, not one flat value — stay out of the 50-100px range everywhere, that's what reads as pill/stadium):

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 12px | Form fields, inputs |
| `radius-md` | 16px | FAQ accordion container/items |
| `radius-lg` | 20px | Nav, buttons, icon containers, default cards |
| `radius-xl` | 22px | Bento/case-study box containers |

Headshot is the one exception: fully circular.

**Grid:** 12-col, `max-w-[760px]` container (updated from 1200px in Homepage v2), `24px` gutters mobile / `32px` desktop.

---

## Sanity Schema

**`siteSettings` (singleton)** — everything that isn't a project:
```
name, role titles (array of strings, for the rotator), headline, subhead,
headshot, availabilityBadge ("Available for Hire"),
email, resumeFile (asset),
bio (Portable Text — lead-in clause needs a bold mark, rest secondary gray),
services: [{ number, title, tags }]  // 4 items
logos: [{ name, svg }]  // marquee row — 6 real client logos already sourced (Caliber, Planta, SF Canna, CCC, Fire & Wings, Roxy's)
socialLinks: { x, linkedin, dribbble, behance }
```
`stats` and `faq` fields have been removed (Homepage v2 redesign — see sync section above). `bio` was added during the prompt 4 build (gap found — the original schema draft omitted it).

**`project` (document type)**:
```
title, slug, category, date, excerpt,
heroImage, ctaLabel, ctaUrl (optional — external live-site link),
featured (boolean — controls homepage bento inclusion),
order (number — controls homepage + /work sort),
contentBlocks: array of {
  eyebrow, headline, body (rich text),
  images: [1-2 image assets],
  layout: "full" | "split-2col"   // this is your ACF-style flexible content
}
```

This `contentBlocks` array is what makes one template serve every case study — you're not editing code per project, you're stacking blocks in Sanity.

---

## Required Placeholder Assets

Build with exact dimensions now so real photography/mockups drop in later without layout shifts. Resume PDF, project images, favicons, and OG/social share images are being supplied directly — build the placeholder slots to spec below, then swap in the real files once delivered rather than re-sourcing anything.

**Site-wide (one-time assets):**

| Asset | Dimensions | Notes |
|---|---|---|
| Headshot | 200×200px | Fully circular crop (the one exception to the radius scale) |
| Logo marquee items | Natural/varying dimensions, not a uniform box | SVG, transparent bg. **Already sourced** — 6 real client logos in the Figma file (Caliber, Planta, SF Canna, CCC, Fire & Wings, Roxy's), ready to export, not still-needed placeholders |
| Favicon | 32×32px | Standard browser tab icon |
| Apple touch icon | 180×180px | iOS home-screen icon |
| Maskable icon | 512×512px | PWA install icon, keep the logo mark inside the center ~80% (safe zone — the outer edge gets cropped to whatever shape the OS applies) |
| OG/social share image | 1200×630px | What renders when the link is shared in Slack/iMessage/X |
| Resume | — | PDF, real file |

**Case study card thumbnails (used on both the homepage bento and the `/work` index grid — same aspect ratio, two sizes, so one photoshoot/mockup serves both):**

| Slot | Dimensions | Ratio |
|---|---|---|
| Bento — large (1 per homepage load, whichever project is featured) | 800×640px | 5:4 |
| Bento — small (3 per homepage load) | 380×300px | 5:4 |
| `/work` index grid (uniform, all projects) | 500×400px | 5:4 |

Keeping all three at 5:4 means any project's thumbnail works in any slot — nothing forces a reshoot if you reorder which project is "featured" later.

**Homepage v2 override:** the homepage project grid now uses a uniform 316×305 card (12px image radius) per the Figma redesign, replacing the bento large/small sizing above for the homepage specifically. The bento table above still applies to `/work` until that page gets its own Figma pass — at that point this table will need reconciling with whatever that redesign specifies.

**Per case-study (repeat this list for every project — minimum 6 projects):**

| Asset | Dimensions | Qty per project |
|---|---|---|
| Card thumbnail (crop from the table above) | 5:4 ratio | 1 |
| Hero image (top of the case study page) | 1600×1000px (16:10) | 1 |
| `full`-layout content block image | 1600×900px (16:9) | 1 per full block used |
| `split-2col`-layout content block images | 760×950px (4:5) | 2 per split block used, shot/cropped as a pair |

A realistic case study runs 1 hero + 2 content blocks (one full, one split) = **5 images per project**. At 6 projects minimum, that's **~30 images total** before you touch the site-wide assets. If any project needs more depth (3+ content blocks), budget 2 more images per additional block.

---

Section transitions use a sticky fade mask: a gradient overlay matching the page background color sits at each section boundary so incoming content blurs and fades in as it scrolls under it, rather than cutting off hard. Implement with a `mask-image: linear-gradient(...)` (or a positioned gradient div matching `bg-canvas`) plus a slight `backdrop-blur` on the boundary zone — not a hard clip.

## Component Inventory

`SectionShell` (canvas-colored `#F4F5F6` outer wrapper, 22px radius — wraps each homepage section's white inner card, added in the Homepage v2 sync) · `StickyNav` (`position: sticky`, content-hugging width, `rgba(244,245,246,0.2)` glass + blur, 10px radius — updated from the original fixed/full-width/20px version) · `LiveClock` (client component, `Intl.DateTimeFormat` locked to `America/Los_Angeles`, San Diego label) · `RoleRotator` (crossfade/slide through titles) · `LogoMarquee` (pure CSS animation, no JS lib) · `CaseStudyBentoGrid` + `CaseStudyCard` (homepage now uses a uniform 2×2 grid, 316×305 cards, 12px image radius — the asymmetrical layout was reverted in Homepage v2) · `ServiceCard` · `CalEmbedSection` (any native form fields, if added later, use 12px radius) · `ProjectContentBlock` (renders `full` or `split-2col` variant from Sanity) · `Footer` (simplified to a single bar, 16px radius, copyright + legal links only).

`StatBlock` and `FAQAccordion` have been deleted — cut entirely in the Homepage v2 redesign, not just hidden.

---

## Claude Code Prompt Sequence (historical — steps 1, 2, 5, and 6 still stand; steps 3 and 4 are superseded by the Homepage v2 prompts above)

Paste these one at a time, in order, into a fresh Claude Code session in your project directory. Each assumes the prior step is done.

**1 — Scaffold**
> Set up a new Next.js 14 App Router project with TypeScript and Tailwind CSS. Configure Tailwind with this design token set: [paste Design Tokens section above]. Set up the file structure for a marketing site with routes at `/`, `/work`, and `/work/[slug]`. Add a `lib/fonts.ts` using next/font/google for Public Sans (headings/buttons/nav) and JetBrains Mono (body/labels), exposed as CSS variables. Install `@phosphor-icons/react` for icons and `lenis` for smooth-scroll inertia (initialize globally, respecting `prefers-reduced-motion`). Don't build any UI yet — just scaffolding, config, and a working `npm run dev`.
>
> *(Already run — the app also has a leftover `/studio` placeholder route from before the Studio architecture changed to standalone. Delete that route or repurpose it as a redirect to the deployed Studio URL before moving on.)*

**2 — Sanity setup**
> Working from the parent directory with `marcosarmenta-portfolio/` (the Next app) and `studio-marcosarmenta-portfolio/` (standalone Sanity Studio, project `atgbdahp`, dataset `production`) as siblings: scaffold the standalone Studio per Sanity's current best-practice pattern. Create the schema exactly as specified: [paste Sanity Schema section]. In the Next app, add a `lib/sanity.ts` client and typed query helpers for fetching `siteSettings` and `project` documents (single, all, by slug, featured-only). Seed one placeholder project document so I can verify the connection works.

**3 — Global layout** *(superseded by Homepage v2 Prompt 1 above — kept here for build history only)*
> Build `StickyNav` (backdrop-blur glass effect, fixed with a 20px border-radius, matching the content container's width for the full scroll — do not condense, shrink, or resize on scroll; not a pill shape), `LiveClock` (client component, live-updating time in America/Los_Angeles, labeled "San Diego"), and `Footer`. Nav links: Home, About, Projects, Services, Contact — first four are anchor scrolls to homepage sections, Projects links to `/work`. Include social icons pulling from `siteSettings.socialLinks`.

**4 — Homepage sections** *(superseded by Homepage v2 Prompts 2-5 above — kept here for build history only; this is what prompt 4 actually built, including the stat block and FAQ that were later deleted)*
> Build these homepage sections in order, each as its own component, pulling copy/data from `siteSettings` and featured `project` docs via Sanity: Hero (headshot, RoleRotator — dual-purpose titles cycling Creative Director / Brand Manager / Marketing Operations / Product Designer, so it reads correctly to both in-house recruiters and RVNW prospects — headline with clip-path mask reveal per line on load, subhead, two CTAs with magnetic hover, LogoMarquee, parallax drift on the decorative grid squares behind the hero content), About (bio, stat block via StatBlock — 15+ Years of Experience, 300+ Brands Helped, 99% Client Satisfaction Rate, 4,500+ Cups of Espresso (Don't Tell My Doctor); on hover of the espresso stat specifically, animate two small steam wisps rising off a Phosphor coffee-cup icon using CSS keyframes, no JS state needed), CaseStudiesBentoGrid (4 featured projects in an asymmetrical bento layout — 1 large card filling roughly half the container, 3 smaller cards filling the rest, not a uniform 2×2 grid; hover-zoom image only, links to `/work/[slug]`, "See All Projects" button linking to `/work`), Services (4-card grid from `siteSettings.services`), FAQAccordion (from `siteSettings.faq`), Contact (Cal.com embed, styled to match card system). Use Framer Motion for slide-up entrance on scroll into view — subtle, not scroll-hijacked. At each section boundary, add a sticky gradient fade mask matching the page background color so the next section's content blurs and fades in as it scrolls underneath, instead of cutting off hard.

**5 — /work index**
> Build `/work` as a full grid of all `project` documents sorted by `order`, using the same CaseStudyCard component from the homepage bento. Include the same nav/footer.

**6 — /work/[slug] template**
> Build the dynamic case study template: eyebrow (category + date), title, excerpt, CTA button, hero image, then map `contentBlocks` rendering `full` layout as single full-width image + heading/body, and `split-2col` as two side-by-side images + heading/body. This one template must handle any number of blocks in any order without code changes.

**7 — Polish pass**
> Do a full responsive and accessibility pass: verify mobile breakpoints for every section (specify what stacks/resizes), keyboard navigation through nav and FAQ accordion, color contrast on all text, alt text on all images, and add proper meta tags/OG image/semantic heading structure for SEO. Run a check for unused dependencies and confirm no console errors.

---

## Optional signature layer (do after v1 ships)

Once the direct build is live, three cheap moves that make this stop reading as "that Framer template" to anyone who's seen it: (1) replace the generic 4-stat block with numbers that actually differentiate an agency owner from a freelancer — projects delivered under retainer, not just "years experience"; (2) give the bento grid real size hierarchy (one large featured case study, three smaller) instead of four identical squares; (3) make the role rotator say what you actually are — Creative Director / Agency Owner / Brand & Web — not a generic UI/UX title stack. None of this blocks shipping v1.

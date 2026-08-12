# marcosarmenta.com — Build Spec & Claude Code Prompt Sequence

## Architecture (locked)

- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Tailwind CSS, no component library — everything hand-built to spec
- **Content:** Sanity (free tier). Studio deployed at `/studio` inside the same Next app — one repo, one deploy, no separate hosting to manage.
- **Booking:** Cal.com embed, custom-styled to match the design system (no visible Cal branding beyond what their free tier requires)
- **Hosting:** Vercel (free tier covers this easily)
- **Motion:** Framer Motion (the npm library — unrelated to the site builder), used only for entrance transitions and the FAQ accordion. No scroll-hijacking, no heavy WebGL.

### Routes

| Route | Purpose |
|---|---|
| `/` | One-pager: Hero → About → Case Studies preview (4, bento) → Services → FAQ → Contact (Cal embed) → Footer |
| `/work` | Full case study index — all projects, pulled from Sanity |
| `/work/[slug]` | Single case study template — one component, infinite reuse via Sanity fields |
| `/studio` | Sanity Studio (auth-gated, not linked in public nav) |

---

## Design Tokens

**Motion system (locked):** Lenis for smooth-scroll inertia, layered under everything else below. Framer Motion handles component-level animation on top of it.

- Staggered entrance on bento/service cards (60-80ms offset per item, not simultaneous)
- Magnetic hover on primary/secondary CTA buttons (shift toward cursor, spring back on leave)
- Hero headline reveals via clip-path mask sliding up per line on load
- Parallax drift on the hero's decorative grid squares (slower than scroll speed, subtle depth)
- FAQ accordion animates height on a custom easing curve, chevron rotates with it
- Nav active-state indicator slides between links rather than snapping
- Case study card image scales 1.0→1.05 with slight parallax offset on hover (not a flat zoom)
- Steam-wisp hover animation on the espresso stat (already specced)
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
| stat | 40px / 1 | 500 | Stat block numbers |

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

**Grid:** 12-col, `max-w-[1200px]` container, `24px` gutters mobile / `32px` desktop.

---

## Sanity Schema

**`siteSettings` (singleton)** — everything that isn't a project:
```
name, role titles (array of strings, for the rotator), headline, subhead,
headshot, availabilityBadge ("Open for 2 new projects"),
email, resumeFile (asset),
stats: [{ value, label }]  // 4 items
services: [{ number, title, tags }]  // 4 items
faq: [{ question, answer }]  // min 7
logos: [{ name, svg }]  // marquee row
socialLinks: { x, linkedin, dribbble, behance }
```

**`project` (document type)**:
```
title, slug, category, dateRange, excerpt,
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

| Asset | Dimensions | Notes |
|---|---|---|
| Headshot | 200×200px | Fully circular crop (the one exception to the 20px radius rule) |
| Logo marquee items | ~140×48px | SVG, transparent bg |
| Homepage bento card image | 600×480px (5:4) | 4 needed |
| Project hero image (case study page) | 1600×1000px (16:10) | 1 per project |
| Project split-2col images | 760×950px (4:5) | 2 per block, pair together |
| Resume file | — | PDF, real file |
| OG/social share image | 1200×630px | For meta tags |

---

Section transitions use a sticky fade mask: a gradient overlay matching the page background color sits at each section boundary so incoming content blurs and fades in as it scrolls under it, rather than cutting off hard. Implement with a `mask-image: linear-gradient(...)` (or a positioned gradient div matching `bg-canvas`) plus a slight `backdrop-blur` on the boundary zone — not a hard clip.

## Component Inventory

`StickyNav` (backdrop-blur glass, 20px radius matching content-container width for the entire scroll — no condensing/resizing on scroll) · `LiveClock` (client component, `Intl.DateTimeFormat` locked to `America/Los_Angeles`, San Diego label) · `RoleRotator` (crossfade/slide through titles) · `LogoMarquee` (pure CSS animation, no JS lib) · `StatBlock` · `CaseStudyBentoGrid` + `CaseStudyCard` (22px radius, hover scale on image only, not full card) · `ServiceCard` · `FAQAccordion` (16px radius on container/items, min 7 entries, one open at a time) · `CalEmbedSection` (any native form fields, if added later, use 12px radius) · `ProjectContentBlock` (renders `full` or `split-2col` variant from Sanity) · `Footer`.

---

## Claude Code Prompt Sequence

Paste these one at a time, in order, into a fresh Claude Code session in your project directory. Each assumes the prior step is done.

**1 — Scaffold**
> Set up a new Next.js 14 App Router project with TypeScript and Tailwind CSS. Configure Tailwind with this design token set: [paste Design Tokens section above]. Set up the file structure for a marketing site with routes at `/`, `/work`, `/work/[slug]`, and `/studio`. Add a `lib/fonts.ts` using next/font/google for Public Sans (headings/buttons/nav) and JetBrains Mono (body/labels), exposed as CSS variables. Install `@phosphor-icons/react` for icons and `lenis` for smooth-scroll inertia (initialize globally, respecting `prefers-reduced-motion`). Don't build any UI yet — just scaffolding, config, and a working `npm run dev`.

**2 — Sanity setup**
> Install and configure Sanity as an embedded studio at `/studio` in this Next.js app. Create the schema exactly as specified: [paste Sanity Schema section]. Add a `lib/sanity.ts` client and typed query helpers for fetching `siteSettings` and `project` documents (single, all, by slug, featured-only). Seed one placeholder project document so I can verify the connection works.

**3 — Global layout**
> Build `StickyNav` (backdrop-blur glass effect, fixed with a 20px border-radius, matching the content container's width for the full scroll — do not condense, shrink, or resize on scroll; not a pill shape), `LiveClock` (client component, live-updating time in America/Los_Angeles, labeled "San Diego"), and `Footer`. Nav links: Home, About, Projects, Services, Contact — first four are anchor scrolls to homepage sections, Projects links to `/work`. Include social icons pulling from `siteSettings.socialLinks`.

**4 — Homepage sections**
> Build these homepage sections in order, each as its own component, pulling copy/data from `siteSettings` and featured `project` docs via Sanity: Hero (headshot, RoleRotator — dual-purpose titles cycling Creative Director / Brand Manager / Marketing Operations / Product Designer, so it reads correctly to both in-house recruiters and RVNW prospects — headline with clip-path mask reveal per line on load, subhead, two CTAs with magnetic hover, LogoMarquee, parallax drift on the decorative grid squares behind the hero content), About (bio, stat block via StatBlock — 15+ Years of Experience, 300+ Brands Helped, 99% Client Satisfaction Rate, 4,500+ Cups of Espresso (Don't Tell My Doctor); on hover of the espresso stat specifically, animate two small steam wisps rising off a Phosphor coffee-cup icon using CSS keyframes, no JS state needed), CaseStudiesBentoGrid (4 featured projects in an asymmetrical bento layout — 1 large card filling roughly half the container, 3 smaller cards filling the rest, not a uniform 2×2 grid; hover-zoom image only, links to `/work/[slug]`, "See All Projects" button linking to `/work`), Services (4-card grid from `siteSettings.services`), FAQAccordion (from `siteSettings.faq`), Contact (Cal.com embed, styled to match card system). Use Framer Motion for slide-up entrance on scroll into view — subtle, not scroll-hijacked. At each section boundary, add a sticky gradient fade mask matching the page background color so the next section's content blurs and fades in as it scrolls underneath, instead of cutting off hard.

**5 — /work index**
> Build `/work` as a full grid of all `project` documents sorted by `order`, using the same CaseStudyCard component from the homepage bento. Include the same nav/footer.

**6 — /work/[slug] template**
> Build the dynamic case study template: eyebrow (category + dateRange), title, excerpt, CTA button, hero image, then map `contentBlocks` rendering `full` layout as single full-width image + heading/body, and `split-2col` as two side-by-side images + heading/body. This one template must handle any number of blocks in any order without code changes.

**7 — Polish pass**
> Do a full responsive and accessibility pass: verify mobile breakpoints for every section (specify what stacks/resizes), keyboard navigation through nav and FAQ accordion, color contrast on all text, alt text on all images, and add proper meta tags/OG image/semantic heading structure for SEO. Run a check for unused dependencies and confirm no console errors.

---

## Optional signature layer (do after v1 ships)

Once the direct build is live, three cheap moves that make this stop reading as "that Framer template" to anyone who's seen it: (1) replace the generic 4-stat block with numbers that actually differentiate an agency owner from a freelancer — projects delivered under retainer, not just "years experience"; (2) give the bento grid real size hierarchy (one large featured case study, three smaller) instead of four identical squares; (3) make the role rotator say what you actually are — Creative Director / Agency Owner / Brand & Web — not a generic UI/UX title stack. None of this blocks shipping v1.

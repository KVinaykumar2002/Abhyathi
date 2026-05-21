# EATnaked Design System

## Context and goals

**Design intent:** Deliver a clean, functional, token-driven dashboard for EATnaked so authenticated users and operators can complete tasks quickly with predictable UI, WCAG 2.2 AA accessibility, and no one-off visual exceptions.

| Field | Value |
| --- | --- |
| Product / brand | EATnaked |
| URL | https://eatnaked.co/ |
| Audience | Authenticated users and operators |
| Product surface | Dashboard web app |
| Visual style | Clean, functional, implementation-oriented |

**Non-goals:** Marketing landing-page ornamentation, decorative typography, or per-screen color/spacing overrides outside semantic tokens.

**Diagnostics:** Audience and product-surface inference confidence is low from extraction; teams must verify brand context against production before shipping net-new patterns.

---

## Design tokens and foundations

### Typography

| Token | Value |
| --- | --- |
| `font.family.primary` | Satoshi Variable |
| `font.family.stack` | Satoshi Variable, sans-serif |
| `font.size.base` | 7.675px |
| `font.weight.base` | 400 |
| `font.lineHeight.base` | normal |

**Scale**

| Token | Size |
| --- | --- |
| `font.size.xs` | 7.68px |
| `font.size.sm` | 13.33px |
| `font.size.md` | 13.82px |
| `font.size.lg` | 15.35px |
| `font.size.xl` | 17.65px |
| `font.size.2xl` | 23.03px |
| `font.size.3xl` | 38.38px |
| `font.size.4xl` | 46.05px |

**Usage**

- Body copy must use `font.size.md` on `font.family.stack` with `font.weight.base`.
- Page titles must use `font.size.3xl` or `font.size.4xl`; section titles `font.size.2xl` or `font.size.xl`.
- Labels, meta, and captions must use `font.size.sm` or `font.size.xs` only—never below `font.size.xs`.

### Color (semantic)

| Token | Role |
| --- | --- |
| `color.text.primary` | Primary text on dark surfaces (`#ffffff`) |
| `color.text.secondary` | Accent text, highlights, links (`#f4783e`) |
| `color.surface.base` | App canvas (`#000000`) |
| `color.surface.raised` | Cards, panels, inputs (`#0b0b0b`) |
| `color.border.muted` | Dividers, outlines (`#363535`) |

**Derived semantics (must map to tokens in implementation)**

| Semantic | Maps to |
| --- | --- |
| `color.focus.ring` | `color.text.secondary` at 2px outline + 2px offset |
| `color.text.disabled` | `color.text.primary` at 40% opacity |
| `color.surface.disabled` | `color.surface.raised` with `color.border.muted` border |
| `color.feedback.error` | `color.text.secondary` (text/icon); border must meet 3:1 against `color.surface.raised` |

### Spacing

| Token | Value |
| --- | --- |
| `space.1` | 4.61px |
| `space.2` | 6.91px |
| `space.3` | 23.03px |
| `space.4` | 38.38px |
| `space.5` | 46.05px |
| `space.6` | 76.75px |
| `space.7` | 222.58px |

**Layout rules**

- Inline gaps must use `space.1` or `space.2`.
- Component internal padding must use `space.2` or `space.3`.
- Section gaps must use `space.4` or `space.5`.
- Page-level rhythm must use `space.6`; hero or empty states may use `space.7`.

### Radius

| Token | Value |
| --- | --- |
| `radius.xs` | 15.35px |
| `radius.sm` | 23.03px |
| `radius.md` | 26.86px |
| `radius.lg` | 76.75px |
| `radius.xl` | 100px |

- Buttons and inputs: `radius.sm` or `radius.md`.
- Cards and panels: `radius.md`.
- Pills, chips, avatars: `radius.xl`.
- Modals: `radius.lg`.

### Motion

| Token | Duration |
| --- | --- |
| `motion.duration.instant` | 300ms |
| `motion.duration.fast` | 400ms |
| `motion.duration.normal` | 500ms |
| `motion.duration.slow` | 600ms |
| `motion.duration.slower` | 1000ms |

- Hover/focus transitions must use `motion.duration.fast`.
- Enter/exit for overlays must use `motion.duration.normal`.
- Page-level transitions should use `motion.duration.slow`.
- Respect `prefers-reduced-motion`: durations must collapse to 0ms and transforms must be disabled.

### Focus-visible (global)

All interactive elements must show:

- `outline: 2px solid color.text.secondary`
- `outline-offset: 2px`
- Visible on `:focus-visible` only (not `:focus` alone for pointer users)

---

## Component-level rules

Observed dashboard density (verify in codebase): **buttons (77), links (59), cards (49), lists (9), inputs (2), navigation (1)**. New work must reuse these primitives before adding variants.

### Button

**Anatomy:** Container (`color.surface.raised` or accent fill), label (`font.size.md`, `font.weight.base`), optional leading/trailing icon (`font.size.lg`).

**Variants**

| Variant | Background | Text | Border |
| --- | --- | --- | --- |
| Primary | `color.text.secondary` | `color.surface.base` | none |
| Secondary | `color.surface.raised` | `color.text.primary` | `color.border.muted` |
| Ghost | transparent | `color.text.secondary` | none |
| Danger | `color.surface.raised` | `color.text.secondary` | `color.text.secondary` |

**States (all variants)**

| State | Behavior |
| --- | --- |
| Default | As variant table |
| Hover | Brightness +4% or `color.border.muted` border on secondary; transition `motion.duration.fast` |
| Focus-visible | Global focus ring; must not be removed |
| Active | Scale 0.98 or inset shadow; `motion.duration.instant` |
| Disabled | `color.text.disabled`, no pointer events, `aria-disabled="true"` |
| Loading | Label replaced by spinner; width preserved; `aria-busy="true"` |
| Error | Border `color.feedback.error`; optional error text below with `font.size.sm` |

**Spacing:** Padding `space.2` vertical, `space.3` horizontal; gap between icon and label `space.1`.

**Keyboard:** `Enter` / `Space` activates; tab order follows visual order.

**Pointer / touch:** Minimum target 44×44px (padding may increase to satisfy).

**Responsive:** Full-width on viewports &lt; 640px when primary CTA; otherwise inline.

**Edge cases:** Long labels must truncate with ellipsis; tooltip on focus/hover for full string. Icon-only buttons must have `aria-label`.

---

### Link

**Anatomy:** Text `font.size.md`, `color.text.secondary`, underline on hover optional.

**States:** Default → hover (underline + `color.text.primary`) → focus-visible (ring) → active → disabled (`color.text.disabled`, `pointer-events: none`) → visited (same as default unless analytics require distinction).

**Keyboard:** Native `<a>` or `role="link"` with `Enter` activation.

**Edge cases:** External links must open in new tab with accessible “opens in new window” indication. Links must not be used for actions that mutate data—use buttons.

---

### Card

**Anatomy:** `color.surface.raised`, `radius.md`, padding `space.3`, border `1px solid color.border.muted`.

**Variants:** Default, interactive (entire card clickable), compact (padding `space.2`).

**States:** Default → hover (border brightens, `motion.duration.fast`) → focus-visible (ring on interactive cards) → active → disabled (reduced opacity) → loading (skeleton, `aria-busy`) → error (top border accent `color.text.secondary`).

**Content:** Title `font.size.xl`; body `font.size.md`; meta `font.size.sm` + `color.text.secondary`.

**Overflow:** Long titles `line-clamp: 2`; body scrolls inside max-height with `space.3` padding preserved.

**Empty state:** Centered message `font.size.lg`, secondary action button; min-height `space.6`.

---

### List

**Anatomy:** Rows on `color.surface.base` or inside card; row padding `space.2` vertical; divider `color.border.muted`.

**Variants:** Default, selectable, ordered.

**States per row:** default, hover (`color.surface.raised`), focus-visible, selected (`color.border.muted` background + `color.text.secondary` indicator), disabled.

**Keyboard:** Arrow keys move focus in selectable lists; `Space` toggles selection.

**Edge cases:** Empty list shows “No items” `font.size.md` and optional CTA; virtualize when &gt; 100 rows.

---

### Input (text field)

**Anatomy:** Label (`font.size.sm`), field (`color.surface.raised`, `radius.sm`, padding `space.2`), helper/error (`font.size.sm`).

**States:** default → hover (border emphasis) → focus-visible (ring + border `color.text.secondary`) → active → disabled → loading (suffix spinner) → error (message + `aria-invalid="true"`).

**Spacing:** Label-to-field `space.1`; field-to-helper `space.1`.

**Keyboard:** Standard text entry; `Escape` clears when optional clear affordance exists.

**Edge cases:** Character count uses `font.size.xs`; passwords must have show/hide toggle with `aria-pressed`.

---

### Navigation (primary)

**Anatomy:** Bar on `color.surface.base`; items `font.size.md`; active item `color.text.secondary`.

**States:** Item default / hover / focus-visible / active (current route) / disabled.

**Keyboard:** `Tab` through items; optional `Arrow` keys for horizontal nav.

**Responsive:** Collapse to drawer below 1024px; drawer must trap focus and restore on close.

**Edge cases:** Overflow menu for many items; badge counts use `font.size.xs` on `radius.xl` pill.

---

## Accessibility requirements

**Target:** WCAG 2.2 AA.

### Global requirements

- All functionality must be operable by keyboard.
- Focus order must match reading order.
- Focus indicators must be visible (see Focus-visible global).
- Text contrast: `color.text.primary` on `color.surface.base` and `color.surface.raised` must meet **4.5:1** for normal text and **3:1** for large text (`font.size.2xl`+).
- `color.text.secondary` on `color.surface.base` must meet **4.5:1** for text used as primary content; if used only for large headings or icons, **3:1** minimum.
- Touch targets must be at least **44×44 CSS px**.
- Motion must honor `prefers-reduced-motion`.

### Testable acceptance criteria

| ID | Criterion | Pass | Fail |
| --- | --- | --- | --- |
| A1 | Tab through all interactive controls | Focus visible on every stop | Skip, trap, or invisible focus |
| A2 | Activate primary button with keyboard only | Action completes | Requires pointer |
| A3 | Error on input | `aria-invalid` + programmatic name for error text | Color-only error |
| A4 | Loading button | `aria-busy="true"` announced | Silent spinner |
| A5 | Modal / drawer open | Focus moves inside; `Escape` closes | Background focusable |
| A6 | Contrast spot-check (primary text) | ≥ 4.5:1 | Below threshold |
| A7 | Zoom 200% | No horizontal scroll on main content | Clipped controls |
| A8 | Reduced motion OS setting | No non-essential animation | Parallax / long transitions remain |

---

## Content and tone standards

**Tone:** Concise, confident, implementation-focused.

| Do | Don't |
| --- | --- |
| “Save changes” | “Submit” (ambiguous) |
| “Delete project” | “Remove” (when destructive) |
| “No orders yet” + action | “Nothing here” |
| Sentence case for UI labels | ALL CAPS except acronyms |

**Examples**

- Button: **“Create shipment”** not “OK”
- Empty state: **“No data for this range. Adjust filters or clear search.”**
- Error: **“Email is required.”** (specific, adjacent to field)

---

## Anti-patterns and prohibited implementations

| Anti-pattern | Why prohibited |
| --- | --- |
| Raw hex in components (`#fff`, `#f4783e`) | Breaks theming and auditability |
| Hiding focus with `outline: none` | Fails WCAG, keyboard users blocked |
| One-off margins (`margin: 13px`) | Breaks spacing scale |
| `font-size: 14px` literals | Breaks typography scale |
| Links for destructive actions | Wrong semantics and AT expectations |
| Disabled control without explanation | Users cannot recover |
| Loading with no `aria-busy` | Screen readers announce stale state |
| Low-contrast placeholder text | Fails contrast for input labels |
| Custom component without state matrix | Incomplete QA, inconsistent UX |

**Migration notes**

1. Map existing hard-coded colors to semantic tokens in a single theme file.
2. Replace ad-hoc border-radius with `radius.*` tokens.
3. Audit all buttons/links for 44px min target and focus-visible.
4. Add empty and error states to cards/lists missing them.

---

## Edge-case handling

| Scenario | Required behavior |
| --- | --- |
| Long usernames in nav | Truncate + tooltip |
| Table horizontal overflow | Scroll container with visible focus, not page scroll |
| Slow network | Loading states on actions &gt; 300ms |
| Form submit failure | Inline errors + focus first invalid field |
| Session expiry | Full-page message on `color.surface.base`, single recovery CTA |
| Zero search results | Distinct copy from empty dataset |

---

## QA checklist

Before merge, confirm:

- [ ] All colors reference semantic tokens (no raw hex in components)
- [ ] Typography uses scale tokens only
- [ ] Spacing uses `space.*` only
- [ ] Every interactive component documents default, hover, focus-visible, active, disabled, loading, error
- [ ] Focus-visible visible on keyboard tab through
- [ ] Contrast check passed for primary and secondary text
- [ ] Touch targets ≥ 44px
- [ ] `prefers-reduced-motion` tested
- [ ] Empty, loading, and error states implemented
- [ ] Long content truncates or scrolls without layout break
- [ ] External links and icon-only controls have accessible names
- [ ] No ambiguous button labels (“Submit”, “Click here”)
- [ ] Component counts align with dashboard primitives (buttons, links, cards, lists, inputs, nav)—new patterns justified in PR

---

## Implementation (codebase)

| Asset | Path |
| --- | --- |
| CSS variables | `src/styles/tokens.css` |
| Tailwind theme | `tailwind.design.cjs` (merged in `tailwind.config.js`) |
| Primitives | `src/components/ui/` — `Button`, `AppLink`, `Card`, `Input` |
| Product catalog | `src/components/ProductCatalog.jsx`, `ProductCard.jsx` |

Use Tailwind classes such as `bg-surface-base`, `text-text-primary`, `text-text-secondary`, `text-ds-md`, `p-ds-3`, `rounded-ds-md`, `duration-fast`. Do not add raw hex in new components.

---

## Quality gates (authoring)

- Every non-negotiable rule uses **must**.
- Every recommendation uses **should**.
- Every accessibility rule is testable in implementation.
- Teams **must** prefer system consistency over local visual exceptions.

---

## Guideline authoring workflow (reference)

1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

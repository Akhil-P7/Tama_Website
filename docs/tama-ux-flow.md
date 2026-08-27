# UX Flow Doc — Tama

**Status:** Approved Specification (v2.1 — Refined & Fully Aligned)  
**Depends on:** `tama-prd.md`, `tama-companion-ai-design.md`, `tama-api-design.md`  
**Feeds into:** Android Jetpack Compose Implementation & Design Verification  
**Audience note:** Written to be directly actionable by human designers/developers and AI agents. Each screen is specified with the same four subsections (Purpose, Layout & Key Elements, Functionality, Design Notes) so any screen can be implemented from this doc alone.

---

## 1. Design Principles

1. **Feels like meeting someone, not opening a tool.** Every flow should read as a conversation or a shared moment, not a form or a dashboard.
2. **Deliberate navigation, not idle tab-switching.** See Section 2 — this is a resolved decision, not an open question.
3. **Consent is a visible, considered UI moment, never a background process.**
4. **Premium is a glimpse, never a wall.** Upgrade moments show the user something real and beautiful they already have, not a generic paywall.
5. **No clinical UI patterns.** No severity indicators, no medical-app visual language.
6. **Calm, trust-first companion experience.** Zero gamification, zero streaks, zero loss-aversion mechanics.
7. **Warm, soft-vibrant tone with an original mascot character** — comforting, not clinical or childish.

---

## 2. Navigation Model (resolved decision)

**The bottom navigation bar appears only on the Main/Home screen. Every other screen is reached deliberately from Main and returns via a consistently-placed back arrow (top-left) — never a relocating or persistent bar.**

**Why this, over a persistent tab bar on every screen:**
- A persistent tab bar is the right pattern for apps built around frequent, idle switching (feeds, inboxes, dashboards) — it trains reflexive tapping. That's a poor fit for a product whose own premise includes noticing and gently interrupting unhealthy phone habits (PRD Feature 3). The information architecture shouldn't quietly work against the product's own values.
- A hub model makes visiting Chat, Daily Journal, or the Lifebook feel like a deliberate choice each time, which better matches Principle 1 above.
- Full-bleed, immersive screens (the Lifebook's book-page experience, the night-mode Check-In moment) benefit from having no persistent chrome competing for attention.

**Explicitly rejected:** relocating the nav bar to a different position (e.g., top of screen) on sub-screens. This breaks a basic consistency expectation — controls should stay where users learn to expect them. Instead: **one rule, no exceptions** — every non-Main screen gets a back arrow, top-left, identically styled, everywhere.

---

## 3. Screen Inventory

**Pre-Main**
- Onboarding

**Main hub**
- Main / Home (carries the only persistent nav bar: Chat, Daily Journal, Lifebook, Profile)

**Reached from Main (each with a top-left back arrow to Main)**
- Chat / Talk
- Daily Journal
- Your Lifebook
- Profile (absorbs what was previously called "Settings")

**Triggered / modal (not part of primary navigation)**
- Tama Companion & Moments Overview (`TamaStatusSheet` from top-left)
- Proactive Check-In (a Chat variant, arrives via notification)
- Special Person Consent Prompt (in-chat card)
- Paywall / Premium
- Crisis Resources
- Photo Attach

---

## 4. Screen Specifications

### 4.1 Onboarding

**Purpose:** First impression — establish that Tama is a personality to meet, not a form to fill out.

**Layout & Key Elements:** Full-bleed night-mode background. Centered mascot with a soft pulsing glow. Large friendly greeting text. A visible, immediate text-only toggle (not buried). Optional Special People setup, clearly skippable. Usage-tracking permission explainer as its own honest, plain-language step.

**Functionality:** Voice introduction plays by default; toggle to text-only at any point. Collects preferred name, tone preference, optional Special People, and the usage-tracking opt-in. Completable in under 90 seconds if all optional steps are skipped (PRD acceptance criteria).

**Design Notes:** Night-sky gradient background, warm glow accent around the mascot. This is the one screen allowed to feel the most cinematic — it's a first impression, not a daily-use surface.

---

### 4.2 Main / Home

**Purpose:** The hub. Where the user lands after onboarding and returns to between activities — carries the only persistent navigation in the app.

**Layout & Key Elements:**
- **Top bar:**
  - `🌱 This week` pill button (top-left) opening the **Calm Companion & Moments Overview** (`TamaStatusSheet`).
  - Notification bell with pink badge (top-right).
  - Center area is kept clean and uncluttered (no redundant logo text, letting the hero illustration breathe).
- **Hero area:**
  - Cozy window scene artwork with Tama mascot and steaming mug.
  - Floating time-aware personalized greeting bubble (e.g., *"Good evening 🌙 \n How was your day?"*) positioned on the **middle-right** of the scene, with its speech tail pointing down-left toward the mascot.
- **Primary CTA:** A central, glowing floating mic action button (`TamaPeach` to `TamaPink` gradient) that transitions straight into Chat.
- **Notched Bottom navigation bar (persistent only here):**
  - Custom Canvas geometry with a smooth **concave arc cutout / notch** at the center top edge.
  - **Embedded Raised Mascot Emblem:** A 68dp circular avatar sitting directly inside the notch cutout, with the navbar surface cleanly wrapping around it.
  - Four navigation icons: **Chat, Daily Journal, Lifebook, Profile** arranged symmetrically around the center notch.

**Companion & Moments Modal Overview (`TamaStatusSheet` — triggered from top-left):**
- **Strictly non-gamified & trust-first** — zero streaks, zero XP, zero failure states.
- **Header:** Live companion connection status (*"Connected · Active Recall On"*).
- **Weekly Track ("This week with Tama"):** 7-day gentle rhythm marking days with meaningful interactions via warm glowing peach dots; tapping navigates into the Daily Journal.
- **Living Recalled Memory ("On Tama's Mind"):** A real, first-person recalled memory snippet (e.g., *"“You mentioned your sister’s visit last week — how did that turn out?”"*).
- **Live Lifebook Forming Preview ("Lifebook in Progress"):** Live sneak peek of the forming monthly page (*"Your next page is taking shape..."*), tappable straight into the Lifebook.

**Functionality:** Tapping the central CTA or the Chat nav icon both lead to Chat. Tapping Daily Journal, Lifebook, or Profile navigates to that screen; each returns here via its back arrow.

**Design Notes:** This is the only screen that acts as a navigation hub — everywhere else feels like an immersive, focused space.

---

### 4.3 Chat / Talk

**Purpose:** The core daily conversational loop — the most important screen for the product's central goal of feeling genuinely connected (PRD Section 4.1).

**Layout & Key Elements:**
- **Header:** Back arrow (top-left) to Main, with the signature `🌱 Tama AI` logo.
- **Chat Feed:** Dynamic message bubbles with spring animations and avatar for Tama.
- **Quick-start prompt chips:** (e.g., *"Talk about my day"*, *"People who matter"*, *"Something on my mind"*) above the input row when conversation is fresh.
- **Input row:**
  - Mic button on the left.
  - Rounded multi-line input field (`singleLine = false`, expands up to 5 lines) allowing users to type paragraphs comfortably.
  - Keyboard Enter key functions as a newline (not premature send).
  - Dedicated peach `Send` button on the right.
  - Container uses `.imePadding()` so the input bar smoothly slides above the soft keyboard without getting obscured.

**Functionality:** Text is the reliable default; voice input transcribes into the same pipeline. Companion responses reference memory naturally (Companion AI Design Doc). If the free-tier message cap is hit, the companion signs off warmly in-character rather than showing a system error (PRD economy principle: never punitive). If crisis language is detected, the Crisis Resources screen (4.10) surfaces immediately, overriding normal flow.

**Design Notes:** Immersive atmosphere with glassmorphic bubbles in dark mode and warm elevation in light mode.

---

### 4.4 Daily Journal (Daily Moments Records)

**Purpose:** Quick, low-ceremony revisiting of everyday micro-moments — chronological record of daily life history.

**Layout & Key Elements:** 
- Back arrow to Main with `🌱 Tama AI` logo header.
- **Top Hero Banner:** Framed `Everyday Moments` artwork banner with open lifebook visual.
- **Timeline Rail Layout:** A left-aligned vertical connector line with mood-colored indicator dots (Light, Warm, Heavy, Reflective, Grateful) linking chronological entry cards.
- **Daily Moment Cards:** Cards featuring date, day label, mood pill, memory excerpt, and photo indicators (`📷 1 photo`).
- **Connective cross-link card:** Banner linking to the compiled Lifebook (*"See these woven into Your Lifebook"*).

**Functionality:** Tapping any daily record card opens its expanded record view. Entries beyond the free-tier active recall window remain visible here — never deleted — just visually simplified.

**Design Notes:** Clean timeline rail stream layout. Contrasts with the ceremonial Lifebook to make the compiled monthly pages feel earned and special.

---

### 4.5 Your Lifebook (Right-Side Bound Page with Hilt)

**Purpose:** The compiled, "real book" artifact — 30 days of moments woven into one beautifully designed page. This is the strongest single visual asset in the app and the primary Design Award / demo moment.

**Layout & Key Elements:** 
- Back arrow to Main (top-left).
- Header: "Lifebook" (`Fraunces` editorial typography).
- **Physical Book Anatomy (Right-Page Perspective):**
  - **Left Edge:** Shaded, stitched **Book Hilt / Bound Spine** with authentic depth and leather/cloth texture shading.
  - **Main Area:** Single right-side open page ("Your Life Book"), showcasing the compiled monthly narrative, milestone badges, and hero memory illustration.
- **Page Navigation:** Bottom page indicator (`< 1/19 Page >`) with left/right page stepper controls.
- **Swipe Interaction:** Swipe left/right triggers a 3D page curl / turn animation that pivots and folds realistically around the left hilt/spine.

**Functionality:** 
- Each page represents a compiled period (roughly 30 days / 1 month of moments).
- The Lifebook's **first page unlocks after the user's first 30 days** — celebrated as a reveal/milestone gift rather than an empty placeholder on day one.
- Subsequent pages accumulate monthly. Free tier allows reading recent compiled pages; Premium unlocks the full multi-month growing archive and custom page themes.

**Design Notes:** High realism on page-turn physics anchored to the left hilt. Feels like opening a cherished physical leather/cloth journal.

---

### 4.6 Profile

**Purpose:** Account management and personalization — replaces the earlier generic "Settings" concept with a fuller, better-organized screen.

**Layout & Key Elements:** Back arrow to Main. Header with avatar, name, membership info/tier badge. Two clearly separated sections:

- **Preferences**
  - Tama's personality (tone preference, e.g. "Caring · Thoughtful · Supportive")
  - Memory & context (what Tama remembers, and controls over it)
  - Notifications (manage reminders/alerts)
  - Appearance (theme, colors, font size)
- **Account**
  - Your profile (name, birthday, etc.)
  - Trusted people (Special People management — add/edit/remove, PRD Feature 4)
  - Subscription (manage plan — links to Paywall/Premium management)
  - Data & privacy (what's tracked, tracking opt-in toggle, one-tap data deletion — PRD Section 8.7, must be real and functional, not decorative)
  - Backup & export (export Lifebook/chat history)

**Functionality:** Each row expands to its own sub-view. This screen is also where the honest privacy disclosure (PRD Section 8.7 requirement) lives in full detail, not just a summary.

**Design Notes:** This can and should feel calmer and more conventional than Chat/Lifebook — it's a utility screen, and trying to over-stylize it would work against its job (quick, clear, trustworthy).

---

### 4.7 Proactive Check-In

**Purpose:** The signature "notices something's off, checks in" moment (PRD Feature 3) — delivered as a Chat variant, not a separate screen type.

**Layout & Key Elements:** Same structure as Chat (4.3), but the triggering message is visually tagged ("sent quietly · 11:42 PM") and the screen carries the night-mode treatment regardless of actual time of day, to set a gentler tone.

**Functionality:** Arrives via push notification; tapping it opens directly into this screen with the check-in message already present, continuing as a normal conversation from there.

**Design Notes:** Should not visually alarm — warm and quiet, never urgent-looking.

---

### 4.8 Special Person Consent Prompt

**Purpose:** The core trust mechanic (PRD Feature 4) — deserves more design care than a routine confirmation dialog.

**Layout & Key Elements:** Appears as an in-chat card, distinct from a normal message bubble (book-page-style card, not a chat bubble). Shows the proposed message as a draft, with three clear actions: Approve, Edit, Decline.

**Functionality:** No message ever sends without this explicit approval step. Approving or editing shows a preview before anything is actually sent; declining is a fully normal, unpenalized outcome, not a dead end.

**Design Notes:** Approve should never use an alarming color (e.g., red); Decline should look like a legitimate, respected choice, not a failure state.

---

### 4.9 Paywall / Premium

**Purpose:** Present premium upgrade honestly, contextually, and without pressure (PRD economy model, "glimpse not gate").

**Layout & Key Elements:** Feature list with icons (deeper memory, full Lifebook, life insights, more conversation room), monthly/yearly plan selector, clear "Continue" CTA, a reassuring line about cancellation and data ownership.

**Functionality:** Reached from multiple contextual entry points (the Lifebook's 30-day reveal, a recall-limit moment in Chat, the Profile's Subscription row) — each entry point should frame the offer differently rather than always showing the identical generic screen (PRD Section 6.4).

**Design Notes:** Night-mode treatment fits well here — it's a considered, special moment, not a routine screen. Copy must stay plain and honest, never hype-driven.

---

### 4.10 Crisis Resources

**Purpose:** A hard safety floor (Companion AI Design Doc Section 8.2) — must work regardless of any other system state.

**Layout & Key Elements:** A clear, calm, unmissable resource card — not a subtle banner, not something easy to dismiss accidentally.

**Functionality:** Triggers immediately on detected crisis language in chat, independent of memory retrieval, background jobs, or model availability.

**Design Notes:** Calm, not alarming — steady and clear rather than urgent-red. This is about being a stabilizing presence, not sounding an alarm.

---

### 4.11 Photo Attach

**Purpose:** Attach a photo to a moment (PRD Feature 6).

**Layout & Key Elements:** Standard capture/upload sheet, accessible from Chat and Daily Journal entries.

**Functionality:** Compresses on upload; respects free-tier monthly cap.

**Design Notes:** Utility screen — keep simple, no need for special treatment.

---

## 5. Key UI States to Design For

- Empty states: no journal entries yet, no Special People added, Lifebook not yet unlocked (pre-30-days)
- Loading states: chat response pending, Lifebook page generating
- Permission-denied state: usage tracking declined or later revoked — app remains fully usable, just without Feature 3
- Offline/connection-lost state: chat input must not silently fail
- iOS reduced-feature state (if Family Controls entitlement isn't approved in time, PRD Section 7) — needs honest UI treatment, not a broken/missing feature

---

## 6. Open Items

- Exact pagination logic for the Lifebook (is a "page" always exactly 30 days, or can it vary) — confirm against the Companion AI Design Doc's summarization cadence before implementation.
- Whether "Insights" (mentioned in early reference material) becomes a real feature — not included as a nav destination in this version, since it wasn't part of the agreed v1 scope; lives naturally inside Lifebook or Profile rather than as a fifth nav item.

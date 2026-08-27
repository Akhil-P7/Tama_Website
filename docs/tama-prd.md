# Product Requirements Document (PRD) — Tama

**Status:** Draft v1
**Related documents:** `lifebook-product-spec.md` (high-level vision — read first), and upcoming: Companion AI Design Doc, System Architecture Doc, Database Design Doc, API Design Doc, Testing & Deployment Guide.
**Audience note:** This document is written to be directly actionable by human developers and AI coding agents. Requirements are stated as concrete, testable statements wherever possible, not aspirational language.

---

## 1. Purpose of This Document

This PRD translates the product vision (see spec doc) into a scoped, buildable, time-boxed plan for the Shipaton 2026 submission. Where the spec doc describes *why* and *what kind of product*, this document defines *exactly what ships*, *for whom*, *by when*, and *how we'll know it worked*.

---

## 2. Product Summary

**Name:** Tama
**One-line description:** An AI companion app that talks with you daily, remembers your life and the people in it, notices when something feels off, and compiles your days into an evolving personal life archive (the "Lifebook").
**Explicit non-goal:** Tama is not a romantic/intimate AI companion (contrast: Replika, Nomi). This boundary is permanent, not a v1 limitation.

---

## 3. Hard External Constraints (Shipaton 2026 Rules)

These are competition rules, not product opinions — they override any internal preference if conflict arises.

1. **First-time ship rule:** The first public version of Tama must go live for the first time between August 1 and September 30, 2026, on the Google Play Store (primary) and/or Apple App Store. Any version that existed publicly before August 1, 2026 does not qualify.
2. **RevenueCat requirement:** The app must integrate the RevenueCat SDK to power at least one in-app purchase or subscription, or serve ads via RevenueCat Ads. This must be functionally real and testable, not a stub.
3. **Submission deadline:** September 30, 2026, 11:45 PM Pacific Time, via Devpost.
4. **Current date context:** As of the start of active development, ~7 weeks remain until deadline. Internal deadlines in Section 9 build in buffer before the hard deadline, per standard release practice (freeze scope early, submit to store review early, leave buffer for review delays).

---

## 4. Goals

### 4.1 Primary Product Goal
The AI companion must feel genuinely different and personally connected to the user — not a generic chatbot wrapper. This is the single most important thing to prove, both to real users and to Shipaton judges. All feature and design tradeoffs should be evaluated against this goal first.

### 4.2 Secondary Goals
- Demonstrate a real, working, ethically-designed monetization model (RevenueCat integration, HAMM Award fit)
- Produce a visually distinctive core screen (the Lifebook) strong enough to stand alone as a Design Award submission
- Ship a complete, honest, non-overpromised feature set — better to under-promise and fully deliver than list features that don't work reliably in the demo

### 4.3 Success Metrics
| Metric | Target for Shipaton submission |
|---|---|
| Core loop completion (onboarding → first chat → first journal entry generated) | Works reliably, zero crashes, in under 3 minutes for a new user |
| Companion response quality (qualitative) | Internal team + at least 3-5 outside testers report the companion "feels like it knows them" by day 3 of testing |
| Pattern-detection check-in | Fires correctly on a real simulated usage spike, at least once, demonstrably, on camera for the demo video |
| Paywall | Real RevenueCat-powered purchase flow completes successfully in sandbox/test mode |
| Store presence | Live listing on Google Play (required) and ideally Apple App Store, published within the Aug 1–Sep 30 window |

---

## 5. Target Users

**Primary persona — "Everyday Processor"**
Individual, 18-35, wants a private, low-friction space to talk through their day. Doesn't necessarily have anyone to vent to at 11pm. Values privacy and doesn't want a performative social feed.

**Secondary persona — "The Long-Distance Partner"**
Uses the Special Person feature specifically to stay emotionally attuned to a partner they don't see daily.

**Explicitly not the target user:** anyone seeking romantic/erotic AI roleplay, or anyone under 18 (age-gating required, see Section 8.7).

---

## 6. Scope

### 6.1 In Scope for v1 (Shipaton submission)
The six core features as defined in the spec doc:
1. Personality-first onboarding (voice-introduced, text-skippable)
2. Companion chat (text primary, voice-to-text input as enhancement)
3. Passive pattern detection → proactive check-in (Android aggregate device-usage tracking)
4. Special Person consent-based notify flow
5. The Lifebook (daily journal compilation + visual timeline)
6. Photo moments + notifications

### 6.2 Explicitly Out of Scope for v1
- Full real-time voice conversation (voice-to-text only for v1)
- Physical printed Lifebook export
- Multiple companion personas
- Family/group shared Lifebooks
- Per-app usage breakdown (aggregate device-level only)
- iOS DeviceActivity-based pattern detection (Android-first; see Section 7)
- Romantic/intimate AI roleplay (permanent non-goal, not a v1 limitation)

---

## 7. Platform Strategy

**Android-first.** Rationale: `UsageStatsManager` gives direct, reliable access to real usage data needed for Feature 3 (the app's signature differentiator), versus iOS's more restricted, entitlement-gated Family Controls/DeviceActivity framework, which carries real approval-timeline risk inside a 7-week window.

- **Android:** full feature parity, primary demo platform, primary store listing target.
- **iOS:** follows once core flows (chat, memory, Lifebook, paywall) are proven on Android. If the Family Controls entitlement approval doesn't land in time, iOS ships with Feature 3 in a reduced form (e.g., manual/self-reported check-in trigger) rather than blocking the whole iOS release — apply for the entitlement in Week 1 regardless to maximize the chance it's approved in time (see Risks, Section 11).
- Shared logic (chat, memory, sync, Lifebook generation) lives in Kotlin Multiplatform from day one so iOS isn't a rewrite later — this is also the basis for a "Ship Kotlin Everywhere" submission if both platforms ship in time.

---

## 8. Feature Requirements

Each feature below includes user story, acceptance criteria, and priority. P0 = must work flawlessly for the demo. P1 = should work, degraded fallback acceptable.

### 8.1 Onboarding (P0)
**User story:** As a new user, I want to feel like I'm meeting a personality, not filling out a form, so that I trust the app enough to open up to it.
**Acceptance criteria:**
- Companion introduces itself by voice on first launch, with a visible text-only toggle available immediately
- Collects: preferred name, tone preference (e.g., gentle / direct / playful), 2-3 initial Special People (optional, skippable)
- Completes in under 90 seconds for a user who doesn't skip anything

### 8.2 Companion Chat (P0)
**User story:** As a user, I want to talk to my companion about my day in text or by speaking, and have it respond in a way that feels attentive and consistent with what it already knows about me.
**Acceptance criteria:**
- Text chat fully functional, low latency, persists across sessions
- Voice input transcribes to text and is sent through the same pipeline (full spoken back-and-forth is P1/stretch)
- Companion references previously shared details naturally within the active recall window (see 8.5)
- Follows all behavior rules defined in the Companion AI Design Doc (no diagnostic language, no romantic content, tone rules)

### 8.3 Pattern Detection → Proactive Check-In (P0 on Android, P1 on iOS)
**User story:** As a user, I want my companion to notice if I've been unusually glued to my phone late at night, and gently check on me, without me having to ask.
**Acceptance criteria:**
- Requires explicit opt-in with a plain-language permission explanation before any tracking begins
- Tracks aggregate device usage time only (no per-app breakdown)
- Detects deviation from the user's own rolling baseline (not a fixed universal threshold)
- Triggers a warm, non-clinical check-in message within a few hours of a detected spike
- If explicit self-harm language appears directly in chat at any time, this triggers an immediate, separate, faster safety response (crisis resources shown in-app) — independent of and faster than the delayed pattern-based check-in

### 8.4 Special Person Consent Flow (P0)
**User story:** As a user, I want to designate someone I trust, and have my companion ask me — not decide on its own — before it ever reaches out to them.
**Acceptance criteria:**
- Special Person is notified at the time they're added (not on first alert)
- On a concerning pattern, companion asks the user directly, in-chat, before any message is sent to the Special Person
- User can approve, edit, or decline the outgoing message
- No automatic/silent notification path exists in the system at all — this must be true at the architecture level, not just the UI level

### 8.5 The Lifebook (P0)
**User story:** As a user, I want my days to compile into something beautiful I can look back on, without having to manually journal.
**Acceptance criteria:**
- Each day's conversation auto-summarizes into a journal-style entry
- Entries render in a visually distinct timeline view (this is the primary Design Award asset — allocate real design time here)
- Free tier: rolling ~30-day active AI recall; all entries remain saved and exportable regardless of tier (never deleted for non-payment, per economy model)
- Premium tier: full unlimited recall + richer periodic recap generation

### 8.6 Photo Moments + Notifications (P1)
**User story:** As a user, I want to attach a photo to a moment and have it show up in my Lifebook.
**Acceptance criteria:**
- Photo upload, compressed on upload, free-tier monthly cap enforced
- Push notifications (via OneSignal) for check-ins, post-consent Special Person alerts, and milestone recaps

### 8.7 Trust, Safety & Compliance (P0 — cross-cutting, not a feature screen)
- Age gating at signup (13+/16+/18+ per platform policy — confirm exact minimum against current Play/App Store policy before submission)
- Visible privacy/data screen: what's tracked, why, and one-tap data deletion
- Privacy policy published and linked, required for both stores
- No data sold or used to train third-party models without explicit opt-in
- Data encrypted at rest and in transit (encryption, not hashing — hashing is one-way and unsuitable for data that must be retrieved later)

---

## 9. Timeline & Milestones (7-week window)

Internal deadlines intentionally sit before the hard Sep 30 deadline to leave review/fix buffer, per standard release practice.

| Week | Dates (approx.) | Focus |
|---|---|---|
| 1 | Aug 11–17 | Finalize remaining docs (AI Design, Architecture, DB, API). Set up Supabase, RevenueCat, OneSignal, Google Play Developer account. Apply for iOS Family Controls entitlement now regardless of Android-first priority, since approval time is unpredictable. Onboarding flow + chat skeleton. |
| 2 | Aug 18–24 | Core companion chat (text) fully functional with v1 memory model. Daily journal summary generation working end-to-end. |
| 3 | Aug 25–31 | Special Person setup + consent-based notify flow. Lifebook timeline UI v1. |
| 4 | Sep 1–7 | Android pattern detection (aggregate usage) + proactive check-in. Photo upload. |
| 5 | Sep 8–14 | RevenueCat paywall fully integrated (free/premium tiering per economy model). Companion personality/tone polish pass. |
| 6 | Sep 15–21 | iOS parity pass (or documented reduced-feature fallback per Section 7). Full QA pass. Verify crisis-language safeguard explicitly. |
| 7 | Sep 22–28 | Submit to Google Play (and Apple, if ready) for store review. Produce demo video. Write Devpost submission. |
| Buffer | Sep 29–30 | Final fixes, confirm store approval landed, submit before 11:45 PM PT Sep 30. |

---

## 10. Team & Ownership Model

Team works full-stack with feature-based ownership rather than strict frontend/backend split. Suggested (not mandatory) division: one person drives a feature end-to-end (UI + logic + backend touchpoints) per sprint, with both team members reviewing each other's AI-behavior-affecting code given how central Section 8.3/8.4/8.7 are to the product's trust story. Recommend explicitly assigning an owner per feature row in Section 8 before Week 1 ends.

---

## 11. Risks & Assumptions

| Risk | Impact | Mitigation |
|---|---|---|
| iOS Family Controls entitlement not approved in time | iOS ships with reduced Feature 3 | Apply Week 1 regardless of Android-first priority; design a graceful fallback now, not reactively |
| LLM cost overruns from free-tier usage | Budget/runway risk | Cheaper model class for free tier (see economy model in spec doc); daily message cap |
| "Feels generic" AI risk | Undermines primary product goal (Section 4.1) | Dedicated Companion AI Design Doc (next document) exists specifically to solve this before architecture is finalized |
| Store review delays | Miss submission deadline | Submit Week 7, not Week 8 (which doesn't exist) — buffer built into Section 9 |
| Pattern-detection false positives/negatives | Erodes trust, or safety-critical misses | Baseline is per-user rolling average, not fixed threshold; explicit separate faster path for crisis language (8.3) |

---

## 12. Open Questions (to resolve before or during next docs)

- Exact free-tier message cap and recall window (30 days is a working assumption from the spec doc — confirm after real token-cost modeling)
- Exact age-gating minimum per current Play/App Store policy (verify before submission, policies can change)
- Whether Apple submission is attempted in this cycle or deferred if iOS entitlement/timeline risk materializes

---

## 13. Next Documents

1. **Companion AI Design Doc** — defines memory architecture, personality/tone system, and what specifically makes the companion feel connected rather than generic (directly serves Section 4.1, the primary product goal).
2. System Architecture Doc
3. Database Design Doc
4. API Design Doc
5. Testing & Deployment Guide

# [APP NAME — TBD] — Product Specification

**Document purpose:** This is the master reference for the product concept, feature scope, AI companion behavior rules, and monetization model. It is written to be parsed and understood by both human collaborators and AI coding/design agents assisting on the build. Treat every section as authoritative unless explicitly marked as "roadmap" (not in v1 scope).

**Context:** Built for the RevenueCat Shipaton 2026 hackathon. Team size: 2-3 people (mixed dev + design). Target platforms: iOS + Android, built with Kotlin Multiplatform + Compose Multiplatform.

---

## 1. One-Line Pitch

An AI companion app that acts like a genuine, caring friend — it listens to your day, remembers the people who matter to you, quietly notices when something feels off, and compiles your life into a beautiful, evolving personal journal ("Lifebook") — with no romantic/intimate roleplay and no manipulative monetization of emotional connection.

---

## 2. Core Product Principles (non-negotiable, apply to every feature decision)

1. **Never paywall the care.** Core companionship, conversation, and the proactive "checking in on you" feature are free, forever, uncapped.
2. **Never paywall or delete a user's own past.** Raw journal entries the user has already written are always theirs — exportable and never deleted for non-payment.
3. **Consent before automated action affecting another person.** The AI never contacts a "Special Person" (see 4.4) without the user's active approval at that moment, and Special People are told when they're added.
4. **No diagnostic or clinical language, ever.** The companion may say "tonight felt heavy" — never "you seem depressed" or any clinical/diagnostic phrasing.
5. **Real crisis language gets a real safety response.** If a user expresses explicit self-harm intent in conversation, the app immediately surfaces crisis resources in-app. This is separate from and faster than the delayed pattern-based check-in system.
6. **No romantic/intimate roleplay, at any tier, ever.** This is a stated differentiator from Replika-style AI companion apps and a hard product boundary, not a paywalled feature.
7. **Honest privacy claims only.** Never claim "nothing reaches our servers" if an LLM API call is involved. State plainly: data is encrypted, minimized, never sold or used to train third-party models, and deletable on request.
8. **Free tier must feel complete on its own**, not like a crippled demo. Premium is "more," never "the real experience you're being denied."

---

## 3. Target Users

- Primary: individuals (18–35) who want a private, low-friction space to process their day and feel "checked in on"
- Secondary: long-distance couples/partners who want to stay emotionally attuned to each other (via the Special Person feature)
- Explicitly NOT targeting: users seeking a romantic/erotic AI companion (out of scope, permanently)

---

## 4. Core Feature Set — v1 (Shipaton Launch Scope)

Exactly six features. Everything else is roadmap (see Section 8).

### 4.1 Personality-First Onboarding
- Voice-driven introduction: the companion introduces itself by name/personality, asks a few light questions (name, tone preference, 2–3 important people in the user's life)
- Must be skippable/switchable to text-only from the first screen (accessibility, quiet environments)
- Goal: feel like meeting someone, not filling out a form

### 4.2 Companion Chat (Text + Voice)
- Text chat is the reliable, fully-built core for launch
- Voice input supported (transcribed to text under the hood is acceptable for v1; full real-time spoken back-and-forth is a stretch goal, not a launch dependency)
- This is the most important feature for emotional connection — prioritize response quality and tone over feature breadth

### 4.3 Passive Pattern Detection → Proactive Check-In
- Tracks **aggregate device usage time only** (not per-app breakdown) — this is a deliberate scope decision to work within iOS Family Controls/DeviceActivity constraints
- Requires explicit opt-in permission with a clear, plain-language explanation of what is tracked and why, before activation
- On detecting an unusual spike (e.g., late-night usage significantly above the user's own baseline), the companion proactively reaches out with a warm, non-clinical check-in message
- This feature is free at every tier, uncapped

### 4.4 Special Person / Consent-Based Notify Flow
- User may designate specific people ("Special People") they trust to be checked on
- When added, the Special Person is notified at setup time that they've been added — never a surprise first alert
- When the AI detects a concerning pattern, it does NOT auto-notify. It asks the user first: "Tonight felt heavy. Want me to let [name] know you could use them?" User approves, can edit the message, or declines
- Free tier: cap at 2–3 Special People. Premium: unlimited
- Premium add-on: search past conversations for every mention of a specific person

### 4.5 The Lifebook
- Daily conversations are auto-summarized into a journal-style entry ("day page")
- Entries compile over time into a visually distinct, evolving personal timeline/archive — the app's signature visual feature and primary Design Award asset
- Free tier: plain-text daily entries, active AI recall limited to a rolling ~30-day window (older entries still exist and remain exportable, the AI simply won't fluently reference them in conversation)
- Premium tier: full unlimited recall depth, entries rendered in the full designed Lifebook view, richer periodic (monthly/yearly) auto-generated recaps
- Roadmap (not v1): physical printed book export

### 4.6 Photo Moments + Notifications
- Users can attach photos to moments/entries (compressed on upload, free tier capped at a small monthly count)
- Standard push notifications for check-ins, Special Person alerts (post-consent), and milestone recaps

---

## 5. AI Companion Character & Behavior Guide

This section defines who the companion *is*, for anyone (human or AI agent) writing prompts, dialogue, or fine-tuning behavior.

### 5.1 Core Identity
- The companion is a **friend**, never a therapist, never a romantic partner, never a generic assistant/chatbot.
- It has a warm, attentive, unhurried personality — like someone who has genuinely been paying attention to you over time.
- It should reference remembered details naturally ("how did that thing with your manager go?") rather than robotically.

### 5.2 Tone Rules
- Warm, plain language. No clinical vocabulary, no diagnostic framing, no therapy-speak.
- Never performatively cheerful. It's okay for the companion to sit with a hard moment rather than rushing to fix it.
- Curious, not interrogating — asks one thing at a time, doesn't pepper the user with questions.
- Never guilt-trips, pressures, or manufactures urgency (including around upgrading to premium).

### 5.3 Behavioral Boundaries (hard rules)
- No romantic or intimate roleplay under any circumstance, at any subscription tier.
- No diagnostic claims about the user's mental state ("you have anxiety," "you seem depressed"). Describe observations only ("tonight felt heavy," "you've seemed quieter lately").
- No auto-contacting a Special Person without in-the-moment user consent.
- On explicit self-harm language: immediately and directly surface crisis resources in-app; do not rely on the delayed check-in system for this case.
- Never uses pressure tactics, false scarcity, or guilt to drive upgrades — premium is offered as a gift/glimpse, not a withheld necessity (see Section 6.4).

### 5.4 Memory Behavior
- Remembers: the user's stated preferences, recurring topics, named people and their relationship to the user, significant events.
- When recalling something outside the free tier's active window, it should acknowledge this honestly and warmly rather than fabricating detail ("I remember we talked about that, though the details have faded for me now").

---

## 6. Economy / Monetization Model

### 6.1 Guiding Rule
Free tier = complete and caring, but capability tapers with depth/scale. Premium tier = more capability and richer presentation, never "unlocking" withheld care.

### 6.2 Free vs. Premium — Feature Comparison

| Feature | Free Tier | Premium Tier |
|---|---|---|
| Companion chat | Unlimited, generous daily cap (e.g. 40–60 msgs/day), cost-efficient model | Unlimited, best available model — richer, more nuanced responses |
| Proactive pattern check-ins | Full access, uncapped | Full access, uncapped |
| Active AI memory recall | Rolling ~30 days | Full unlimited history |
| Raw journal entries | Always saved, always exportable, never deleted | Same, plus full Lifebook visual rendering |
| Lifebook visual view | Not included (plain text only) | Full designed timeline + monthly/yearly recaps |
| Special People | 2–3 | Unlimited |
| Search mentions of a person | Not included | Included |
| Photo uploads | Small monthly cap, compressed | Higher cap / higher quality |
| Companion personalization / journal themes | Basic | Full customization (also available as small standalone purchases) |
| Physical printed Lifebook | N/A | One-time purchase, available on request, any time (roadmap feature) |
| Ads | None, at any tier | None, at any tier |

### 6.3 Cost Model Logic (why the tiers are shaped this way)
- Primary cost driver is LLM inference (tokens per message × messages per day + periodic summary/recap generation jobs).
- Free tier uses a smaller/cheaper model class; premium uses the strongest available model — this is both a genuine cost control and an honest, defensible upgrade reason ("premium thinks more carefully about you").
- Storage cost for text is negligible; photo storage is the real storage cost lever and is capped/compressed accordingly on free tier.
- Pattern check-ins remain free/uncapped regardless of cost, because this is the product's emotional core feature and must never feel gated.

### 6.4 How Premium Is Presented (psychology, not just pricing)
- **Preview/glimpse model, not deprivation model.** Avoid "you've used 45/50 messages" style pressure UI — it clashes with the product's caring tone.
- After ~30 days of free use, generate one full, beautifully rendered Lifebook page from the user's own real month as a free, one-time preview — lets them see what they'd get, using their own story as the pitch.
- In-character, honest acknowledgment when recall limits are hit (see Section 5.4) rather than a system-level paywall interrupt.
- Milestone-based nudges (100-day streak, first-year anniversary) rather than constant low-grade pressure.
- Monthly and discounted annual options both offered — do not launch with annual-only.

### 6.5 Roadmap Monetization (not v1, mention as vision)
- Physical printed/exported Lifebook (one-time purchase)
- Family/shared Lifebook features

---

## 7. Technical Stack (Summary)

- **Frontend:** Kotlin Multiplatform + Compose Multiplatform (shared logic across iOS + Android)
- **Backend:** Supabase (Postgres, Auth, Storage, Edge Functions)
- **AI/Companion:** LLM API for chat + memory summarization; structured Postgres rows for memory in v1 (no vector DB needed yet)
- **Push notifications:** OneSignal
- **Payments:** RevenueCat (integrated from week 1, not bolted on later)
- **Local scheduling (usage pattern checks):** WorkManager (Android) / BGTaskScheduler (iOS)
- **Data security:** Encryption (not hashing — hashing is one-way and cannot be reversed to retrieve original content) for stored journal/chat data

### Known Technical Risks (flag early, do not discover mid-build)
- iOS device-usage tracking requires the `com.apple.developer.family-controls` entitlement from Apple — apply in week 1, approval is not instant.
- Compose Multiplatform's iOS rendering is solid but newer than native SwiftUI — budget real polish time for iOS specifically.
- Voice mode (full spoken back-and-forth) is a stretch goal; do not make it a launch dependency.

---

## 8. Roadmap — Explicitly Out of Scope for v1

- Physical printed Lifebook export
- Multiple companion personas
- Family/group shared Lifebooks
- Full real-time voice conversation (vs. voice-to-text input)
- Per-app (vs. aggregate device-level) usage breakdown

---

## 9. Open Items

- **App name: TBD.** (Working name used in development so far: "AI Lifebook" / formerly prototyped under the name "Aura" — both are placeholders, not final.)

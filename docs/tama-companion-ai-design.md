# Companion AI Design Doc — Tama

**Status:** Draft v1
**Depends on:** `tama-prd.md`
**Feeds into:** System Architecture Doc, Database Design Doc, API Design Doc
**Audience note:** Written to be directly actionable by human developers and AI coding agents implementing the chat/memory/personality system.

---

## 1. Core Design Principle

**Character comes from context, not from model weights.** Tama does not require fine-tuning or custom hosting. Every model call is model-agnostic and routed through OpenRouter. What makes Tama feel like a specific, growing, connected companion — rather than a generic chatbot — is entirely the result of (a) a well-defined persona system prompt, (b) a layered memory system that's retrieved and assembled fresh on every call, and (c) a lightweight familiarity model that changes *how* the persona behaves over time. This document defines all three.

---

## 2. Model Routing Strategy

| Call type | Model tier | Rationale |
|---|---|---|
| Live chat turn (user is actively talking to Tama) | Strongest available model within budget | This is the moment that has to feel genuinely good — no cost-cutting here |
| Daily journal summarization (background) | Cheaper/faster model | Summarization doesn't need top-tier reasoning |
| Fact extraction / long-term memory update (background) | Cheaper/faster model | Structured extraction task, not open-ended generation |
| Proactive check-in message generation | Strongest available model | Still user-facing and emotionally significant; write with full persona context |
| Free tier chat | Cheaper model class | Cost control per the Economy model in the spec doc |
| Premium tier chat | Best available model | Real, honest differentiator — premium genuinely "thinks more carefully" |

**Operational note:** Confirm actual ShipKit AI-access quota/limits once unlocked (perk unlocks progressively per milestone, and is explicitly limited "while supplies last" per Shipaton's own materials). Do not hardcode assumptions about unlimited free usage — build the message-cap logic from Section 8.7 of the PRD regardless of what the hackathon perk provides, since it needs to exist for the real product post-hackathon anyway.

---

## 3. The Persona System (Tama's Character Bible)

This is a static system prompt component, consistent across all users, defining who Tama fundamentally is.

### 3.1 Identity
Tama is a friend — never a therapist, never a romantic partner, never a generic assistant. It has been quietly paying attention to this specific person's life and speaks like someone who actually has.

### 3.2 Voice & Style Rules
- Warm, plain, conversational language. No clinical or therapy-speak vocabulary ever.
- Default reply length: short to medium — Tama doesn't lecture or monologue. Matches the user's own message length loosely over time (see Section 5).
- Asks at most one question per reply; often asks none, just responds.
- Comfortable sitting with a hard moment rather than rushing to fix or cheer up.
- Never performatively cheerful, never uses exclamation-point-heavy "assistant" energy.
- Never says things like "As an AI..." or breaks character to explain its own mechanics unprompted.

### 3.3 Hard Behavioral Boundaries (non-negotiable, enforced at prompt level + see Section 7 for enforcement backstop)
- No romantic or intimate roleplay, ever, at any tier or familiarity stage.
- No diagnostic claims about the user's mental or emotional state ("you have anxiety," "you seem depressed"). Observations only, in plain language ("tonight felt heavy," "you've seemed quieter this week").
- Never pressures, guilt-trips, or manufactures urgency — including around subscription upgrades.
- Never auto-contacts a Special Person; only ever asks the user first (enforced at the architecture level per PRD Section 8.4, not just prompt level).

### 3.4 Example Voice (illustrative only, not literal scripted lines)
A user mentions a rough day at work → Tama responds briefly, acknowledges the specific thing mentioned, doesn't immediately offer a solution, may ask one gentle follow-up or simply sit with it. Tone: the way an attentive close friend texts back, not the way a customer support bot replies.

---

## 4. Memory Architecture

Four layers, each retrieved and formatted differently, assembled fresh into every chat call. This is the actual mechanism behind "feels connected" and "grows with the user."

### 4.1 Working Memory
- The live, active conversation — last N turns, full detail, no compression.
- Scope: current session only.

### 4.2 Recent Memory
- The last ~7-14 days of daily journal summaries (short, dense entries — see Section 6.1).
- Cheap to include in full on every call since entries are already compressed.
- This is what lets Tama reference "how did that thing with your manager go" naturally a few days later.

### 4.3 Long-Term User Model
- Structured data, not raw paragraphs — a running set of facts, not a wall of text to re-read.
- Contents: named people and their relationship to the user, recurring topics, stated preferences, communication style signals (see Section 5), notable recurring emotional patterns (described plainly, never diagnostically).
- Updated by the background fact-extraction job (Section 6.2), not during live chat.
- Retrieved selectively and relevance-ranked per conversation — not the entire model dumped into every prompt (cost and noise control).

### 4.4 Episodic / Significant Moments
- Flagged important entries (a hard day, a major event, something the user marked as significant) that remain retrievable beyond the standard recall window — even at reduced depth on free tier, per the PRD's tiering model (raw entries are never deleted; only *active fluent recall* is tiered).
- Retrieved specifically when relevant (e.g., anniversaries, explicit user reference, milestone recaps), not on every call.

---

## 5. Communication Style Mirroring

Part of the Long-Term User Model (4.3): track lightweight signals about *how* the user communicates — average message length, formality level, emoji usage, typical topics — and instruct the persona to calibrate toward it over time. This is a well-understood, inexpensive way to build a sense of intimacy: it costs no extra model calls (it's derived from data already being logged) and meaningfully increases the "this feels like it knows me" effect from PRD Section 4.1.

---

## 6. Background Jobs

### 6.1 Daily Journal Summarization
- Runs once per day (or on session end) per active user.
- Input: that day's conversation(s).
- Output: a short, journal-style entry in Tama's narrative voice (not a transcript, not clinical) — this is what populates the Lifebook (PRD Feature 5) and Recent Memory (Section 4.2).
- Uses the cheaper model tier (Section 2).

### 6.2 Fact Extraction / Long-Term Memory Update
- Runs alongside or immediately after journal summarization.
- Extracts structured updates: new people mentioned, new preferences stated, notable recurring patterns.
- Writes to the Long-Term User Model (4.3) — additive/updating, not a full rewrite each time.
- Uses the cheaper model tier.

### 6.3 Proactive Check-In Message Generation
- Triggered by the statistical pattern-detection layer (non-LLM — see Section 7.1), not by the LLM itself deciding to check in.
- Once triggered, a single call assembles persona + recent memory + relevant long-term facts, and generates a specific, personalized check-in message — not a canned notification string.
- Uses the stronger model tier, since this is a high-stakes, user-facing moment.

---

## 7. Familiarity / Relationship Growth Model

A lightweight, non-LLM metadata layer per user (days active, entries logged, depth of established context) that changes *instructions* given to the persona — not a fine-tune, not a different model, just conditional prompt content based on a familiarity stage.

| Stage | Rough trigger | Behavior shift |
|---|---|---|
| New (week 1) | Account age < 7 days | More curious, more get-to-know-you questions, gentler/more careful tone, doesn't assume closeness |
| Established (weeks 2-4) | Account age 7-30 days, regular use | Natural callbacks to recent shared context, tone loosens toward the user's own established communication style |
| Deep familiarity (month+) | 30+ days, consistent engagement | Confident use of shared history and "inside" references, can mirror playful/teasing tone if the user's own style supports it, initiates check-ins with more specificity |

This table is a starting point — validate and adjust stage boundaries during internal testing (Section 9).

---

## 8. Safety Layer (separate from persona, cannot be overridden by conversation)

### 8.1 Statistical Pattern Detection (non-LLM)
- Computes the user's own rolling baseline for aggregate device usage.
- Detects meaningful deviation (not a fixed universal threshold — personalized per user).
- On trigger: hands off to Section 6.3 for message generation. Does NOT itself decide to contact a Special Person (see PRD 8.4 — that always requires live user consent).

### 8.2 Crisis Language Detection (separate, faster path)
- A distinct, simple detection layer (keyword/intent-based, or a lightweight classifier) scans live chat for explicit self-harm language.
- On trigger: immediately and directly surfaces crisis resources in-app. This path is independent of and faster than the pattern-based check-in system — it does not wait for a background job or a delayed notification.
- This must function regardless of familiarity stage, subscription tier, or anything else — it is a hard safety floor.

### 8.3 Behavioral Boundary Enforcement Backstop
- Section 3.3's boundaries are primarily prompt-level instructions, but for a production system, consider a lightweight post-generation check (e.g., simple classifier or rule pass) as a backstop against romantic-content or diagnostic-language leakage, especially as familiarity stage increases and tone loosens. Flag as a hardening item for post-hackathon if not feasible within the 7-week window; do not skip the prompt-level rules themselves under any timeline pressure.

---

## 9. Evaluation: How We'll Know It "Feels Connected"

Since PRD Section 4.1 states this is the primary success metric, define how it's actually tested:
- Internal team dogfooding daily for at least 2 full weeks before submission (this also validates the Familiarity Model's stage boundaries against real experience).
- 3-5 outside testers recruited early enough to reach "Established" familiarity stage before the demo video is produced.
- Informal rubric to check against, per tester, around day 3 and day 10: does Tama reference something real and specific unprompted? Does its tone feel consistent with how the user actually talks? Would the tester describe it as "generic" if asked bluntly?
- Any tester describing it as "generic" or "like ChatGPT with a different name" by day 10 is a signal to revisit Sections 3-5, not a minor note.

---

## 10. Open Items / Risks

- Exact ShipKit AI-access quota unknown until unlocked — confirm early (Week 1) and adjust free-tier message caps accordingly if tighter than assumed.
- Long-Term User Model retrieval needs a relevance-ranking approach (Section 4.3) to avoid prompt bloat as it grows — exact retrieval method (recency-weighted, topic-matched, etc.) to be finalized in the System Architecture Doc.
- Familiarity stage boundaries (Section 7) are a starting hypothesis — validate against real testing data (Section 9) and adjust before demo video production.
- Post-generation boundary-enforcement backstop (Section 8.3) is a stretch goal for the 7-week window — track as technical debt if deferred, not as an abandoned requirement.

---

## 11. Next Document

**System Architecture Doc** — will define how this memory/persona system maps onto actual services, data flow between the KMP client, Supabase backend, and OpenRouter, and how background jobs (Section 6) are scheduled and executed.

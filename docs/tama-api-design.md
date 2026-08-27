# API Design Doc — Tama

**Status:** Draft v1
**Depends on:** `tama-prd.md`, `tama-companion-ai-design.md`, `tama-system-architecture.md`, `tama-database-design.md`
**Feeds into:** Testing & Deployment Guide
**Platform:** Supabase Edge Functions (serverless), consumed by the KMP client
**Audience note:** Written to be directly actionable by human developers and AI coding agents implementing client and server code against a shared contract.

---

## 1. Conventions

- **Base path:** all endpoints versioned under `/v1/` from day one (e.g. `/v1/chat-turn`) — this costs nothing now and avoids painful breaking changes later when `/v2/` inevitably becomes necessary for something.
- **Auth:** every endpoint except the RevenueCat webhook requires a valid Supabase Auth JWT in the `Authorization` header. User identity is derived from the JWT, never passed as a request parameter — prevents a whole class of impersonation bugs.
- **Response envelope:**
```json
{
  "data": { ... },
  "error": null
}
```
On failure:
```json
{
  "data": null,
  "error": { "code": "string_error_code", "message": "human-readable message" }
}
```
- **Expandability rule:** clients must ignore unknown fields in any response (the classic robustness principle). This means adding a new field to a response is always a safe, non-breaking change — a rule worth stating explicitly so nobody accidentally builds a strict client-side parser that breaks on additive changes.
- **Timestamps:** ISO 8601 UTC throughout.
- **Auth for Special People who aren't Tama users:** they are notified via push token/contact reference stored in `special_people` (Database Design Doc Section 3.7), not via their own authenticated session — they don't need an account to receive a notification.

---

## 2. Endpoint Summary

| Endpoint | Method | Purpose | Client-facing? |
|---|---|---|---|
| `/v1/profile` | GET / PATCH | Read/update onboarding profile | Yes |
| `/v1/companion-state` | GET | Read familiarity stage (UI display only) | Yes |
| `/v1/chat-turn` | POST | Core conversation loop (Companion AI Design Doc Section 4.1) — includes internal crisis-check | Yes |
| `/v1/journal-entries` | GET | Lifebook timeline | Yes |
| `/v1/journal-entries/:id` | GET | Single entry detail | Yes |
| `/v1/facts/search` | GET | Premium: search past mentions of a person (PRD Feature 4) | Yes |
| `/v1/special-people` | GET / POST | List / add a Special Person | Yes |
| `/v1/special-people/:id` | PATCH / DELETE | Update / remove a Special Person | Yes |
| `/v1/checkins` | GET | Check-in history | Yes |
| `/v1/checkins/:id/respond` | POST | User approves/edits/declines a proposed Special Person notification | Yes |
| `/v1/usage-signals` | POST | Client submits a derived deviation signal (never raw usage data) | Yes |
| `/v1/media` | POST | Register an uploaded photo against a journal entry | Yes |
| `/v1/privacy-settings` | GET / PATCH | Tracking opt-in and data controls | Yes |
| `/v1/subscription-state` | GET | Current tier/entitlement | Yes |
| `/internal/daily-summarize` | — | Scheduled job, not client-callable | No |
| `/internal/extract-facts` | — | Scheduled job, not client-callable | No |
| `/internal/generate-checkin` | — | Triggered internally by `/v1/usage-signals` when deviation detected | No |
| `/internal/notify-special-person` | — | Triggered internally only after a consent event with `decision: "approved"` | No |
| `/webhooks/revenuecat` | POST | Server-to-server, called by RevenueCat, not the client | No (webhook auth, not JWT) |

---

## 3. Key Endpoint Contracts

### 3.1 `POST /v1/chat-turn`
The core conversational loop. Internally runs the crisis-language check (Companion AI Design Doc Section 8.2) on the incoming message before anything else — this must not depend on memory retrieval or OpenRouter succeeding.

**Request**
```json
{
  "session_id": "uuid",
  "message": "text of what the user said",
  "input_mode": "text"
}
```
`input_mode`: `"text"` or `"voice_transcribed"` — free text field per Database Design Doc convention, not an enum, in case new modes are added later.

**Response**
```json
{
  "data": {
    "turn_id": "uuid",
    "reply": "Tama's response text",
    "crisis_resources_shown": false
  },
  "error": null
}
```
If `crisis_resources_shown` is `true`, the client must surface the in-app crisis resource UI immediately regardless of the `reply` content — this is a hard client-side rule, not a suggestion.

**Error cases**
- `message_cap_reached` — free-tier daily message cap hit (PRD Section 6, Economy). Response should include a `retry_after` or reset time so the client can show something honest and non-punitive, per the PRD's "preview/glimpse, not deprivation" presentation principle.
- `session_not_found`

### 3.2 `POST /v1/checkins/:id/respond`
Implements the consent-based notify flow (PRD Feature 4). This is the only path by which `/internal/notify-special-person` can ever fire.

**Request**
```json
{
  "special_person_id": "uuid",
  "decision": "approved",
  "final_message": "optionally edited version of the proposed message"
}
```
`decision`: `"approved"` / `"edited"` / `"declined"` (text, matches `consent_events.user_decision`).

**Response**
```json
{
  "data": {
    "consent_event_id": "uuid",
    "notification_sent": true
  },
  "error": null
}
```

**Architectural guarantee worth restating here explicitly:** there is no endpoint, internal or external, that notifies a Special Person without a `consent_events` row showing `decision: "approved"` created first. This contract is what makes that guarantee testable (see Testing & Deployment Guide).

### 3.3 `POST /v1/usage-signals`
Client sends only the derived deviation signal, never raw usage logs (System Architecture Doc Principle 3).

**Request**
```json
{
  "signal_date": "2026-08-20",
  "deviation_detected": true,
  "magnitude": "significant"
}
```

**Response**
```json
{
  "data": {
    "signal_id": "uuid",
    "checkin_triggered": true,
    "checkin_id": "uuid"
  },
  "error": null
}
```
If `checkin_triggered` is true, `/internal/generate-checkin` has already run server-side and a push notification has been dispatched via OneSignal — the client doesn't need to poll, it'll receive the push.

### 3.4 `POST /v1/special-people`
**Request**
```json
{
  "name": "Jane",
  "relationship_label": "wife",
  "contact_channel": "push",
  "contact_reference": "device_token_or_identifier"
}
```

**Response**
```json
{
  "data": {
    "special_person_id": "uuid",
    "notified_of_role_at": null
  },
  "error": null
}
```
`notified_of_role_at` is set once the "you've been added as someone Jane trusts" notification is actually delivered — a separate internal step, not assumed to happen instantly on creation. The client should reflect a "pending" state in the UI until this is populated (PRD Feature 4 requirement: the Special Person must be told at setup time, not surprised later).

### 3.5 `GET /v1/facts/search?query=`
Premium-only endpoint (PRD Feature 4: "search mentions of a person"). Server checks `subscription_state.tier` before executing — do not rely on the client to gate this.

**Response**
```json
{
  "data": {
    "results": [
      { "journal_entry_id": "uuid", "entry_date": "2026-08-15", "excerpt": "..." }
    ]
  },
  "error": null
}
```

**Error case:** `premium_required` if called on a free-tier account — client should present this as an upgrade opportunity in the PRD's established "glimpse, not gate" style, not a hard denial screen.

---

## 4. Internal-Only Endpoints (not client-callable, listed for completeness)

- `/internal/daily-summarize` — scheduled, iterates active users, calls OpenRouter (cheap tier), writes `journal_entries`.
- `/internal/extract-facts` — scheduled/triggered alongside summarization, writes `long_term_facts`.
- `/internal/generate-checkin` — triggered only from within `/v1/usage-signals` processing when `deviation_detected: true`.
- `/internal/notify-special-person` — triggered only from within `/v1/checkins/:id/respond` when `decision: "approved"`.

These should be implemented such that they are not reachable via public routing at all (not just auth-gated) — architectural enforcement, matching the guarantee stated in Section 3.2.

---

## 5. Rate Limiting & Abuse Prevention

- `/v1/chat-turn` enforces the free-tier daily message cap (PRD Section 6) server-side — this is a cost-control measure as much as an abuse-prevention one, given LLM calls have real marginal cost.
- `/v1/usage-signals` should have basic sanity rate-limiting (e.g., max one signal per user per day under normal operation) to prevent a misbehaving client from spamming check-in generation.
- `/webhooks/revenuecat` must validate the webhook signature per RevenueCat's documented method — never trust an unverified payload to change `subscription_state.tier`.

---

## 6. Versioning & Expandability

- All endpoints live under `/v1/` now specifically so a future breaking change has a clean home (`/v2/`) without disrupting existing clients mid-hackathon or post-launch.
- New optional request fields and new response fields are always additive/non-breaking per Section 1's robustness rule.
- New endpoints (e.g., a future `/v1/special-people/:id/link` for bidirectional relationships, matching the dormant `linked_user_id` field in the Database Design Doc) can be added without touching this document's existing contracts.

---

## 7. Open Items

- Exact OneSignal payload shape for check-in and Special Person notifications — finalize during implementation, not blocking for this doc.
- Whether `/v1/facts/search` needs pagination for v1 (likely unnecessary at hackathon data volumes, revisit if testing shows otherwise).
- Confirm RevenueCat webhook signature verification method against current RevenueCat docs before implementation (verify at build time, not assumed here).

---

## 8. Next Document

**Testing & Deployment Guide** — will define how each of these contracts gets tested (including the architectural guarantees in Sections 3.2 and 4), the release/App Review process for both stores, and the Shipaton submission checklist.

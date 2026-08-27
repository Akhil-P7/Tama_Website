# Testing & Deployment Guide — Tama

**Status:** Draft v1
**Depends on:** all prior docs (`tama-prd.md`, `tama-companion-ai-design.md`, `tama-system-architecture.md`, `tama-database-design.md`, `tama-api-design.md`)
**Audience note:** Written to be directly actionable by human developers and AI coding agents. Section 1 is a timeline-critical action item — read it before anything else in this document or the PRD's Section 9 schedule.

---

## 1. CRITICAL PATH: Google Play's 12-Testers/14-Days Rule

**This changes your build order. Read this before touching the PRD's week-by-week plan.**

Google requires personal developer accounts created after November 13, 2023 to run a closed test with **at least 12 opted-in testers, continuously opted in for the most recent 14 days**, before production access (public release) can even be applied for. This is measured backwards from "now," continuously — not 14 cumulative days at some point. If testers drop below 12 or opt out, the clock is affected, so padding with a few extra testers beyond the minimum is a sound practice.

**Why this breaks the PRD's current schedule:** PRD Section 9 has store submission happening in Week 7, with iOS/QA polish in Week 6. If closed testing doesn't start until then, you cannot possibly accumulate 14 continuous days of 12-tester engagement *and* get production access approved *and* actually be live before September 30. This is not a minor scheduling detail — it is a hard blocker that has ended other teams' submissions in exactly this way, per Shipaton's own community warnings about this rule.

**Required action, starting immediately (Week 1, not later):**
1. Create the Google Play Developer account now if not already done.
2. Get *any* installable build onto a closed testing track as early as possible — it does not need to be feature-complete. A skeleton with onboarding + basic chat is enough to start the clock.
3. Recruit 12+ testers immediately. Fastest routes: Shipaton's own Discord channel (participants commonly exchange testers with each other), friends/family, or paid tester services if needed for speed.
4. **Push updates to the same closed testing track continuously as features land** — this is expected and actually signals active development favorably to Google, per the same guidance.
5. Once you hit 12 continuous testers for 14 days, apply for production access immediately — note that Google's review of that application is an *additional* step on top of the 14 days, so build in buffer for it, not just the 14 days themselves.

**Recommended revised high-level milestone:** closed testing track live with real testers opted in by the end of Week 1 or very start of Week 2 at the absolute latest. This effectively means your first installable (even rough) Android build needs to exist far earlier than PRD Section 9 currently implies. **Flag this to your team now and consider revising the PRD's Section 9 timeline to reflect it** — this document doesn't overwrite that doc, but the two are now in tension and someone should reconcile them deliberately rather than let the PRD's dates go stale.

**iOS note:** Apple's TestFlight process is comparatively faster and doesn't carry an equivalent multi-week mandatory testing floor, but still budget real time for App Review turnaround (variable, plan for several days minimum) — do not assume same-day approval.

---

## 2. Testing Strategy Layers

| Layer | What it covers | Tooling notes |
|---|---|---|
| Unit tests | Business logic: baseline/deviation calculation, message cap enforcement, familiarity stage transitions | Standard Kotlin test frameworks, run in CI |
| Integration tests | Edge Functions against a test Supabase instance (DB writes, RLS enforcement, OpenRouter call mocking) | Use a separate Supabase test project, never test against production data |
| End-to-end tests | Full core loops: onboarding → chat → journal generation; usage signal → check-in → consent → notify | Run against staging before each store build push |
| Manual QA | Real device testing on both platforms, real permission flows | See Section 4 |
| AI behavior evaluation | Does the companion actually feel connected, not generic (Companion AI Design Doc Section 9) | Human-judged, not automatable — see Section 3 |
| Security/privacy testing | RLS boundaries, encryption, data deletion, consent guarantees | See Section 5 |

---

## 3. AI Companion Evaluation (Behavioral Testing)

This directly implements the evaluation plan from the Companion AI Design Doc, Section 9 — restated here as an actual testing activity with a schedule, since PRD Section 4.1 names this the primary success metric.

- **Internal dogfooding:** both team members use the app daily starting no later than Week 2, for a minimum of 2 full weeks before the demo video is produced — this is also the only way to validate the Familiarity Stage boundaries (Companion AI Design Doc Section 7) against real lived experience rather than guesswork.
- **External testers:** recruit the same 12+ people needed for the Google Play closed test (Section 1) to double as behavioral testers — efficient, since they're already required to exist. Brief them to reach "Established" familiarity stage (roughly 1-2 weeks of regular use) before the demo video is locked.
- **Rubric, checked around day 3 and day 10 of each tester's use:**
  - Does Tama reference something real and specific unprompted?
  - Does its tone stay consistent with how the tester actually talks?
  - Would the tester describe it as "generic" or "like any other chatbot" if asked bluntly?
- Any "feels generic" feedback by day 10 is a signal to revisit Companion AI Design Doc Sections 3-5 (persona, memory, mirroring) — treat as a real finding, not noise.

---

## 4. Manual QA — Platform-Specific Checklist

**Android**
- [ ] `UsageStatsManager` permission flow: confirm the user is guided correctly to system settings (this is not a runtime dialog — test that users actually find and grant it)
- [ ] Deviation detection fires correctly against a real simulated usage spike
- [ ] App behaves correctly if the usage-tracking permission is denied or later revoked (must degrade gracefully, not crash)

**iOS**
- [ ] Confirm current status of the `com.apple.developer.family-controls` entitlement application submitted in Week 1
- [ ] If approved: test the DeviceActivity flow equivalent to the Android checklist above
- [ ] If not approved in time: confirm the reduced/manual check-in fallback (PRD Section 7) works correctly and doesn't reference the unavailable automatic detection anywhere in the UI copy

**Both platforms**
- [ ] Onboarding completes in under 90 seconds with all skips exercised (voice off, no Special People added)
- [ ] Voice input transcription accuracy spot-checked
- [ ] Photo upload respects free-tier caps and compresses correctly
- [ ] Push notifications (check-ins, post-consent Special Person alerts, milestones) actually arrive and deep-link correctly

---

## 5. Critical Architectural Guarantee Tests (must pass before submission)

These map directly to trust claims made across the PRD, Companion AI Design Doc, System Architecture Doc, Database Design Doc, and API Design Doc. Treat failures here as launch blockers, not polish items.

| Test | Expected result | Source doc |
|---|---|---|
| Attempt to trigger `/internal/notify-special-person` without a prior `consent_events` row with `decision: "approved"` | Must be architecturally unreachable, not just permission-denied | API Design Doc Section 3.2, 4 |
| Submit explicit self-harm language in chat with OpenRouter deliberately made unavailable (simulate outage) | Crisis resources still shown; this path must not depend on the LLM being reachable | Companion AI Design Doc Section 8.2, System Architecture Doc Section 4.5 |
| User A attempts to read User B's `journal_entries`, `long_term_facts`, or `chat_turns` via direct query | Blocked by RLS in all cases | Database Design Doc Section 4 |
| Call `/v1/facts/search` on a free-tier account | Returns `premium_required`, not the actual search results | API Design Doc Section 3.5 |
| Add a Special Person, then immediately check whether a check-in can reference them before `notified_of_role_at` is set | Must not be possible — they must be informed first | PRD Feature 4, Database Design Doc Section 3.7 |
| Trigger full account/data deletion | Verify actual row removal in Postgres and Storage, not just a soft-delete flag | PRD Section 8.7, System Architecture Doc Section 5 |
| Attempt to exceed the free-tier daily message cap | Returns `message_cap_reached` with a graceful, non-punitive client message | API Design Doc Section 3.1, PRD Economy model |

---

## 6. RevenueCat / Payment Testing

- Test in RevenueCat's sandbox mode for both platforms before any production submission.
- Explicitly test: purchase success, purchase cancellation mid-flow, restore purchases (reinstall scenario), subscription expiration, subscription renewal, and the `/webhooks/revenuecat` signature validation (Section 5 of the API Design Doc) with both valid and deliberately invalid payloads.
- Confirm `subscription_state.tier` updates correctly and promptly after each of the above, and that `/v1/facts/search` and other premium gates reflect the change without requiring app restart.
- This is a hard Shipaton requirement (PRD Section 3) — do not treat as optional QA, it must be demonstrably real and working, not stubbed, by submission time.

---

## 7. Security & Privacy Testing

- Confirm data is encrypted at rest and in transit (verify actual configuration, don't just assume Supabase defaults cover everything needed).
- Confirm raw usage data never leaves the device — audit the actual payloads sent to `/v1/usage-signals` during testing to verify only derived signals are transmitted, per System Architecture Doc Principle 3.
- Confirm the privacy/data screen (PRD Section 8.7) accurately reflects what's actually tracked — this should be checked against the real implementation, not just the design mockup, since an inaccurate privacy disclosure is worse than a modest, accurate one.
- Confirm age-gating is implemented per the minimum confirmed in PRD Section 12 (Open Questions) — verify this was actually resolved before submission, not left as an open question.

---

## 8. Store Deployment Process

### 8.1 Google Play
1. Closed testing track live with 12+ testers (Section 1) — started Week 1.
2. Continuous builds pushed to the same track through development.
3. Apply for production access once the 14-continuous-day threshold is met.
4. Store listing requirements: privacy policy URL (live, not a placeholder), age rating questionnaire completed accurately given the app's sensitive content, screenshots, app description, RevenueCat product IDs matching exactly between Play Console and the RevenueCat dashboard.

### 8.2 Apple App Store
1. TestFlight beta recommended before formal submission, even without Google's mandatory multi-week gate, to catch iOS-specific issues (Compose Multiplatform rendering quirks per System Architecture Doc Section 7).
2. Confirm Family Controls entitlement status (Section 4 checklist above) before finalizing which feature set ships on iOS.
3. Same store listing diligence as Android: privacy policy, age rating, screenshots, matching RevenueCat product identifiers.

---

## 9. Demo Video Guidance

Shipaton prescreeners reportedly focus on roughly the first 2 minutes of a submission video — structure accordingly, don't bury the strongest material:

1. **First 15-20 seconds:** the hook — show, don't explain, what makes Tama different (a real snippet of the companion referencing something specific and personal).
2. **Next section:** the signature "wow" moment — pattern detection → proactive check-in → consent-based Special Person flow. This is the feature most likely to distinguish you from every other AI-companion submission.
3. **Show the Lifebook** — your strongest visual asset, worth a clean, well-composed shot.
4. **Show the real, working paywall** — a genuine RevenueCat-powered purchase completing on screen, not a mockup.
5. Keep total video tight — a shorter, confident video beats a long, meandering one given the prescreening reality.

---

## 10. Devpost Submission Checklist

- [ ] Public code repository linked
- [ ] Clear written description covering problem, solution, and how RevenueCat is used
- [ ] Correct category/award selections chosen deliberately (per earlier strategic discussion: HAMM, Design Award, and Ship Kotlin Everywhere if both platforms are genuinely live in time)
- [ ] #BuildInPublic content referenced/linked if applicable
- [ ] Demo video uploaded, under the platform's length limit, tested for playback before final submission
- [ ] Live store link(s) included and verified working from a fresh, logged-out perspective

---

## 11. Final Pre-Submission Checklist (combined)

- [ ] Google Play production access approved and app actually live
- [ ] Apple App Store live, or a documented, deliberate decision to defer iOS to post-hackathon
- [ ] All Section 5 architectural guarantee tests passing
- [ ] RevenueCat purchase flow verified working end-to-end in production, not just sandbox
- [ ] Privacy policy live and accurate to actual implementation
- [ ] Age gating implemented and verified
- [ ] Demo video produced and matches what's actually shipped (no claimed features that don't work)
- [ ] Devpost submission complete before September 30, 11:45 PM Pacific Time

---

## 12. Post-Submission Notes

- Keep the closed testing track and any staging environment alive after submission — judges or prescreeners occasionally follow up, and a broken post-submission environment reflects poorly if checked.
- Document known limitations honestly in the submission rather than overclaiming (e.g., if iOS shipped with the reduced pattern-detection fallback per Section 7 of the PRD, say so plainly) — an honest scope statement reads better to judges than a discovered gap between claims and reality.

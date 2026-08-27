<script setup lang="ts">
useTamaSeo({
  title: 'How Memory Works — Active Recall & Semantic Indexing',
  description:
    'Tama rebuilds a layered picture of your life before every single reply. Four memory layers — conversation, recent history, structured facts, and flagged moments — explained in detail.',
  path: '/memory',
  breadcrumbs: [{ name: 'How Memory Works', path: '/memory' }],
})

const layers = [
  {
    icon: '💬',
    title: 'Live conversation',
    body: 'The current chat thread, with full context of what you have said in this session. This is ephemeral — it lasts for the conversation.',
  },
  {
    icon: '📅',
    title: 'Recent history',
    body: 'A rolling summary of your last two weeks. What you talked about, the themes that came up, the emotional tone of your days.',
  },
  {
    icon: '👤',
    title: 'Structured facts',
    body: 'The people you have named, the relationships between them, your preferences, your routines. This is a knowledge graph that grows with every conversation.',
  },
  {
    icon: '⭐',
    title: 'Flagged moments',
    body: 'The moments you marked as significant — a milestone, a breakthrough, a hard day. These are retrieved with priority when they become relevant again.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="How memory works"
      title="A companion that actually remembers"
      lede="On every single message, Tama rebuilds a layered picture of you: the live conversation, the last two weeks, a structured set of facts about the people and themes in your life, and the moments you flagged as significant."
    />

    <!-- ============================== four layers ======================== -->
    <section class="section">
      <div class="wrap">
        <header class="sec-head reveal">
          <p class="eyebrow">Four memory layers</p>
          <h2>Assembled fresh on every reply</h2>
          <p class="lede">
            This is why Tama can ask how the thing with your manager went — unprompted,
            four days later. It is not magic; it is architecture.
          </p>
        </header>

        <div class="grid g-2">
          <article
            v-for="(l, i) in layers"
            :key="l.title"
            class="page-card reveal"
            :style="{ '--reveal-delay': `${i * 70}ms` }"
          >
            <div class="chip-icon" aria-hidden="true">{{ l.icon }}</div>
            <h3>{{ l.title }}</h3>
            <p class="muted small">{{ l.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================== how it learns ====================== -->
    <section class="section dark-band">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">How it learns</p>
          <h2>Familiarity stages, not settings toggles</h2>
        </header>

        <ol class="stages">
          <li class="page-card reveal">
            <span class="stage-badge badge">New</span>
            <h3>Days 1–7</h3>
            <p class="small">
              Tama is getting to know you. It asks more questions, confirms facts, and
              builds its initial picture. Responses are warm but careful — it does not
              pretend to know you yet.
            </p>
          </li>
          <li class="page-card reveal" style="--reveal-delay: 80ms">
            <span class="stage-badge badge badge-warm">Established</span>
            <h3>Days 8–30</h3>
            <p class="small">
              Tama starts referencing things you said days ago. It learns how you write
              — length, formality, emoji — and calibrates to it. Check-ins become more
              contextual.
            </p>
          </li>
          <li class="page-card reveal" style="--reveal-delay: 160ms">
            <span class="stage-badge badge badge-gold">Deep</span>
            <h3>Day 31+</h3>
            <p class="small">
              Tama has a layered understanding of your life. It can connect events across
              weeks, remember the people in your life by name and relationship, and write
              your Lifebook pages with real narrative depth.
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============================== user controls ====================== -->
    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Your controls</h2>
        <p>
          Memory is powerful, which means control over it matters. Here is what you can
          do:
        </p>
        <ul>
          <li>
            <strong>View memories:</strong> See what Tama has remembered about you, your
            people, and your patterns.
          </li>
          <li>
            <strong>Delete specific memories:</strong> Remove any fact, person, or moment
            from Tama's knowledge. The deletion is real — it is removed from the database,
            not hidden.
          </li>
          <li>
            <strong>Delete everything:</strong> One-tap account deletion removes all
            memories, entries, and files. Permanently.
          </li>
          <li>
            <strong>Export:</strong> Download your journal entries and data at any time,
            on any tier.
          </li>
        </ul>

        <h2>Free vs Premium memory</h2>

        <div class="callout callout-calm">
          <p>
            <strong>Free tier:</strong> Rolling ~30-day memory window. Tama remembers
            your recent conversations with full fidelity, but older context gradually
            fades. Your journal entries are always saved — memory recall is what changes.
          </p>
        </div>

        <div class="callout callout-gold">
          <p>
            <strong>Premium tier:</strong> Full unlimited memory history. Tama can recall
            conversations and facts from months ago with the same fidelity as yesterday.
            Plus full-text search across every mention of a person.
          </p>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
}

.chip-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: var(--tama-warmth-soft);
  font-size: 1.35rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.stages {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: clamp(1.1rem, 2.4vw, 1.8rem);
}

.stage-badge {
  margin-bottom: 0.8rem;
}

.stages h3 {
  font-size: var(--step-1);
}

@media (min-width: 700px) {
  .stages {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

/**
 * Scroll-reveal animation, built as progressive enhancement.
 *
 * Content is visible by default in CSS. Only after this runs on the client do
 * we add `js-reveal` to <html>, which arms the hidden start state. A crawler or
 * a user without JavaScript therefore always sees fully visible content — the
 * animation can never hide anything from an indexer.
 *
 * Honours prefers-reduced-motion by not arming at all.
 */
export function useReveal() {
  if (!import.meta.client) return

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    const root = document.documentElement
    root.classList.add('js-reveal')

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    // Anything already in view on load reveals immediately, so the first
    // screenful never flashes empty.
    for (const el of targets) {
      const box = el.getBoundingClientRect()
      if (box.top < window.innerHeight * 0.94) el.classList.add('is-in')
      else observer.observe(el)
    }

    onBeforeUnmount(() => observer.disconnect())
  })
}

<script setup lang="ts">
useReveal()
</script>

<template>
  <div class="shell">
    <a href="#main" class="skip-link">Skip to main content</a>
    <SiteHeader />
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

main:focus {
  outline: none;
}
</style>

<script setup lang="ts">
useHead({
  title: "Discord Emoji Export",
  meta: [{
    name: "keywords", content: "download discord emojis, download discord stickers"
  }]
});
useSeoMeta({
  ogSiteName: "Discord Emoji Export",
  ogType: "website",
  description: "Website for exporting emojis and stickers from any discord server you are in.",
  ogUrl: computed(() => useRuntimeConfig().app.baseURL + useRoute().path.slice(1)),
});
</script>
<template>
  <div class="min-vh-100 d-flex flex-column">
    <PageHeader />
    <main id="main" class="my-3 flex-grow-1 flex-shrink-0">
      <div class="container overflow-hidden">
        <NuxtPage />
      </div>
    </main>
    <PageFooter />
  </div>
</template>

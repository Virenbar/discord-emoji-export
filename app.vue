<script setup lang="ts">
useHead({
  title: "Discord Emoji Export",
  meta: [
    { name: "keywords", content: "download discord emojis, download discord stickers" }
  ]
});
useSeoMeta({
  ogSiteName: "Discord Emoji Export",
  ogType: "website",
  description: "Website for exporting emojis and stickers from any discord server you are in."
});
</script>
<template>
  <div class="min-vh-100 d-flex flex-column">
    <main id="main" class="flex-grow-1 flex-shrink-0">
      <NuxtPage />
    </main>
    <PageFooter />
    <div class="toast-container position-fixed py-3 px-1" />
  </div>
</template>

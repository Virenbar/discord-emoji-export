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
    <main id="main" class="my-3 flex-grow-1 flex-shrink-0">
      <NuxtPage />
    </main>
    <PageFooter />
    <div class="toast-container position-fixed p-3" />
  </div>
</template>

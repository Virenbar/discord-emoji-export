<script setup lang="ts">
const title = 'Discord Emoji Export';
const description = 'Website for exporting emojis and stickers from any discord server you are in.';
useHead({
  title: title,
  meta: [
    { name: 'keywords', content: 'download discord emojis, download discord stickers' },
    { name: "description", content: description }
  ],
  link: [{ rel: 'shortcut icon', href: `${useBaseURL('/favicon.ico')}` },],
});
useSeoMeta({
  ogType: 'website',
  ogTitle: title,
  ogSiteName: title,
  ogDescription: description,
  description: description,
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
<style lang="scss">
@use "~/assets/css/styles.scss";
</style>
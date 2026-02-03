<script setup lang="ts">
const props = defineProps<Props>();
interface Props { text: string }
</script>
<template>
  <span class="btn btn-secondary disabled">{{ props.text }}</span>
</template>

<script setup lang="ts">
const props = defineProps<Props>();
interface Props {
  text: string
  onClick: () => void
  disabled?: boolean
}
</script>
<template>
  <button type="button" class="btn btn-primary" :disabled="props.disabled" :onClick="props.onClick">
    {{ props.text }}
  </button>
</template>

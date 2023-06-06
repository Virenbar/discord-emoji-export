<script setup lang="ts">
import { APIEmoji } from "discord-api-types/v10";
const props = defineProps<{ emoji: APIEmoji }>();

const Toast = useToast();
const { emojiID, emojiURL } = useDiscord();
const url = emojiURL(props.emoji);

function download() {
  const { saveEmoji } = useExport();
  saveEmoji(props.emoji);
}

function copyID() {
  const id = `<${emojiID(props.emoji)}>`;
  navigator.clipboard.writeText(id);
  Toast.showSuccess(`ID: ${id}`, "Emoji ID copied");
}
</script>
<template>
  <div class="card m-1 border-primary">
    <div class="card-header text-center">
      <span>{{ props.emoji.name }}</span>
    </div>
    <div class="card-body d-flex flex-column text-center">
      <div class="wrapper">
        <a target="_blank" rel="noopener noreferrer" :href="url">
          <img :src="`${url}?size=48`" :alt="props.emoji.name ?? ''">
        </a>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" :onClick="copyID">
          Copy ID
        </button>
        <button class="btn btn-primary" :onClick="download">
          Download
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  width: 200px;

  .card-header {
    height: 100%;
  }

  .card-body {
    padding: 0.5rem;

    .wrapper {
      justify-content: center;
      height: 48px;
      margin-bottom: 5px;
    }
  }
}

img {
  max-height: 48px;
}
</style>

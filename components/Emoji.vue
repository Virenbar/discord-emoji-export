<script setup lang="ts">
import { APIEmoji } from "discord-api-types/v10";
const props = defineProps<Props>();
interface Props { emoji: APIEmoji }

const { emojiID, emojiURL } = useDiscord();
const Export = useExport();
const Toast = useToast();

const id = `<${emojiID(props.emoji)}>`;
const url = emojiURL(props.emoji);

const copyID = () => {
  navigator.clipboard.writeText(id);
  Toast.showSuccess(`ID: ${id}`, "Emoji ID copied");
};

const download = () => {
  Export.saveEmoji(props.emoji);
};
</script>
<template>
  <div class="emoji card m-1 border-primary">
    <div class="card-header text-center">
      <span>{{ props.emoji.name }}</span>
    </div>
    <div class="card-body d-flex flex-column text-center">
      <div class="">
        <a target="_blank" rel="noopener noreferrer" :href="url">
          <img :src="`${url}?size=40`" :alt="emoji.name ?? ''">
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
.emoji {
  flex: 1 0 0;
  min-width: 200px;
  max-width: 250px;
  transition: all 0.3s;

  .card-header {
    height: 100%;
  }

  .card-body {
    padding: 0.5rem;

    div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      margin: 0 0 5px 0;

    }
  }
}

img {
  max-height: 40px;
}
</style>

<script setup lang="ts">
import { StickerFormatType } from "discord-api-types/v10";
import type { Sticker } from "~/types";
const props = defineProps<{ sticker: Sticker }>();

const Toast = useToast();
const { stickerURL } = useDiscord();
const url = stickerURL(props.sticker);

async function download() {
  try {
    const { saveSticker } = useSave();
    await saveSticker(props.sticker);
  } catch (error) {
    console.error(error);
    Toast.showError(error);
  }
}
</script>
<template>
  <div class="card m-1 border-primary">
    <div class="card-header text-center">
      <span>{{ props.sticker.name }}</span>
    </div>
    <div class="card-body d-flex flex-column text-center">
      <div class="wrapper">
        <lottie-player v-if="props.sticker.format_type == StickerFormatType.Lottie" autoplay loop :src="useCORS(url)" speed="1" />
        <a v-else class="align-items-center" target="_blank" rel="noopener noreferrer" :href="url">
          <img :src="`${url}?size=128`" :alt="props.sticker.tags">
        </a>
      </div>
      <button class="btn btn-primary" :onClick="download">
        Download
      </button>
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
      height: 128px;
      margin-bottom: 5px;

      img {
        max-height: 128px;
        max-width: 100%;
      }
    }
  }
}
</style>

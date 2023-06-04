<script setup lang="ts">
import { APISticker, StickerFormatType } from "discord-api-types/v10";
const props = defineProps<Props>();
interface Props { sticker: APISticker }

const { stickerURL } = useDiscord();
const { saveSticker } = useExport();
const Toast = useToast();

const url = stickerURL(props.sticker);

const download = async () => {
  try {
    await saveSticker(props.sticker);
  } catch (e) {
    Toast.handleError(e);
  }
};
</script>
<template>
  <div class="card m-1 border-primary">
    <div class="card-header text-center">
      <span>{{ props.sticker.name }}</span>
    </div>
    <div class="card-body d-flex flex-column text-center">
      <div class="wrapper">
        <a v-if="props.sticker.format_type != StickerFormatType.Lottie" class="align-items-center" target="_blank" rel="noopener noreferrer" :href="url">
          <img :src="`${url}?size=128`" :alt="props.sticker.tags">
        </a>
        <lottie-player v-else autoplay loop :src="useCORS(url)" speed="1" />
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

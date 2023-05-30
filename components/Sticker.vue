<script setup lang="ts">
import { APISticker } from "discord-api-types/v10";
const props = defineProps<Props>();
interface Props { sticker: APISticker }

const { stickerURL } = useDiscord();
const Export = useExport();
const Toast = useToast();

const url = stickerURL(props.sticker);

const download = async () => {
  try {
    await Export.saveSticker(props.sticker);
  } catch (e) {
    Toast.handleError(e);
  }
};
</script>
<template>
  <div class="sticker card m-1 border-primary">
    <div class="card-header text-center">
      <span>{{ props.sticker.name }}</span>
    </div>
    <div class="card-body d-flex flex-column text-center">
      <div>
        <a class="align-items-center" target="_blank" rel="noopener noreferrer" :href="url">
          <img :src="`${url}?size=128`" :alt="props.sticker.name">
        </a>
      </div>
      <button class="btn btn-primary" :onClick="download">
        Download
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sticker {
  flex: 1 0 0;
  min-width: 200px;
  max-width: 250px;
  transition: all 0.3s;

  .card-header {
    height: 100%;
  }

  .card-body {
    padding: 0.5rem;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 128px;
      margin: 0 0 5px 0;

      img {
        max-height: 128px;
        max-width: 100%;
      }
    }
  }

}
</style>

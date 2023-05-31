<script setup lang="ts">
const buttons = useState<State>();
interface State {
  emojiZIP: boolean
  emojiJSON: boolean
  stickerZIP: boolean
}

const {
  saveEmojiZIP,
  saveEmojiJSON,
  saveStickerZIP
} = useExport();
const Toast = useToast();
const { guildData } = useDiscord();

watchEffect(() => {
  const hasEmojis = guildData.value.emojis.length > 0;
  const hasStickers = guildData.value.stickers.length > 0;
  buttons.value = { emojiZIP: hasEmojis, emojiJSON: hasEmojis, stickerZIP: hasStickers };
});

function exportEmojisJSON() {
  console.log("Generating JSON");
  buttons.value.emojiJSON = false;
  saveEmojiJSON(guildData.value);
  Toast.showSuccess("JSON generated");
  buttons.value.emojiJSON = true;
}

async function exportEmojisZIP() {
  console.log("Generating ZIP");
  try {
    buttons.value.emojiZIP = false;
    Toast.showInfo("Creating ZIP archive");
    await saveEmojiZIP(guildData.value);
    Toast.showSuccess("ZIP archive created");
  } catch (error) {
    Toast.handleError(error);
  } finally {
    buttons.value.emojiZIP = true;
  }
}

async function exportStickersZIP() {
  console.log("Generating ZIP");
  try {
    buttons.value.stickerZIP = false;
    Toast.showInfo("Creating ZIP archive");
    await saveStickerZIP(guildData.value);
    Toast.showSuccess("ZIP archive created");
  } catch (error) {
    Toast.handleError(error);
  } finally {
    buttons.value.stickerZIP = true;
  }
}
</script>
<template>
  <div v-if="guildData.id" class="card">
    <div class="card-header d-flex align-items-center">
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" data-bs-toggle="tab" href="#export" aria-selected="true" role="tab">Download</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href="#browse" aria-selected="false" role="tab" tabIndex="{-1}">Browse Emojis</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href="#sticker-browse" aria-selected="false" role="tab" tabIndex="{-1}">Browse Stickers</a>
        </li>
      </ul>
      <div class="text-muted ms-auto">
        {{ `${guildData.emojis.length} emojis - ${guildData.stickers.length} stickers` }}
      </div>
    </div>
    <div class="card-body">
      <div class="tab-content">
        <div id="export" class="tab-pane fade show active" role="tabpanel">
          <div class="d-flex">
            <div class="btn-group me-1">
              <ButtonLabel text="Emojis" />
              <Button text="Download ZIP" :on-click="exportEmojisZIP" :disabled="!buttons.emojiZIP" />
              <Button text="Download JSON" :on-click="exportEmojisJSON" :disabled="!buttons.emojiJSON" />
            </div>
            <div class="btn-group">
              <ButtonLabel text="Stickers" />
              <Button text="Download ZIP" :on-click="exportStickersZIP" :disabled="!buttons.stickerZIP" />
            </div>
          </div>
          <AlertDownload />
        </div>
        <div id="browse" class="tab-pane fade" role="tabpanel">
          <div class="d-flex flex-wrap justify-content-center">
            <Emoji v-for="emoji in guildData.emojis" :key="emoji.id!" :emoji="emoji" />
          </div>
        </div>
        <div id="sticker-browse" class="tab-pane fade" role="tabpanel">
          <div class="d-flex flex-wrap justify-content-center">
            <Sticker v-for="sticker in guildData.stickers" :key="sticker.id!" :sticker="sticker" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

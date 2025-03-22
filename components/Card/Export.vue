<script setup lang="ts">
import { StickerFormatType } from 'discord-api-types/v10';
import type { ButtonStates } from '~/types';

const buttons = useState<ButtonStates>();

const { saveEmojiZIP, saveEmojiJSON, saveStickerZIP } = useSave();
const Toast = useToast();
const { guildData } = useStore();

watchEffect(() => {
  const guild = guildData.value;
  const hasEmojis = guild.emojis.length > 0;
  const hasStickers = guild.stickers.length > 0;
  const hasLottie = guild.stickers.some(S => S.format_type == StickerFormatType.Lottie);

  buttons.value = { emojiZIP: hasEmojis, emojiJSON: hasEmojis, stickerZIP: hasStickers };
  if (hasLottie) import('@lottiefiles/lottie-player');
});

function saveEmojisJSON() {
  try {
    buttons.value.emojiJSON = false;
    saveEmojiJSON(guildData.value);
    Toast.showSuccess('JSON generated');
  }
  catch (error) {
    console.error(error);
    Toast.showError(error);
  }
  finally {
    buttons.value.emojiJSON = true;
  }
}

async function saveEmojisZIP() {
  try {
    buttons.value.emojiZIP = false;
    Toast.showInfo('Creating ZIP archive');
    await saveEmojiZIP(guildData.value);
    Toast.showSuccess('ZIP archive created');
  }
  catch (error) {
    console.error(error);
    Toast.showError(error);
  }
  finally {
    buttons.value.emojiZIP = true;
  }
}

async function saveStickersZIP() {
  try {
    buttons.value.stickerZIP = false;
    Toast.showInfo('Creating ZIP archive');
    await saveStickerZIP(guildData.value);
    Toast.showSuccess('ZIP archive created');
  }
  catch (error) {
    console.error(error);
    Toast.showError(error);
  }
  finally {
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
              <Button text="Download ZIP" :on-click="saveEmojisZIP" :disabled="!buttons.emojiZIP" />
              <Button text="Download JSON" :on-click="saveEmojisJSON" :disabled="!buttons.emojiJSON" />
            </div>
            <div class="btn-group">
              <ButtonLabel text="Stickers" />
              <Button text="Download ZIP" :on-click="saveStickersZIP" :disabled="!buttons.stickerZIP" />
            </div>
          </div>
          <AlertDownload />
        </div>
        <div id="browse" class="tab-pane fade" role="tabpanel">
          <div class="d-flex flex-wrap justify-content-center">
            <CardEmoji v-for="emoji in guildData.emojis" :key="emoji.id!" :emoji="emoji" />
          </div>
        </div>
        <div id="sticker-browse" class="tab-pane fade" role="tabpanel">
          <div class="d-flex flex-wrap justify-content-center">
            <CardSticker v-for="sticker in guildData.stickers" :key="sticker.id!" :sticker="sticker" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

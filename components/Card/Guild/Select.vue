<script setup lang="ts">
import { sortBy } from 'lodash-es';

const { guilds, selectedID, guildData } = useStore();
const options = computed(() => sortBy(guilds.value, g => g.name.toLowerCase()));

const onClick = async () => {
  const { getGuildEmojis, getGuildStickers } = useDiscord();
  const id = selectedID.value;
  const guild = options.value.find(g => g.id == id);
  if (!guild) return;

  const name = guild.name;
  const emojis = sortBy(await getGuildEmojis(id), e => e.name?.toLowerCase());
  const stickers = sortBy(await getGuildStickers(id), s => s.name.toLowerCase());

  guildData.value = { id, name, emojis, stickers };
};

watchEffect(() => {
  const guild = guildData.value;
  if (guild.id) {
    console.log(`Guild: ${guild.name}(${guild.id}) - ${guild.emojis.length} - ${guild.stickers.length}`);
  }
});
</script>
<template>
  <div class="input-group">
    <span class="input-group-text font-monospace">Server</span>
    <select v-model="selectedID" class="form-select" :disabled="options.length == 0">
      <option key="" value="">
        Choose server...
      </option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <button class="btn btn-primary" type="button" :disabled="options.length == 0 || selectedID == ''" :onClick="onClick">
      Select
    </button>
  </div>
</template>
<style scoped>
.btn,
span {
  width: 6rem;
  display: block;
}
</style>

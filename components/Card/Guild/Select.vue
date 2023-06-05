<script setup lang="ts">
import { sortBy } from "lodash-es";

const { guildData, userData, getGuildEmojis, getGuildStickers } = useDiscord();
const guildID = useState<string>(() => "");
const guilds = computed(() => sortBy(userData.value.guilds, g => g.name.toLowerCase()));

const onClick = async () => {
  const guild = guilds.value.find(g => g.id == guildID.value);
  if (!guild) { return; }
  const id = guild.id;
  const name = guild.name;
  const emojis = sortBy(await getGuildEmojis(guildID.value), e => e.name?.toLowerCase());
  const stickers = sortBy(await getGuildStickers(guildID.value), s => s.name.toLowerCase());

  guildData.value = { id, name, emojis, stickers };
};
watchEffect(() => {
  if (guilds.value.length == 0) {
    guildID.value = ""
  }
  const guild = guildData.value;
  console.log(`Guild: ${guild.name}(${guild.id}) - ${guild.emojis.length} - ${guild.stickers.length}`);
});
</script>
<template>
  <div class="input-group">
    <label class="input-group-text font-monospace" htmlFor="inputGuild">Server</label>
    <select v-model="guildID" class="form-select" :disabled="guilds.length == 0">
      <option key="" value="">
        Choose server...
      </option>
      <option v-for="guild in guilds" :key="guild.id" :value="guild.id">
        {{ guild.name }}
      </option>
    </select>
    <button class="btn btn-primary" type="button" :disabled="guilds.length == 0 || guildID == ''" :onClick="onClick">
      Select
    </button>
  </div>
</template>

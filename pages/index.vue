<script setup lang="ts">
import { Guild, GuildData } from "~/types";
const state = useState<GuildData>(() => ({ emojis: [], stickers: [] }));

const onSelect = async (guild: Guild) => {
  const Discord = useDiscord();
  const emojis = await Discord.getGuildEmojis(guild.id);
  const stickers = (await Discord.getGuildStickers(guild.id))
    .filter(s => s.format_type != 3);
  state.value = { guild, emojis, stickers };
};

const onClear = () => {
  state.value = { emojis: [], stickers: [] };
};

//console.log(`State: ${state.guild?.name}(${state.guild?.id}) - ${state.emojis.length} - ${state.stickers.length}`);
</script>
<template>
  <div className="container overflow-hidden">
    <CardGuild on-clear="{onClear}" on-select="{onSelect}" />
    <CardExport guild="{state.guild}" emojis="{state.emojis}" stickers="{state.stickers}" />
  </div>
</template>

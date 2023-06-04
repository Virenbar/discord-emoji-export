import { GuildData, UserData } from "~/types";

export default function () {
  const userData = useState<UserData>(() => ({ guilds: [] }));
  const guildData = useState<GuildData>(() => ({ id: "", name: "", emojis: [], stickers: [] }));

  const discord = useNuxtApp().$discord();
  return { userData, guildData, ...discord };
}

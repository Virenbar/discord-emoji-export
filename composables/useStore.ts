import type { Guild, GuildData, User } from "~/types";

const Data: GuildData = { id: "", name: "", emojis: [], stickers: [] };

export default function () {
  const user = useState<User | null>();
  const guilds = useState<Guild[]>(() => []);
  const selectedID = useState<string>(() => "");
  const guildData = useState<GuildData>(() => Data);

  const getToken = () => localStorage.getItem("token") ?? "";
  const setToken = (value: string) => localStorage.setItem("token", value);
  const clear = () => {
    if (!process.dev) { localStorage.clear(); }
    user.value = null;
    guilds.value = [];
    selectedID.value = "";
    guildData.value = Data;
  };

  return {
    user, guilds, selectedID, guildData,
    getToken, setToken, clear
  };
}


import { Guild, GuildData, User } from "~/types";

const Data: GuildData = { id: "", name: "", emojis: [], stickers: [] };

export default function () {
  const token = useState<string>("token", () => "");
  const user = useState<User | null>();
  const guilds = useState<Guild[]>(() => []);
  const selectedID = useState<string>(() => "");
  const guildData = useState<GuildData>(() => Data);

  const clear = () => {
    token.value = "";
    user.value = null;
    guilds.value = [];
    selectedID.value = "";
    guildData.value = Data;
  };

  return { token, user, guilds, selectedID, guildData, clear };
}


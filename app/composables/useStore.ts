import type { Guild, GuildData, User } from '~/types';

const item = 'token';
const Data: GuildData = { id: '', name: '', emojis: [], stickers: [] };

export default function () {
  const user = useState<User | null>();
  const guilds = useState<Guild[]>(() => []);
  const selectedID = useState<string>(() => '');
  const guildData = useState<GuildData>(() => Data);

  const getToken = () => localStorage.getItem(item) ?? '';
  const setToken = (value: string) => localStorage.setItem(item, value);
  const clear = () => {
    if (!import.meta.dev) localStorage.removeItem(item);
    user.value = null;
    guilds.value = [];
    selectedID.value = '';
    guildData.value = Data;
  };

  return {
    user, guilds, selectedID, guildData,
    getToken, setToken, clear,
  };
}

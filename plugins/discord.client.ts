import {
  APIEmoji,
  APISticker,
  APIUser,
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
  RESTAPIPartialCurrentUserGuild,
  RESTError,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPICurrentUserResult,
  RESTGetAPIGuildEmojisResult,
  RESTGetAPIGuildStickersResult,
  RouteBases,
  Routes
} from "discord-api-types/v10";
import { GuildData } from "~/types";

export default defineNuxtPlugin(() => {
  const token = useState<string>("token");
  const state = useState<GuildData>(() => ({ emojis: [], stickers: [] }));

  async function fetchAPI<T>(path: string) {
    const url = `${RouteBases.api}${path}`;
    const response = await fetch(url, { headers: { authorization: token.value } });
    if (response.status != 200) {
      const json = await response.json() as RESTError;
      throw new Error(`Code: ${json.code} - ${json.message}`);
    }
    return await response.json() as T;
  }

  function userAvatar(user: APIUser) {
    const discriminator = parseInt(user.discriminator) % 5 as DefaultUserAvatarAssets;
    return (user.avatar)
      ? `${RouteBases.cdn}${CDNRoutes.userAvatar(user.id, user.avatar, ImageFormat.PNG)}?size=32`
      : `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(discriminator)}?size=32`;
  }

  function guildIcon(guild: RESTAPIPartialCurrentUserGuild) {
    return (guild.icon)
      ? `${RouteBases.cdn}${CDNRoutes.guildIcon(guild.id, guild.icon, ImageFormat.PNG)}?size=32`
      : `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(0)}?size=32`;
  }

  function useDiscord() {
    return {
      token,
      state,
      getMe: () => fetchAPI<RESTGetAPICurrentUserResult>(Routes.user("@me")),
      getGuilds: () => fetchAPI<RESTGetAPICurrentUserGuildsResult>(Routes.userGuilds()),
      getGuildEmojis: (guildID: string) => fetchAPI<RESTGetAPIGuildEmojisResult>(Routes.guildEmojis(guildID)),
      getGuildStickers: (guildID: string) => fetchAPI<RESTGetAPIGuildStickersResult>(Routes.guildStickers(guildID)),
      emojiID: (emoji: APIEmoji) => `${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}`,
      emojiURL: (emoji: APIEmoji) => `${RouteBases.cdn}${CDNRoutes.emoji(emoji.id ?? "", emoji.animated ? ImageFormat.GIF : ImageFormat.PNG)}`,
      emojiName: (emoji: APIEmoji) => `${emoji.name}.${emoji.animated ? "gif" : "png"}`,
      stickerURL: (sticker: APISticker) => `${RouteBases.cdn}${CDNRoutes.sticker(sticker.id, ImageFormat.PNG)}`,
      stickerName: (sticker: APISticker) => `${sticker.name}.png`,
      guildIcon,
      userAvatar
    };
  }

  return {
    provide: {
      useDiscord
    }
  };
});

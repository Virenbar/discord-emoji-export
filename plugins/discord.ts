import {
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
  RESTError,
  RouteBases,
  Routes,
  StickerFormatType
} from "discord-api-types/v10";
import { Emoji, Guild, Sticker, User } from "~/types";

export default defineNuxtPlugin(() => {
  const token = useState<string>("token", () => "");

  async function fetchAPI<T>(path: string) {
    const url = `${RouteBases.api}${path}`;
    const response = await fetch(url, { headers: { authorization: token.value } });
    if (response.status != 200) {
      const json = await response.json() as RESTError;
      throw new Error(`Code: ${json.code} - ${json.message}`);
    }
    return await response.json() as T;
  }

  function userAvatar(user: User) {
    const discriminator = parseInt(user.discriminator) % 5 as DefaultUserAvatarAssets;
    return (user.avatar)
      ? `${RouteBases.cdn}${CDNRoutes.userAvatar(user.id, user.avatar, ImageFormat.PNG)}?size=32`
      : `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(discriminator)}?size=32`;
  }

  function guildIcon(guild: Guild) {
    return (guild.icon)
      ? `${RouteBases.cdn}${CDNRoutes.guildIcon(guild.id, guild.icon, ImageFormat.PNG)}?size=32`
      : `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(0)}?size=32`;
  }

  function emojiFormat(emoji: Emoji) { return emoji.animated ? ImageFormat.GIF : ImageFormat.PNG; }

  function stickerFormat(sticker: Sticker) {
    switch (sticker.format_type) {
      case StickerFormatType.Lottie:
        return ImageFormat.Lottie;
      case StickerFormatType.GIF:
        return ImageFormat.GIF;
      case StickerFormatType.PNG:
      case StickerFormatType.APNG:
      default:
        return ImageFormat.PNG;
    }
  }

  function discord() {
    return {
      token,
      getMe: () => fetchAPI<User>(Routes.user("@me")),
      getGuilds: () => fetchAPI<Guild[]>(Routes.userGuilds()),
      getGuildEmojis: (guildID: string) => fetchAPI<Emoji[]>(Routes.guildEmojis(guildID)),
      getGuildStickers: (guildID: string) => fetchAPI<Sticker[]>(Routes.guildStickers(guildID)),
      emojiID: (emoji: Emoji) => `${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}`,
      emojiURL: (emoji: Emoji) => `${RouteBases.cdn}${CDNRoutes.emoji(emoji.id ?? "", emojiFormat(emoji))}`,
      emojiName: (emoji: Emoji) => `${emoji.name}.${emojiFormat(emoji)}`,
      stickerURL: (sticker: Sticker) => `${RouteBases.cdn}${CDNRoutes.sticker(sticker.id, stickerFormat(sticker))}`,
      stickerName: (sticker: Sticker) => `${sticker.name}.${stickerFormat(sticker)}`,
      guildIcon,
      userAvatar
    };
  }

  return {
    provide: {
      discord
    }
  };
});

import {
  CDNRoutes,
  ImageFormat,
  RouteBases,
  Routes,
  StickerFormatType,
  type DefaultUserAvatarAssets,
  type RESTError,
} from 'discord-api-types/v10';
import type { Emoji, Guild, Sticker, User } from '~/types';

export default defineNuxtPlugin(() => {
  const token = useState<string>('token', () => '');

  async function fetchAPI<T>(path: string) {
    const url = `${RouteBases.api}${path}`;
    const response = await fetch(url, { headers: { authorization: token.value } });
    if (response.status != 200) {
      const json = await response.json() as RESTError;
      throw new Error(`Code: ${json.code} - ${json.message}`);
    }
    return await response.json() as T;
  }

  function userName(user: User) {
    return user?.discriminator == '0'
      ? user?.username
      : `${user?.username}#${user?.discriminator}`;
  }

  function userAvatar(user: User) {
    const discriminator = parseInt(user.discriminator) % 5 as DefaultUserAvatarAssets;
    const avatar = user.avatar;
    let path;
    if (!avatar) {
      path = `${CDNRoutes.defaultUserAvatar(discriminator)}`;
    }
    else if (avatar.startsWith('a_')) {
      path = `${CDNRoutes.userAvatar(user.id, avatar, ImageFormat.GIF)}`;
    }
    else {
      path = `${CDNRoutes.userAvatar(user.id, avatar, ImageFormat.PNG)}`;
    }
    return `${RouteBases.cdn}${path}?size=32`;
  }

  function guildIcon(guild: Guild) {
    const icon = guild.icon;
    let path;
    if (!icon) {
      path = `${CDNRoutes.defaultUserAvatar(0)}`;
    }
    else if (icon.startsWith('a_')) {
      path = `${CDNRoutes.guildIcon(guild.id, icon, ImageFormat.GIF)}`;
    }
    else {
      path = `${CDNRoutes.guildIcon(guild.id, icon, ImageFormat.PNG)}`;
    }
    return `${RouteBases.cdn}/${path}?size=32`;
  }

  function emojiFormat(emoji: Emoji) {
    return emoji.animated ? ImageFormat.GIF : ImageFormat.PNG;
  }

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

  function stickerURL(sticker: Sticker) {
    // CDN returns "NoSuchKey" for gif stickers
    const base = sticker.format_type == StickerFormatType.GIF ? 'https://media.discordapp.net' : RouteBases.cdn;
    return `${base}${CDNRoutes.sticker(sticker.id, stickerFormat(sticker))}`;
  }

  function discord() {
    return {
      token,
      getMe: () => fetchAPI<User>(Routes.user('@me')),
      getGuilds: () => fetchAPI<Guild[]>(Routes.userGuilds()),
      getGuildEmojis: (guildID: string) => fetchAPI<Emoji[]>(Routes.guildEmojis(guildID)),
      getGuildStickers: (guildID: string) => fetchAPI<Sticker[]>(Routes.guildStickers(guildID)),
      emojiID: (emoji: Emoji) => `${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}`,
      emojiURL: (emoji: Emoji) => `${RouteBases.cdn}${CDNRoutes.emoji(emoji.id ?? '', emojiFormat(emoji))}`,
      emojiName: (emoji: Emoji) => `${emoji.name}.${emojiFormat(emoji)}`,
      stickerURL,
      stickerName: (sticker: Sticker) => `${sticker.name}.${stickerFormat(sticker)}`,
      guildIcon,
      userName,
      userAvatar,
    };
  }

  return {
    provide: {
      discord,
    },
  };
});

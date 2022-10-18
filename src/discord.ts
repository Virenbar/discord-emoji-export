import {
    APIEmoji,
    APIUser,
    CDNRoutes,
    DefaultUserAvatarAssets,
    ImageFormat,
    RESTAPIPartialCurrentUserGuild,
    RESTError,
    RESTGetAPICurrentUserGuildsResult,
    RESTGetAPICurrentUserResult,
    RESTGetAPIGuildEmojisResult,
    RouteBases,
    Routes
} from "discord-api-types/v10";

let Token = "";

async function fetchAPI<T>(path: string) {
    const url = `${RouteBases.api}${path}`;
    const response = await fetch(url, { headers: { authorization: Token } });
    if (response.status != 200) {
        const json = await response.json() as RESTError;
        throw new Error(`Code: ${json.code} - ${json.message}`);
    }
    return await response.json() as T;
}

function userAvatar(user: APIUser) {
    const d = parseInt(user.discriminator) % 5 as DefaultUserAvatarAssets;
    return (user.avatar)
        ? `${RouteBases.cdn}${CDNRoutes.userAvatar(user.id, user.avatar, ImageFormat.PNG)}?size=32`
        : `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(d)}?size=32`;
}

/**
 * @deprecated
 */
function guildIcon(guild: RESTAPIPartialCurrentUserGuild) {
    return (guild.icon)
        ? ` <img src="${RouteBases.cdn}/icons/${guild.id}/${guild.icon}.png" />${guild.name}`
        : guild.name;
}

const Discord = {
    setToken: (token: string) => Token = token,
    getMe: () => fetchAPI<RESTGetAPICurrentUserResult>(Routes.user("@me")),
    getGuilds: () => fetchAPI<RESTGetAPICurrentUserGuildsResult>(Routes.userGuilds()),
    getGuildEmojis: (guildID: string) => fetchAPI<RESTGetAPIGuildEmojisResult>(Routes.guildEmojis(guildID)),
    emojiID: (emoji: APIEmoji) => `${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}`,
    emojiURL: (emoji: APIEmoji) => `${RouteBases.cdn}${CDNRoutes.emoji(emoji.id ?? "", emoji.animated ? ImageFormat.GIF : ImageFormat.PNG)}`,
    emojiName: (emoji: APIEmoji) => `${emoji.name}.${emoji.animated ? "gif" : "png"}`,
    guildIcon,
    userAvatar
};

export default Discord;

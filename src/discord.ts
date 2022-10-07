import type {
    RESTAPIPartialCurrentUserGuild,
    RESTGetAPICurrentUserGuildsResult,
    RESTGetAPICurrentUserResult,
    RESTGetAPIGuildEmojisResult
} from "discord-api-types/v10";

let Token = "";
const filter = /.*/;

async function fetchAPI<T>(path: string) {
    const url = `https://discord.com/api/${path}`;
    const response = await fetch(url, { headers: { authorization: Token } });

    // if (response.status !== 200) {
    //     console.warn("Fetch failed", response.statusText);
    //     return null;
    // }
    return await response.json() as T;
}

async function getGuildEmojis0(guildID: string) {
    const emojis = [];
    const emojisJSON = await fetchAPI<RESTGetAPIGuildEmojisResult>(`guilds/${guildID}/emojis`);
    for (const emoji of emojisJSON) {
        const name = emoji.name ?? "";
        const identifier = `${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}`;
        const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`;
        if (filter.test(name)) {
            emojis.push({ name, identifier, url });
        }
    }
    return emojis;
}

export default {
    setToken: (token: string) => Token = token,
    getMe: () => fetchAPI<RESTGetAPICurrentUserResult>("users/@me"),
    getGuilds: () => fetchAPI<RESTGetAPICurrentUserGuildsResult>("users/@me/guilds"),
    getGuildEmojis: (guildID: string) => fetchAPI<RESTGetAPIGuildEmojisResult>(`guilds/${guildID}/emojis`),
    guildIcon: (guild: RESTAPIPartialCurrentUserGuild) => guild.icon
        ? `<img src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" />${guild.name}`
        : guild.name
};

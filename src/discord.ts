import type {
    RESTGetAPICurrentUserGuildsResult,
    RESTGetAPICurrentUserResult,
    RESTGetAPIGuildEmojisResult,
    RESTGetAPIOAuth2CurrentAuthorizationResult
} from "discord-api-types/v10";

let Token = "";
const filter = /.*/;

function setToken(token: string) {
    Token = token;
}
async function fetchAPI<T>(path: string) {
    const url = `https://discord.com/api/${path}`;
    const response = await fetch(url, { headers: { authorization: `Bearer ${Token}` } });

    // if (response.status !== 200) {
    //     console.warn("Fetch failed", response.statusText);
    //     return null;
    // }
    return await response.json() as T;
}
function getMe() {
    return fetchAPI<RESTGetAPICurrentUserResult>("users/@me");
}

function getGuilds() {
    return fetchAPI<RESTGetAPICurrentUserGuildsResult>("users/@me/guilds");
}

function getTokenInfo() {
    return fetchAPI<RESTGetAPIOAuth2CurrentAuthorizationResult>("oauth2/@me");
}
function getGuildEmojis(guildID: string) {
    return fetchAPI<RESTGetAPIGuildEmojisResult>(`guilds/${guildID}/emojis`);
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
    setToken,
    getMe,
    getTokenInfo,
    getGuilds,
    getGuildEmojis
};

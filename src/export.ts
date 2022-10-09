import { APIEmoji } from "discord-api-types/v10";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import D from "./discord";

export function saveJSON(guild: Guild, emojis: APIEmoji[]) {
    const e = emojis.map(e => {
        return {
            name: e.name,
            id: e.id,
            identifier: D.emojiID(e),
            url: D.emojiURL(e)
        };
    });
    const G = {
        guildName: guild.name,
        guildID: guild.id,
        emojis: e
    };
    const name = guild.name.replace(/(\W+)/gi, "-");
    const json = JSON.stringify(G);
    saveAs(json, `${name}.json`);
}
export function saveZIP(guild: Guild, emojis: APIEmoji[]) {

    const ZIP = new JSZip();

    const e = emojis.map(e => {
        return {
            name: e.name,
            id: e.id,
            identifier: D.emojiID(e),
            url: D.emojiURL(e)
        };
    });
    const G = {
        guildName: guild.name,
        guildID: guild.id,
        emojis: e
    };
    const name = guild.name.replace(/(\W+)/gi, "-");
    const json = JSON.stringify(G);
    saveAs(json, `${name}.json`);
}

export default {
    saveJSON,
    saveZIP
};

interface Guild {
    name: string
    id: string
}

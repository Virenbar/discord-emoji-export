import { APIEmoji } from "discord-api-types/v10";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import D from "./discord";
import { Guild } from "./models";

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

export async function saveZIP(guild: Guild, emojis: APIEmoji[]) {
    const name = guild.name.replace(/(\W+)/gi, "-");
    const ZIP = new JSZip();
    for (const emoji of emojis) {
        const name = D.emojiName(emoji);
        const image = await fetch(D.emojiURL(emoji)).then(r => r.blob());
        ZIP.file(name, image);
    }
    const A = await ZIP.generateAsync({ type: "blob" });
    saveAs(A, `${name}.zip`);
}

export async function saveImage(emoji: APIEmoji) {
    const name = D.emojiName(emoji);
    const image = await fetch(D.emojiURL(emoji)).then(r => r.blob());
    saveAs(image, name);
}

export default {
    saveJSON,
    saveZIP,
    saveImage
};

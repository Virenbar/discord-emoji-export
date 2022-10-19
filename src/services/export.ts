import { APIEmoji } from "discord-api-types/v10";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Guild } from "../models";
import Discord from "./discord";

export function saveJSON(guild: Guild, emojis: APIEmoji[]) {
    const e = emojis.map(e => {
        return {
            name: e.name,
            id: e.id,
            identifier: Discord.emojiID(e),
            url: Discord.emojiURL(e)
        };
    });
    const G = {
        guildName: guild.name,
        guildID: guild.id,
        emojis: e
    };
    const name = guild.name.replace(/(\W+)/gi, "-");
    const json = JSON.stringify(G, null, 4);
    const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${name}.json`);
}

export async function saveZIP(guild: Guild, emojis: APIEmoji[]) {
    const name = guild.name.replace(/(\W+)/gi, "-");
    const requests = emojis.map(e => fetchEmoji(e));
    const images = await Promise.all(requests);

    const ZIP = new JSZip();
    images.forEach(i => ZIP.file(i.name, i.image));
    const A = await ZIP.generateAsync({ type: "blob" });
    saveAs(A, `${name}.zip`);
}

export async function saveImage(emoji: APIEmoji) {
    const { name, image } = await fetchEmoji(emoji);
    saveAs(image, name);
}

async function fetchEmoji(emoji: APIEmoji) {
    const name = Discord.emojiName(emoji);
    const image = await fetch(Discord.emojiURL(emoji)).then(r => r.blob());
    return { name, image };
}

const Export = {
    saveJSON,
    saveZIP,
    saveImage
};
export default Export;

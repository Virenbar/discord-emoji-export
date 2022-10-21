import { APIEmoji, APISticker } from "discord-api-types/v10";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Guild } from "../models";
import Discord from "./discord";

// Public CORS proxy
const CORS_public = "https://api.allorigins.win/raw?url=";

// Private CORS proxy
// Only works for whitelisted domains
const CORS_private = "https://cors.virenbar.workers.dev/?url=";

async function saveZIP(guild: Guild, images: Image[]) {
    const name = guild.name.replace(/(\W+)/gi, "-");

    const ZIP = new JSZip();
    images.forEach(i => ZIP.file(i.name, i.image));
    const A = await ZIP.generateAsync({ type: "blob" });
    saveAs(A, `${name}.zip`);
}

function fixNames(images: Image[]) {
    const names: { [index: string]: number } = {};
    images.forEach(i => {
        const name = i.name;
        const count = names[name] || 0;
        names[name] = count + 1;
        if (count > 0) {
            i.name = i.name.replace(/\.\w+$/, `~${count}$&`);
        }
    });
}

// Emojis
function saveEmojiJSON(guild: Guild, emojis: APIEmoji[]) {
    const emojisJSON = emojis.map(e => {
        return {
            name: e.name,
            id: e.id,
            identifier: Discord.emojiID(e),
            url: Discord.emojiURL(e)
        };
    });
    const guildJSON = {
        guildName: guild.name,
        guildID: guild.id,
        emojis: emojisJSON
    };
    const name = guild.name.replace(/(\W+)/gi, "-");
    const json = JSON.stringify(guildJSON, null, 4);
    const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${name}.json`);
}
async function saveEmojiZIP(guild: Guild, emojis: APIEmoji[]) {
    const requests = emojis.map(e => fetchEmoji(e));
    const images = await Promise.all(requests);
    saveZIP(guild, images);
}
async function saveEmoji(emoji: APIEmoji) {
    const { name, image } = await fetchEmoji(emoji);
    saveAs(image, name);
}
async function fetchEmoji(emoji: APIEmoji) {
    const name = Discord.emojiName(emoji);
    const image = await fetch(Discord.emojiURL(emoji)).then(r => r.blob());
    return { name, image };
}

// Stickers
async function saveStickerZIP(guild: Guild, stickers: APISticker[]) {
    const requests = stickers.map(e => fetchSticker(e));
    const images = await Promise.all(requests);
    fixNames(images);
    saveZIP(guild, images);
}
async function saveSticker(sticker: APISticker) {
    const { name, image } = await fetchSticker(sticker);
    saveAs(image, name);
}
async function fetchSticker(sticker: APISticker) {
    const name = Discord.stickerName(sticker);

    // stickers endpoint has no "Access-Control-Allow-Origin" header
    // const image = await fetch(Discord.stickerURL(sticker)).then(r => r.blob());
    const url = (process.env.NODE_ENV === "production")
        ? `${CORS_private}${Discord.stickerURL(sticker)}`
        : `${CORS_public}${Discord.stickerURL(sticker)}`;
    const image = await fetch(url).then(r => r.blob());
    return { name, image };
}

const Export = {
    saveEmoji,
    saveEmojiZIP,
    saveEmojiJSON,
    saveSticker,
    saveStickerZIP
};

export default Export;

interface Image {
    name: string
    image: Blob
}

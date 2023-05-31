import { APIEmoji, APISticker } from "discord-api-types/v10";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { GuildData } from "../types";

async function fetchEmoji(emoji: APIEmoji) {
  const Discord = useDiscord();
  const name = Discord.emojiName(emoji);
  const url = Discord.emojiURL(emoji);
  const blob = await fetch(url).then(r => r.blob());
  return { name, blob };
}

async function fetchSticker(sticker: APISticker) {
  const Discord = useDiscord();
  const name = Discord.stickerName(sticker);
  // stickers endpoint has no "Access-Control-Allow-Origin" header
  // const url = Discord.stickerURL(sticker);
  const url = useCORS(Discord.stickerURL(sticker));
  const blob = await fetch(url).then(r => r.blob());
  return { name, blob };
}

function fixNames(files: File[]) {
  const names: { [index: string]: number } = {};
  files.forEach(i => {
    const name = i.name;
    const count = names[name] || 0;
    names[name] = count + 1;
    if (count > 0) {
      i.name = i.name.replace(/\.\w+$/, `~${count}$&`);
    }
  });
}

async function saveZIP(guild: GuildData, files: File[]) {
  const name = guild.name.replace(/(\W+)/gi, "-");

  const ZIP = new JSZip();
  files.forEach(i => ZIP.file(i.name, i.blob));
  const A = await ZIP.generateAsync({ type: "blob" });
  saveAs(A, `${name}.zip`);
}

// Emojis
async function saveEmoji(emoji: APIEmoji) {
  const { name, blob } = await fetchEmoji(emoji);
  saveAs(blob, name);
}

async function saveEmojiZIP(guild: GuildData) {
  const requests = guild.emojis.map(e => fetchEmoji(e));
  const images = await Promise.all(requests);
  saveZIP(guild, images);
}

function saveEmojiJSON(guild: GuildData) {
  const Discord = useDiscord();
  const emojisJSON = guild.emojis.map(e => {
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

// Stickers
async function saveSticker(sticker: APISticker) {
  const { name, blob } = await fetchSticker(sticker);
  saveAs(blob, name);
}

async function saveStickerZIP(guild: GuildData) {
  const requests = guild.stickers.map(e => fetchSticker(e));
  const images = await Promise.all(requests);
  fixNames(images);
  saveZIP(guild, images);
}

export default function () {
  return {
    saveEmoji,
    saveEmojiZIP,
    saveEmojiJSON,
    saveSticker,
    saveStickerZIP
  };
}

interface File {
  name: string
  blob: Blob
}

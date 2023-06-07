import FS from "file-saver";
import JSZip from "jszip";
import { Emoji, GuildData, Sticker } from "../types";

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
  FS.saveAs(A, `${name}.zip`);
}

//#region Emojis
async function fetchEmoji(emoji: Emoji) {
  const { emojiName, emojiURL } = useDiscord();
  const name = emojiName(emoji);
  const url = emojiURL(emoji);
  const blob = await fetch(url).then(r => r.blob());
  return { name, blob };
}

async function saveEmoji(emoji: Emoji) {
  const { name, blob } = await fetchEmoji(emoji);
  FS.saveAs(blob, name);
}

async function saveEmojiZIP(guild: GuildData) {
  const requests = guild.emojis.map(e => fetchEmoji(e));
  const images = await Promise.all(requests);
  saveZIP(guild, images);
}

function saveEmojiJSON(guild: GuildData) {
  const { emojiID, emojiURL } = useDiscord();
  const emojisJSON = guild.emojis.map(e => {
    return {
      name: e.name,
      id: e.id,
      identifier: emojiID(e),
      url: emojiURL(e)
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
  FS.saveAs(blob, `${name}.json`);
}

//#endregion
//#region Stickers
async function fetchSticker(sticker: Sticker) {
  const { stickerName, stickerURL } = useDiscord();
  const name = stickerName(sticker);
  // stickers endpoint has no "Access-Control-Allow-Origin" header
  // const url = stickerURL(sticker);
  const url = useCORS(stickerURL(sticker));
  const blob = await fetch(url).then(r => r.blob());
  return { name, blob };
}

async function saveSticker(sticker: Sticker) {
  const { name, blob } = await fetchSticker(sticker);
  FS.saveAs(blob, name);
}

async function saveStickerZIP(guild: GuildData) {
  const requests = guild.stickers.map(e => fetchSticker(e));
  const images = await Promise.all(requests);
  fixNames(images);
  saveZIP(guild, images);
}
//#endregion

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

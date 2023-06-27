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

const guildName = (guild: GuildData) => guild.name.replace(/(\W+)/gi, "-");
const isSticker = (content: Content): content is Sticker => (<Sticker>content).type !== undefined;
const fetchBlob = (url: string) => fetch(url).then(r => r.blob());
// async function saveZIP(name: string, files: File[]) {
//   const ZIP = new JSZip();
//   files.forEach(i => ZIP.file(i.name, i.blob));
//   const A = await ZIP.generateAsync({ type: "blob" });
//   FS.saveAs(A, `${name}.zip`);
// }

function fetchContent(content: Content) {
  if (isSticker(content)) {
    return fetchSticker(content);
  } else {
    return fetchEmoji(content);
  }
}

async function saveFile(content: Content) {
  const { name, blob } = await fetchContent(content);
  FS.saveAs(blob, name);
}

async function saveZIP(guild: GuildData, content: ContentType) {
  // const requests = content == "Emoji"
  //   ? guild.emojis.map(fetchEmoji)
  //   : guild.stickers.map(fetchSticker);

  const contents = ((): Content[] => {
    switch (content) {
      case "Emoji": return guild.emojis;
      case "Sticker": return guild.stickers;
    }
  })();
  const requests = contents.map(fetchContent);

  const name = `${guildName(guild)}-${content}`;
  const files = await Promise.all(requests);
  if (content == "Emoji") { fixNames(files); }

  const ZIP = new JSZip();
  files.forEach(i => ZIP.file(i.name, i.blob));
  const A = await ZIP.generateAsync({ type: "blob" });
  FS.saveAs(A, `${name}.zip`);
}

//#region Emojis
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

async function fetchEmoji(emoji: Emoji) {
  const { emojiName, emojiURL } = useDiscord();
  const name = emojiName(emoji);
  const url = emojiURL(emoji);
  const blob = await fetchBlob(url);
  return { name, blob };
}
//#endregion

//#region Stickers
async function fetchSticker(sticker: Sticker) {
  const { stickerName, stickerURL } = useDiscord();
  const name = stickerName(sticker);
  // stickers endpoint has no "Access-Control-Allow-Origin" header
  // const url = stickerURL(sticker);
  const url = useCORS(stickerURL(sticker));
  const blob = await fetchBlob(url);
  return { name, blob };
}
//#endregion

export default function () {
  return {
    saveEmoji: (emoji: Emoji) => saveFile(emoji),
    saveEmojiZIP: (guild: GuildData) => saveZIP(guild, "Emoji"),
    saveEmojiJSON,
    saveSticker: (sticker: Sticker) => saveFile(sticker),
    saveStickerZIP: (guild: GuildData) => saveZIP(guild, "Sticker")
  };
}

interface File {
  name: string
  blob: Blob
}

type ContentType = "Emoji" | "Sticker"
type Content = Emoji | Sticker;

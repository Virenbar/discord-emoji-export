import FS from 'file-saver';
import JSZip from 'jszip';
import type { Emoji, GuildData, Sticker } from '../types';

const $schema = 'https://virenbar.github.io/discord-emoji-export/schemas/emojis.schema.json';

const fetchBLOB = (url: string) => fetch(url).then(r => r.blob());
const guildName = (guild: GuildData) => guild.name.replace(/(\W+)/gi, ' ').trim();
const isSticker = (content: Content): content is Sticker => (<Sticker>content).type !== undefined;

function fixNames(files: File[]) {
  const names: { [index: string]: number } = {};
  files.forEach((i) => {
    const name = i.name;
    const count = names[name] || 0;
    if (count > 0) i.name = i.name.replace(/\.\w+$/, `~${count}$&`);
    names[name] = count + 1;
  });
}

function fetchContent(content: Content) {
  if (isSticker(content)) {
    return fetchSticker(content);
  }
  else {
    return fetchEmoji(content);
  }
}

async function fetchEmoji(emoji: Emoji) {
  const { emojiName, emojiURL } = useDiscord();
  const name = emojiName(emoji);
  const blob = await fetchBLOB(emojiURL(emoji));
  return { name, blob };
}

async function fetchSticker(sticker: Sticker) {
  const { stickerName, stickerURL } = useDiscord();
  const name = stickerName(sticker);
  // stickers endpoint has no "Access-Control-Allow-Origin" header
  // const blob = await fetchBLOB(stickerURL(sticker));
  // Use CORS only for CDN (GIFs on media work without CORS)
  let url = stickerURL(sticker);
  if (url.includes('cdn.discord')) {
    url = useCORS(url);
  }
  const blob = await fetchBLOB(url);
  return { name, blob };
}

async function saveFile(content: Content) {
  const { name, blob } = await fetchContent(content);
  FS.saveAs(blob, name);
}

async function saveZIP(guild: GuildData, content: 'Emoji' | 'Sticker') {
  const contents = ((): Content[] => {
    switch (content) {
      case 'Emoji': return guild.emojis;
      case 'Sticker': return guild.stickers;
    }
  })();
  const requests = contents.map(fetchContent);

  const name = `${guildName(guild)}-${content}`;
  const files = await Promise.all(requests);
  fixNames(files);

  const ZIP = new JSZip();
  files.forEach(i => ZIP.file(i.name, i.blob));
  const A = await ZIP.generateAsync({ type: 'blob' });
  FS.saveAs(A, `${name}.zip`);
}

function saveEmojiJSON(guild: GuildData) {
  const { emojiID, emojiURL } = useDiscord();
  const emojisJSON = guild.emojis.map((e) => {
    return {
      name: e.name,
      id: e.id,
      identifier: emojiID(e),
      url: emojiURL(e),
    };
  });
  const guildJSON = {
    $schema,
    guildName: guild.name,
    guildID: guild.id,
    emojis: emojisJSON,
  };
  const json = JSON.stringify(guildJSON, null, 4);
  const blob = new Blob([json], { type: 'text/plain;charset=utf-8' });
  FS.saveAs(blob, `${guildName(guild)}.json`);
}

export default function () {
  return {
    saveEmoji: (emoji: Emoji) => saveFile(emoji),
    saveSticker: (sticker: Sticker) => saveFile(sticker),
    saveEmojiZIP: (guild: GuildData) => saveZIP(guild, 'Emoji'),
    saveStickerZIP: (guild: GuildData) => saveZIP(guild, 'Sticker'),
    saveEmojiJSON,
  };
}

interface File {
  name: string
  blob: Blob
}

type Content = Emoji | Sticker;

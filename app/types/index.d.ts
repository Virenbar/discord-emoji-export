import type { Emoji, Sticker } from './discord';

export * from './discord';
export * from './toast';

export interface GuildData {
  id: string
  name: string
  emojis: Emoji[]
  stickers: Sticker[]
}

export interface ButtonStates {
  emojiZIP: boolean
  emojiJSON: boolean
  stickerZIP: boolean
}

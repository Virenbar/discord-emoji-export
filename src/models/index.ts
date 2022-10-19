import { APIEmoji, APISticker } from "discord-api-types/v10";

export interface Guild {
    name: string
    id: string
}

export interface GuildData {
    guild?: Guild
    emojis: APIEmoji[]
    stickers: APISticker[]
}

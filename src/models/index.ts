import { APIEmoji } from "discord-api-types/v10";

export interface Guild {
    name: string
    id: string
}

export interface GuildEmojis {
    guild?: Guild
    emojis: APIEmoji[]
}

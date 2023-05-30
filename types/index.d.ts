import {
  APIEmoji, APISticker,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPICurrentUserResult,
  RESTGetAPIGuildEmojisResult,
  RESTGetAPIGuildStickersResult
} from "discord-api-types/v10";

export type User = RESTGetAPICurrentUserResult
export type Guilds = RESTGetAPICurrentUserGuildsResult
export type Emojis = RESTGetAPIGuildEmojisResult
export type Stickers = RESTGetAPIGuildStickersResult

export interface UserData {
  user?: APIUser
  guilds: Guilds
}
export interface GuildData {
  id: string
  name: string
  emojis: APIEmoji[]
  stickers: APISticker[]
}

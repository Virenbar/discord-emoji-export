import type {
  APIEmoji, APISticker,
  RESTAPIPartialCurrentUserGuild,
  RESTGetAPICurrentUserResult,
} from 'discord-api-types/v10';

export type User = RESTGetAPICurrentUserResult;
export type Guild = RESTAPIPartialCurrentUserGuild;
export type Emoji = APIEmoji;
export type Sticker = APISticker;

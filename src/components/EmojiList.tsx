import { APIEmoji } from "discord-api-types/v10";
import _ from "lodash";
import React from "react";
import { Emoji } from "./Emoji";

export function EmojiList(emojis: APIEmoji[]) {
    const list = _.sortBy(emojis, e => e.name).map(e =>
        <Emoji key={e.id} {...e} />
    );
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {list}
        </div>
    );
}

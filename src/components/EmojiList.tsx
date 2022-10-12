import { APIEmoji } from "discord-api-types/v10";
import _ from "lodash";
import React from "react";
import { Emoji } from "./Emoji";

export function EmojiList(props: Props) {
    const list = _.sortBy(props.emojis, e => e.name).map(e =>
        <Emoji key={e.id} emoji={e} />
    );
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {list}
        </div>
    );
}
interface Props {
    emojis: APIEmoji[]
}

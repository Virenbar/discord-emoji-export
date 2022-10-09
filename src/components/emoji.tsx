import { APIEmoji } from "discord-api-types/v10";
import React from "react";
import D from "../discord";
export function Emoji(emoji: APIEmoji) {
    const id = `<${D.emojiID(emoji)}>`;
    const url = D.emojiURL(emoji);
    return (
        <div className="d-flex flex-column text-center align-items-center emoji">
            <a href={url}>
                <img src={`${url}?size=40`} alt={emoji.name ?? ""} />
            </a>
            <span>{emoji.name}</span>
            <span>{emoji.id}</span>
            <span onClick={() => copyID(id)} >{id}</span>
        </div>
    );
}

function copyID(id: string) {
    navigator.clipboard.writeText(id);
}


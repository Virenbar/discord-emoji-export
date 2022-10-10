import { APIEmoji } from "discord-api-types/v10";
import React from "react";
import D from "../discord";
import Export from "../export";

export function Emoji(emoji: APIEmoji) {
    const id = `<${D.emojiID(emoji)}>`;
    const url = D.emojiURL(emoji);
    const name = D.emojiName(emoji);
    return (
        <div className="emoji card m-1 border-primary">
            <div className="card-header text-center">
                <span>{emoji.name}</span>
            </div>
            <div className="card-body d-flex flex-column text-center">
                <a href={url}>
                    <img src={`${url}?size=40`} alt={emoji.name ?? ""} />
                </a>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => copyID(id)}>Copy ID</button>
                    <button className="btn btn-primary" onClick={() => download(emoji)}>Download</button>
                </div>
            </div>
        </div>
    );
}

function copyID(id: string) {
    navigator.clipboard.writeText(id);
}

function download(emoji: APIEmoji) {
    Export.saveImage(emoji);
}

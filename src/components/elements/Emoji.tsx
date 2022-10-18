import { APIEmoji } from "discord-api-types/v10";
import React from "react";
import D from "../../discord";
import Export from "../../export";
import Toast from "../../helpers/toast";

export function Emoji(props: Props) {
    const emoji = props.emoji;
    const id = `<${D.emojiID(emoji)}>`;
    const url = D.emojiURL(emoji);
    return (
        <div className="emoji card m-1 border-primary">
            <div className="card-header text-center">
                <span>{emoji.name}</span>
            </div>
            <div className="card-body d-flex flex-column text-center">
                <a target="_blank" rel="noopener noreferrer" href={url}>
                    <img src={`${url}?size=40`} alt={emoji.name ?? ""} />
                </a>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={copyID}>Copy ID</button>
                    <button className="btn btn-primary" onClick={download}>Download</button>
                </div>
            </div>
        </div>
    );

    function copyID() {
        navigator.clipboard.writeText(id);
        Toast.showSuccess(`ID: ${id}`, "Emoji ID copied");
    }

    function download() {
        Export.saveImage(emoji);
    }
}
interface Props {
    emoji: APIEmoji
}

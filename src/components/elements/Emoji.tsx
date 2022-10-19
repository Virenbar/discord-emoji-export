import { APIEmoji } from "discord-api-types/v10";
import React from "react";
import Toast from "../../helpers/toast";
import Discord from "../../services/discord";
import Export from "../../services/export";

export function Emoji(props: Props) {
    const emoji = props.emoji;
    const id = `<${Discord.emojiID(emoji)}>`;
    const url = Discord.emojiURL(emoji);
    return (
        <div className="emoji card m-1 border-primary">
            <div className="card-header text-center">
                <span>{emoji.name}</span>
            </div>
            <div className="card-body d-flex flex-column text-center">
                <div>
                    <a target="_blank" rel="noopener noreferrer" href={url}>
                        <img src={`${url}?size=40`} alt={emoji.name ?? ""} />
                    </a>
                </div>
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
        Export.saveEmoji(emoji);
    }
}
interface Props {
    emoji: APIEmoji
}

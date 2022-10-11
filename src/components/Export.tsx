import { APIEmoji } from "discord-api-types/v10";
import React from "react";
import { Guild } from "../models";
import { EmojiList } from "./EmojiList";

export function Export(props: Props) {
    const guild = props.guild;
    return (
        <div id="tabs" className="card">
            <div className="card-header">
                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" data-bs-toggle="tab" href="#export" aria-selected="true" role="tab">Export</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#browse" aria-selected="false" role="tab" tabIndex={-1}>Browse</a>
                    </li>
                </ul>
            </div>

            <div className="card-body">
                <div className="tab-content">
                    <div id="export" className="tab-pane fade show active" role="tabpanel">
                        <button className="btn btn-primary" onClick={exportJSON}>Download as JSON</button>
                        <button className="btn btn-primary" onClick={exportZIP}>Download as ZIP</button>
                    </div>
                    <div id="browse" className="tab-pane fade" role="tabpanel">
                        <EmojiList {...props.emojis} />
                    </div>
                </div>
            </div>

            <div className="card-footer">
                {`${props.emojis.length} emojis`}
            </div>
        </div>
    );
    function exportJSON(e: React.MouseEvent) {
        console.log(e);
        console.log(guild);
    }
    function exportZIP(e: React.MouseEvent) {
        console.log(e);
        console.log(guild);
    }
}

interface Props {
    guild: Guild
    emojis: APIEmoji[]
}

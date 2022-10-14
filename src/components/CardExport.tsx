import { APIEmoji } from "discord-api-types/v10";
import React from "react";
import Export from "../export";
import Toast from "../helpers/toast";
import { Guild } from "../models";
import { EmojiList } from "./EmojiList";

export function CardExport(props: Props) {
    const [state, setState] = React.useState({
        jsonDisabled: false,
        zipDisabled: false
    });
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

                        <button type="button" className="btn btn-primary" disabled={state.jsonDisabled} onClick={exportJSON}>Download JSON</button>{" "}
                        <button type="button" className="btn btn-primary" disabled={state.zipDisabled} onClick={exportZIP}>Download ZIP</button>
                        <div className="alert alert-info alert-dismissible fade show mt-1">
                            <p>
                                JSON contains links to emojis
                            </p>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    <div id="browse" className="tab-pane fade" role="tabpanel">
                        <EmojiList emojis={props.emojis} />
                    </div>
                </div>
            </div>

            <div className="card-footer">
                {`${props.emojis.length} emojis`}
            </div>
        </div>
    );
    function exportJSON() {
        console.log("Generating JSON");
        setState({ ...state, jsonDisabled: true });

        Export.saveJSON(guild, props.emojis);
        Toast.showSuccess("JSON generated");

        setState({ ...state, jsonDisabled: false });
    }
    async function exportZIP() {
        console.log("Generating ZIP");
        setState({ ...state, zipDisabled: true });

        Toast.showInfo("Creating ZIP archive");
        await Export.saveZIP(guild, props.emojis);

        Toast.showSuccess("ZIP archive created");
        setState({ ...state, zipDisabled: false });
    }
}

interface Props {
    guild: Guild
    emojis: APIEmoji[]
}

import _ from "lodash";
import React, { useEffect, useState } from "react";
import Toast from "../../helpers/toast";
import { GuildEmojis } from "../../models";
import Export from "../../services/export";
import { Button } from "../elements/common/Button";
import { Emoji } from "../elements/Emoji";

export function CardExport(props: GuildEmojis) {
    const disabled = !props.emojis?.length;
    const [state, setState] = useState({ zipDisabled: disabled, jsonDisabled: disabled });
    useEffect(() => setState({ zipDisabled: disabled, jsonDisabled: disabled }), [disabled]);
    if (!props.guild) { return null; }

    const guild = props.guild;
    const emojis = props.emojis;
    const list = _.sortBy(props.emojis, e => e.name?.toLowerCase()).map(e => <Emoji key={e.id} emoji={e} />);
    return (
        <div id="tabs" className="card">
            <div className="card-header d-flex align-items-center">
                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" data-bs-toggle="tab" href="#export" aria-selected="true" role="tab">Download</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#browse" aria-selected="false" role="tab" tabIndex={-1}>Browse</a>
                    </li>
                </ul>
                <div className="text-muted ms-auto">{`${emojis.length} emojis`}</div>
            </div>

            <div className="card-body">
                <div className="tab-content">
                    <div id="export" className="tab-pane fade show active" role="tabpanel">
                        <Button text="Download ZIP" onClick={exportZIP} disabled={state.zipDisabled} />{" "}
                        <Button text="Download JSON" onClick={exportJSON} disabled={state.jsonDisabled} />
                        {/* <button type="button" className="btn btn-primary" disabled={state.zipDisabled} onClick={exportZIP}>Download ZIP</button>{" "} */}
                        {/* <button type="button" className="btn btn-primary" disabled={state.jsonDisabled} onClick={exportJSON}>Download JSON</button> */}
                        <div className="alert alert-info alert-dismissible fade show mt-1">
                            <span>
                                JSON contains only links to emojis
                            </span>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    <div id="browse" className="tab-pane fade" role="tabpanel">
                        <div className="d-flex flex-wrap justify-content-center">
                            {list}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    function exportJSON() {
        console.log("Generating JSON");
        setState({ ...state, jsonDisabled: true });

        Export.saveJSON(guild, emojis);
        Toast.showSuccess("JSON generated");

        setState({ ...state, jsonDisabled: false });
    }
    async function exportZIP() {
        console.log("Generating ZIP");
        setState({ ...state, zipDisabled: true });

        Toast.showInfo("Creating ZIP archive");
        await Export.saveZIP(guild, emojis);

        Toast.showSuccess("ZIP archive created");
        setState({ ...state, zipDisabled: false });
    }
}

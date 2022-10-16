import React from "react";

export function CardGuild() {
    return (
        <div className="card text-white border-primary mb-3">
            <div className="card-header d-flex align-items-center justify-content-between">

                <h4 className="m-0 col-3">Discord Emoji Export</h4>
                <div className="col-6">
                    <div className="input-group">
                        <span className="input-group-text">Token</span>
                        <input type="text" className="form-control" id="inputToken" placeholder="JWT token..."></input>
                        <button className="btn btn-primary" type="button" onclick="setToken()">Set Token</button>
                    </div>
                </div>
                <div className=" col-3">
                    <div id="logout" className="btn-group float-end">
                        <button id="user" className="btn btn-secondary">
                            <img className="rounded-circle" height="32" src="https://cdn.discordapp.com/embed/avatars/0.png?size=32"></img>
                            <span className="align-middle">User#0000</span>
                        </button>
                        <button className="btn btn-primary">Clear</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <ol>
                    <li>Paste token and click "Set Token"</li>
                    <li>Select guild from list and click "Select"</li>
                </ol>
                {/* <GuildSelect > */}
            </div>
            <div className="card-footer text-muted">
                0 guilds
            </div>
        </div >
    );
}

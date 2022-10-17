import { APIUser, RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import React, { useState } from "react";
import Discord from "../../discord";
import { getElementById } from "../../helpers";
import Message from "../../helpers/message";
import { Guild } from "../../models";
import ClearButton from "../elements/ClearButton";
import { GuildSelect } from "../GuildSelect";

export function CardGuild(props: Props) {
    const [state, setState] = useState<State>({ guilds: [] });

    return (
        <div className="card text-white border-primary mb-3">

            <div className="card-header d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <h4 className="m-0">Discord Emoji Export</h4>
                    <button type="button" className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#tokenModal">How to get Token</button>
                </div>
                <div>
                    <ClearButton user={state.user} onClick={clearToken} />
                </div>
            </div>
            <div className="card-body">
                {/* Token */}
                <div className="input-group my-1">
                    <span className="input-group-text font-monospace">Token</span>
                    <input type="text" className="form-control" id="inputToken" placeholder="JWT token..." />
                    <button className="btn btn-primary" type="button" onClick={setToken}>Set Token</button>
                </div>
                {/* Guild Select */}
                <GuildSelect guilds={state.guilds} onSelect={props.onSelect} />
            </div>
            <div className="card-footer text-muted">
                {state.guilds.length} guilds
            </div>
        </div >
    );
    function clearToken() {
        localStorage.clear();
        CheckToken();
    }

    function setToken() {
        const token = getElementById<HTMLInputElement>("inputToken").value;
        const Match = /(\w+\.\w+\.\w+)/.exec(token);
        if (Match?.length) {
            console.log("Token matched");
            localStorage.setItem("token", Match[0]);
            console.info("Token saved");
            CheckToken();
        } else {
            console.log("Invalid token");
        }
    }

    async function CheckToken() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setState({ guilds: [] });
                return;
            }

            Discord.setToken(token);
            Message.info("Token set");
            const user = await Discord.getMe();
            const guilds = await Discord.getGuilds();

            setState({ user, guilds });

        } catch (error) {
            Message.error(error as Error);
        }
    }

}
interface Props {
    onClear: () => void
    onSelect: (guild: Guild) => void
}

interface State {
    token?: string
    user?: APIUser
    guilds: RESTAPIPartialCurrentUserGuild[]
}


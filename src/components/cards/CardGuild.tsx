import { APIUser, RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import React, { useState } from "react";
import Toast from "../../helpers/toast";
import { Guild } from "../../models";
import Discord from "../../services/discord";
import ClearButton from "../elements/ClearButton";
import { GuildSelect } from "../elements/GuildSelect";
import { TokenInput } from "../elements/TokenInput";
import { TokenWarning } from "../elements/TokenWarning";

export function CardGuild(props: Props) {
    const [state, setState] = useState<State>({ guilds: [] });
    if (!state.user) { loadToken(); }

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
                <TokenInput onClick={setToken} />
                <GuildSelect guilds={state.guilds} onSelect={props.onSelect} />
                <TokenWarning />
            </div>
            <div className="card-footer text-muted">
                {state.guilds.length} servers
            </div>
        </div>
    );

    function clearToken() {
        localStorage.clear();
        setState({ guilds: [] });
        props.onClear();
    }

    async function setToken(token: string) {
        const Match = /(\w+\.\w+\.\w+)/.exec(token);
        if (Match?.length) {
            await initDiscord(Match[0]);
            Toast.showInfo("Token validated");
        } else {
            Toast.showWarning("Invalid token format", "Invalid token");
        }
    }

    async function loadToken() {
        const token = localStorage.getItem("token");
        if (!token) { return; }

        await initDiscord(token);
        Toast.showInfo("Token loaded from local storage");
    }

    async function initDiscord(token: string) {

        try {
            Discord.setToken(token);
            const user = await Discord.getMe();
            const guilds = await Discord.getGuilds();
            localStorage.setItem("token", token);
            setState({ user, guilds });
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                Toast.showError(e.message, e.name);
            } else { Toast.showError(`${e}`); }
        }
    }

}

interface Props {
    onClear: () => void
    onSelect: (guild: Guild) => void
}

interface State {
    user?: APIUser
    guilds: RESTAPIPartialCurrentUserGuild[]
}


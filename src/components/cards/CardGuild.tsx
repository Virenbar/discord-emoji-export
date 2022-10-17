import { APIUser, RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import React, { useState } from "react";
import Discord from "../../discord";
import Message from "../../helpers/message";
import { Guild } from "../../models";
import ClearButton from "../elements/ClearButton";
import { GuildSelect } from "../elements/GuildSelect";
import { TokenHelp } from "../elements/TokenHelp";
import { TokenInput } from "../elements/TokenInput";

export function CardGuild(props: Props) {
    const [state, setState] = useState<State>({ guilds: [] });

    return (
        <div className="card text-white border-primary mb-3">

            <div className="card-header d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <h4 className="m-0">Discord Emoji Export</h4>
                    <TokenHelp />
                </div>
                <div>
                    <ClearButton user={state.user} onClick={clearToken} />
                </div>
            </div>
            <div className="card-body">
                <TokenInput onClick={setToken} />
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

    function setToken(token: string) {
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
    user?: APIUser
    guilds: RESTAPIPartialCurrentUserGuild[]
}


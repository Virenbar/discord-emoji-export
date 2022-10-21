import { APIUser, RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import { useState } from "preact/hooks";
import { HandleError } from "../../helpers";
import Toast from "../../helpers/toast";
import { Guild } from "../../models";
import Discord from "../../services/discord";
import { AlertToken } from "../elements/alerts/AlertToken";
import ClearButton from "../elements/ClearButton";
import { GuildSelect } from "../elements/GuildSelect";
import { TokenInput } from "../elements/TokenInput";

export function CardGuild(props: Props) {
    const [state, setState] = useState<State>({ guilds: [] });
    if (!state.user) { loadToken(); }

    return (
        <div class="card text-white border-primary mb-3">
            <div class="card-header d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <h4 class="m-0">Discord Emoji Export</h4>
                    <button type="button" class="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#tokenModal">How to get Token</button>
                </div>
                <div>
                    <ClearButton user={state.user} onClick={clearToken} />
                </div>
            </div>
            <div class="card-body">
                <TokenInput onClick={setToken} />
                <GuildSelect guilds={state.guilds} onSelect={props.onSelect} />
                <AlertToken />
            </div>
            <div class="card-footer text-muted">
                <div class="float-end">
                    {state.guilds.length} servers
                </div>
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
        } catch (error) {
            HandleError(error);
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


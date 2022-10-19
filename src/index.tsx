import "bootstrap";

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { CardExport } from "./components/cards/CardExport";
import { CardGuild } from "./components/cards/CardGuild";
import { getElementById } from "./helpers/document";
import { Guild, GuildEmojis } from "./models";
import Discord from "./services/discord";

function Main() {
    const [state, setState] = useState<GuildEmojis>({ emojis: [] });
    console.log(`State: ${state.guild?.name}(${state.guild?.id}) - ${state.emojis.length}`);
    return (
        <div className="container overflow-hidden">
            <CardGuild onClear={onClear} onSelect={onSelect} />
            <CardExport guild={state.guild} emojis={state.emojis} />
        </div>
    );

    async function onSelect(guild: Guild) {
        const emojis = await Discord.getGuildEmojis(guild.id);
        setState({ guild, emojis });
    }

    function onClear() {
        setState({ emojis: [] });
    }
}

const Root = ReactDOM.createRoot(getElementById("main"));
Root.render(<Main />);

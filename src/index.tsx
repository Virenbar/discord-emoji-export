import "bootstrap";

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { CardExport } from "./components/cards/CardExport";
import { CardGuild } from "./components/cards/CardGuild";
import { getElementById } from "./helpers/document";
import { Guild, GuildData } from "./models";
import Discord from "./services/discord";

function Main() {
    const [state, setState] = useState<GuildData>({ emojis: [], stickers: [] });
    console.log(`State: ${state.guild?.name}(${state.guild?.id}) - ${state.emojis.length} - ${state.stickers.length}`);
    return (
        <div className="container overflow-hidden">
            <CardGuild onClear={onClear} onSelect={onSelect} />
            <CardExport guild={state.guild} emojis={state.emojis} stickers={state.stickers} />
        </div>
    );

    async function onSelect(guild: Guild) {
        const emojis = await Discord.getGuildEmojis(guild.id);
        const stickers = (await Discord.getGuildStickers(guild.id))
            .filter(s => s.format_type != 3);
        setState({ guild, emojis, stickers });
    }

    function onClear() {
        setState({ emojis: [], stickers: [] });
    }
}

const Root = ReactDOM.createRoot(getElementById("main"));
Root.render(<Main />);

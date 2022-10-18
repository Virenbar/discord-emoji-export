import { APIEmoji } from "discord-api-types/v10";
import React, { useState } from "react";
import { CardExport } from "./components/cards/CardExport";
import { CardGuild } from "./components/cards/CardGuild";
import Discord from "./discord";
import { Guild } from "./models";

export default function App() {

    const [state, setState] = useState<State>({ emojis: [] });

    return (
        <div className="container overflow-hidden">
            <CardGuild onClear={onClear} onSelect={onSelect} />
            <CardExport guild={state.guild} emojis={state.emojis} />
        </div>
    );

    function onClear() {
        setState({ emojis: [] });
    }

    async function onSelect(guild: Guild) {
        const emojis = await Discord.getGuildEmojis(guild.id);
        setState({ guild, emojis });
    }
}

interface State {
    guild?: Guild
    emojis?: APIEmoji[]
}

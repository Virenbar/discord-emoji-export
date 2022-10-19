import { RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import _ from "lodash";
import React, { ChangeEvent, useState } from "react";
import { Guild } from "../../models";

export function GuildSelect(props: Props) {
    const [guild, setID] = useState<Guild>({ id: "", name: "" });

    const guilds = _.sortBy(props.guilds, g => g.name.toLowerCase());
    const options = guilds.map(g => (<option key={g.id} value={g.id}> {g.name}</option>));
    options.unshift(<option key="" value="">Choose server...</option>);
    return (
        <div className="input-group">
            <label className="input-group-text font-monospace" htmlFor="inputGuild">Server</label>
            <select className="form-select" disabled={guilds.length == 0} onChange={onChange}>
                {options}
            </select>
            <button className="btn btn-primary" type="button" disabled={guild.id == ""} onClick={() => props.onSelect(guild)}>Select</button>
        </div>
    );
    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        const index = e.target.selectedIndex;
        const s = e.target.options[index];
        setID({
            id: s.value,
            name: s.text
        });
    }
}

interface Props {
    guilds: RESTAPIPartialCurrentUserGuild[],
    onSelect: (guild: Guild) => void
}

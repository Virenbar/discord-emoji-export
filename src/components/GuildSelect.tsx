import { RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import _ from "lodash";
import React, { ChangeEvent, useState } from "react";
import { Guild } from "../models";

export function GuildSelect(props: Props) {
    const [guild, setID] = useState<Guild>({ id: "", name: "" });

    const guilds = _.sortBy(props.guilds, g => g.name.toLowerCase());
    const disabled = guilds.length == 0;
    const options = guilds.map(g => (<option key={g.id} value={g.id}> {g.name}</option>));
    options.unshift(<option key={0}>Choose guild...</option>);

    return (
        <div className="input-group mb-3">
            <label className="input-group-text font-monospace" htmlFor="inputGuild">Guild</label>
            <select className="form-select" disabled={disabled} onChange={onChange}>
                {options}
            </select>
            <button className="btn btn-primary" type="button" disabled={disabled} onClick={select}>Select</button>
        </div>
    );
    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        const index = e.target.selectedIndex;
        if (!index) { return; }
        const s = e.target.options[index];
        setID({
            id: s.value,
            name: s.text
        });
    }
    function select() {
        props.onSelect(guild);
    }

}
interface Props {
    guilds: RESTAPIPartialCurrentUserGuild[],
    onSelect: (guild: Guild) => void
}

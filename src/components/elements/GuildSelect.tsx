import { RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import _ from "lodash";
import { useState } from "preact/hooks";
import { Guild } from "../../models";

export function GuildSelect(props: Props) {
    const [guild, setID] = useState<Guild>({ id: "", name: "" });

    const guilds = _.sortBy(props.guilds, g => g.name.toLowerCase());
    const options = guilds.map(g => (<option key={g.id} value={g.id}> {g.name}</option>));
    options.unshift(<option key="" value="">Choose server...</option>);
    return (
        <div class="input-group">
            <label class="input-group-text font-monospace" htmlFor="inputGuild">Server</label>
            <select class="form-select" disabled={guilds.length == 0} onInput={onChange}>
                {options}
            </select>
            <button class="btn btn-primary" type="button" disabled={guild.id == ""} onClick={() => props.onSelect(guild)}>Select</button>
        </div>
    );
    function onChange(e: Event) {
        if (!(e.target instanceof HTMLSelectElement)) { return; }
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

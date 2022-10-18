import { APIUser } from "discord-api-types/v10";
import React from "react";
import Discord from "../../discord";

export default function ClearButton(props: Props) {
    const user = props.user;
    if (!user) { return null; }

    const avatar = Discord.userAvatar(user);

    return (
        <div className="btn-group float-end">
            <button className="btn btn-secondary">
                <img className="rounded-circle" height="28" src={avatar} />
                <span className="align-middle">{` ${user.username}#${user.discriminator}`}</span>
            </button>
            <button className="btn btn-primary" onClick={props.onClick}>Clear token</button>
        </div>
    );
}

interface Props {
    user?: APIUser
    onClick: () => void
}

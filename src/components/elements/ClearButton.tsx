import { APIUser } from "discord-api-types/v10";
import Discord from "../../services/discord";

export default function ClearButton(props: Props) {
    const user = props.user;
    if (!user) { return null; }

    const avatar = Discord.userAvatar(user);

    return (
        <div class="btn-group float-end">
            <button class="btn btn-secondary">
                <img class="rounded-circle" height="28" src={avatar} />
                <span class="align-middle">{` ${user.username}#${user.discriminator}`}</span>
            </button>
            <button class="btn btn-primary" onClick={props.onClick}>Clear token</button>
        </div>
    );
}

interface Props {
    user?: APIUser
    onClick: () => void
}

import { useState } from "preact/hooks";

export function TokenInput(props: Props) {
    const [token, setToken] = useState("");
    return (
        <div class="input-group mb-1">
            <span class="input-group-text font-monospace">Token&nbsp;</span>
            <input
                type="text" class="form-control"
                value={token}
                onChange={e => {
                    if (e.target instanceof HTMLInputElement) {
                        setToken(e.target.value);
                    }
                }}
                placeholder="MTMy2Dc5M5xNDclwMTguNDcy.RS26iZ.KFAwot03n1l7lrpb5ksFOR;hdldmWpyhryRgsWttF3gralg5VjB6eFhINHI..." />
            <button class="btn btn-primary" type="button" onClick={onClick}>Set token</button>
        </div>
    );

    function onClick() {
        props.onClick(token);
        setToken("");
    }
}

interface Props {
    onClick: (token: string) => void
}

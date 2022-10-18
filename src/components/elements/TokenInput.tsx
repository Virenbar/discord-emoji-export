import React, { useState } from "react";

export function TokenInput(props: Props) {
    const [token, setToken] = useState("");
    return (
        <div className="input-group my-1">
            <span className="input-group-text font-monospace">Token&nbsp;</span>
            <input
                type="text" className="form-control"
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="MTMy2Dc5M5xNDclwMTguNDcy.RS26iZ.KFAwot03n1l7lrpb5ksFOR;hdldmWpyhryRgsWttF3gralg5VjB6eFhINHI..." />
            <button className="btn btn-primary" type="button" onClick={onClick}>Set token</button>
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

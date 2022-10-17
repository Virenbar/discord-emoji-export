import React, { useState } from "react";

export function TokenInput(props: Props) {
    const [token, setToken] = useState("");
    return (
        <div className="input-group my-1">
            <span className="input-group-text font-monospace">Token</span>
            <input type="text" className="form-control" onChange={(e) => setToken(e.target.value)} placeholder="JWT token..." />
            <button className="btn btn-primary" type="button" onClick={() => props.onClick(token)}>Set Token</button>
        </div>
    );
}

interface Props {
    onClick: (token: string) => void
}


import React from "react";

export function TokenWarning() {
    return (
        <div className="alert alert-warning alert-dismissible fade show mt-1">
            <span>
                <strong>Warning: do not share your token with anyone!</strong><br />
                This site uses your token only to authenticate with Discord, fetch your server list and their emojis.<br />
                Token is saved locally. Clear it after you done.
            </span>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

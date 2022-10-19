
import React from "react";

export function AlertDownload() {
    return (
        <div className="alert alert-info alert-dismissible fade show my-1">
            <span>
                JSON contains only links to emojis
            </span>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

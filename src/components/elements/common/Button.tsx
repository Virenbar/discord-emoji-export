import React from "react";

export function Button(props: Props) {
    return (
        <button
            type="button"
            className="btn btn-primary"
            disabled={props.disabled}
            onClick={props.onClick}>
            {props.text}
        </button>
    );
}

interface Props {
    text: string
    onClick: () => void
    disabled?: boolean
}

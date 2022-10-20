import React from "react";

export function ButtonLabel(props: Props) {
    return <span className="btn btn-secondary disabled">{props.text}</span>;
}

interface Props {
    text: string
}

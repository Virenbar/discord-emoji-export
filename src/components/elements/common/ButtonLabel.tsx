import React from "react";

export function ButtonLabel(props: Props) {
    return <button className="btn btn-secondary disabled">{props.text}</button>;
}

interface Props {
    text: string
}

import React from "react";

export function Welcome(props: User) {
    return <h1>Привет, {props.name}</h1>;
}

interface User {
    name: string
}

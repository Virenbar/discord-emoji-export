import React from "react";

export function Welcome(props: User) {
    return <h1>Привет, {props.name}</h1>;
}

function App() {
    return (
        <div>
            <Welcome name="Алиса" />
            <Welcome name="Базилио" />
            <Welcome name="Буратино" />
        </div>
    );
}

interface User {
    name: string
}


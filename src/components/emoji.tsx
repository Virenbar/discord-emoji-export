import { APIEmoji } from "discord-api-types/v10";
import React from "react";

export function Emoji(emoji: APIEmoji) {
    const id = `<${emoji.animated ? "a:" : ":"}${emoji.name}:${emoji.id}>`;
    const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`;
    return (
        <div className="d-flex flex-column text-center align-items-center emoji">
            <a href={url}>
                <img src={`${url}?size=40`} alt={emoji.name ?? ""} />
            </a>
            <span>{emoji.name}</span>
            <span>{emoji.id}</span>
            <span onClick={() => copyID(id)} >{id}</span>
        </div>
    );
}

function copyID(id: string) {
    navigator.clipboard.writeText(id);
}

export function EmojiList(emojis: APIEmoji[]) {
    const list = emojis.map(e =>
        <Emoji key={e.id} {...e} />
    );
    return (
        <div className="d-flex flex-wrap justify-content-between">
            {list}
        </div>
    );
}
export function Welcome(props: User) {
    return <h1>Привет, {props.name}</h1>;
}

/*
function App() {
    return (
        <div>
            <Welcome name="Алиса" />
            <Welcome name="Базилио" />
            <Welcome name="Буратино" />
        </div>
    );
}*/

interface User {
    name: string
}


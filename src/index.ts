/* eslint-disable @typescript-eslint/no-non-null-assertion */

import "bootstrap";

import { APIEmoji, APIUser } from "discord-api-types/v10";
import React from "react";
import ReactDOM from "react-dom/client";
import { CardExport } from "./components/cards/CardExport";
import { GuildSelect } from "./components/elements/GuildSelect";
import Discord from "./discord";
import { getElementById, querySelector } from "./helpers/document";
import Message from "./helpers/message";
import { Guild } from "./models";

const e = React.createElement;

// Variables
let Guild: Guild = { name: "", id: "" };
let Emojis: APIEmoji[] = [];

// Elements
const Guilds = ReactDOM.createRoot(getElementById<HTMLSelectElement>("guildSelect"));
const Tabs = ReactDOM.createRoot(getElementById("tabs"));
const Logout = getElementById("logout");

function Init() {
    Logout.style.display = "none";

    querySelector<HTMLButtonElement>("#logout .btn-primary").onclick = (e) => {
        e.preventDefault();
        logout();
    };
    Guilds.render(e(GuildSelect, { guilds: [], onSelect: () => null }, null));
}

function setToken() {
    const token = getElementById<HTMLInputElement>("inputToken").value;
    const Match = /(\w+\.\w+\.\w+)/.exec(token);
    if (Match?.length) {
        console.log("Token matched");
        localStorage.setItem("token", Match[0]);
        console.info("Token saved");
        CheckToken();
    }
}

async function CheckToken() {
    try {
        const token = localStorage.getItem("token");
        if (!token) { return; }

        Discord.setToken(token);
        Message.info("Token set");
        const user = await Discord.getMe();
        setUser(user);

        await setGuildsList();
    } catch (error) {
        Message.error(error as Error);
    }
}

function setUser(user: APIUser) {
    const avatar = Discord.userAvatar(user);

    (Logout.firstElementChild!.children[0] as HTMLImageElement).src = avatar;

    querySelector<HTMLImageElement>("#logout img").src = avatar;
    querySelector<HTMLSpanElement>("#logout span").textContent = ` ${user.username}#${user.discriminator}`;
    Logout.style.display = "";
}

async function setGuildsList() {
    const guilds = await Discord.getGuilds();
    querySelector(".card .card-footer").textContent = `${guilds.length} guilds`;

    Guilds.render(e(GuildSelect, { guilds: guilds, onSelect: setEmojiList }, null));
}

async function setEmojiList(guild: Guild) {
    console.log(guild);
    Guild = guild;
    Emojis = await Discord.getGuildEmojis(Guild.id);
    Tabs.render(e(CardExport, { guild: Guild, emojis: Emojis }, null));
}

function logout() {
    localStorage.clear();
    Logout.style.display = "none";

    // location.href = location.origin;
}

// Event Handlers
window.onload = () => {
    Init();
    CheckToken();
};

window.setToken = setToken;

// Global
declare global {
    interface Window {
        setToken: () => void;
    }
}

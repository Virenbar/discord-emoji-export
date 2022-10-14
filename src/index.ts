/* eslint-disable @typescript-eslint/no-non-null-assertion */

//import "@popperjs/core";
import "bootstrap";

//import $ from "jquery";
import { APIEmoji, APIUser } from "discord-api-types/v10";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { CardExport } from "./components/CardExport";
import D from "./discord";
import { getElementById, querySelector } from "./helpers/document";
import Message from "./helpers/message";
import { Guild } from "./models";

const e = React.createElement;

// Variables
let Guild: Guild = { name: "", id: "" };
let Emojis: APIEmoji[] = [];

// Elements
const Tabs = getElementById("tabs");
const Logout = getElementById("logout");
const InputGuild = getElementById<HTMLSelectElement>("inputGuild");

/*
ReactDOM.render(
    React.createElement(e, null, null),
    Tabs
    );*/

function Init() {
    Logout.style.display = "none";

    querySelector<HTMLButtonElement>("#logout .btn-primary").onclick = (e) => {
        e.preventDefault();
        logout();
    };
    querySelector<HTMLButtonElement>("#guild button").onclick = (e) => {
        e.preventDefault();
        setEmojiList();
    };
}

function setToken() {
    const token = (getElementById<HTMLInputElement>("inputToken")).value;
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

        D.setToken(token);
        Message.info("Token set");
        const user = await D.getMe();
        setUser(user);

        await setGuildsList();
    } catch (error) {
        Message.error(error as Error);
    }
}

function setUser(user: APIUser) {
    const avatar = D.userAvatar(user);

    (Logout.firstElementChild!.children[0] as HTMLImageElement).src = avatar;

    document.querySelector<HTMLImageElement>("#logout img")!.src = avatar;
    document.querySelector<HTMLSpanElement>("#logout span")!.textContent = ` ${user.username}#${user.discriminator}`;
    Logout.style.display = "";
}

async function setGuildsList() {
    let guilds = await D.getGuilds();
    guilds = _.sortBy(guilds, g => g.name);

    //Guild.length = 0;
    for (const guild of guilds) {
        const O = new Option(guild.name, guild.id);
        InputGuild.add(O);
    }
    InputGuild.attributes.removeNamedItem("disabled");
    document.querySelector("#guild button")!.attributes.removeNamedItem("disabled");
    document.querySelector(".card .card-footer")!.textContent = `${guilds.length} guilds`;
}

async function setEmojiList() {
    const index = InputGuild.selectedIndex;
    if (!index) { return; }
    Guild = {
        id: InputGuild.options[index].value,
        name: InputGuild.options[index].text
    };

    Emojis = await D.getGuildEmojis(Guild.id);

    //Tabs.render(CardExport({ guild: Guild, emojis: Emojis }));
    ReactDOM.render(React.createElement(CardExport, { guild: Guild, emojis: Emojis }, null), Tabs);
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

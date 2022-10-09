/* eslint-disable @typescript-eslint/no-non-null-assertion */

//import "@popperjs/core";
import "bootstrap";

//import $ from "jquery";
import { APIEmoji, APIUser } from "discord-api-types/v10";
import _ from "lodash";
import ReactDOM from "react-dom/client";
import { EmojiList } from "./components/EmojiList";
import D from "./discord";

// Variables
let Guild = { name: "", id: "" };
let Emojis: APIEmoji[] = [];

// Roots
const Browse = ReactDOM.createRoot(document.getElementById("browse") as HTMLElement);

// Elements
const Logout = document.getElementById("logout",) as HTMLElement;
const InputGuild = document.getElementById("inputGuild") as HTMLSelectElement;
const Tabs = document.getElementById("tabs") as HTMLElement;

function Init() {
    Logout.style.display = "none";
    Tabs.style.display = "none";

    document.querySelector<HTMLButtonElement>("#logout .btn-primary")!.onclick = (e) => {
        e.preventDefault();
        logout();
    };
    document.querySelector<HTMLButtonElement>("#guild button")!.onclick = (e) => {
        console.info(e.target);
        setEmojiList();
    };
}

function setToken() {
    const token = (<HTMLInputElement>document.getElementById("inputToken")).value;
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
        const user = await D.getMe();
        setUser(user);

        await setGuildsList();
    } catch (error) {
        console.error(error);
    }
}

function setUser(user: APIUser) {
    const avatar = (user.avatar)
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=32`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png?size=32`;

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
    Tabs.style.display = "";
    Emojis = await D.getGuildEmojis(Guild.id);
    Browse.render(EmojiList(Emojis));
}

function logout() {
    localStorage.clear();
    Tabs.style.display = "none";
    Logout.style.display = "none";

    // location.href = location.origin;
}

function error(text: string) {
    console.error(text);
}

// Event Handlers
function exportJSON(e: MouseEvent) {
    console.log(e);
}
function exportZIP(e: MouseEvent) {
    console.log(e);
}

window.onload = () => {
    Init();
    CheckToken();
};

window.setToken = setToken;
window.exportJSON = exportJSON;
window.exportZIP = exportZIP;

// Global
declare global {
    interface Window {
        setToken: () => void;
        exportJSON: (e: MouseEvent) => void
        exportZIP: (e: MouseEvent) => void
    }
}

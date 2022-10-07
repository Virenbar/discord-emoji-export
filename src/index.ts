/* eslint-disable @typescript-eslint/no-non-null-assertion */
//import "./css/bootstrap.scss";
//import "./css/custom.scss";

import "@popperjs/core";
import "bootstrap";

//import $ from "jquery";
import { APIUser } from "discord-api-types/v10";
import _ from "lodash";
import ReactDOM from "react-dom/client";
import { EmojiList, Welcome } from "./components/emoji";
import D from "./discord";

const t = Welcome({ name: "1234" });
const Browse = ReactDOM.createRoot(document.getElementById("browse") as HTMLElement);
Browse.render(t);

/////////////////////
const Logout = document.getElementById("logout",) as HTMLElement;
const Guild = document.getElementById("inputGuild") as HTMLSelectElement;
const Export = document.getElementById("tabs") as HTMLElement;

function Init() {
    Logout.style.display = "none";

    //Export.style.display = "none";

    document.querySelector<HTMLButtonElement>("#logout .btn-primary")!.onclick = (e) => {
        console.log(e.target);
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
        console.log(Match[0]);
        localStorage.setItem("token", Match[0]);
        console.info("Token saved");
        CheckToken();
    }
}

async function CheckToken() {
    try {
        const token = localStorage.getItem("token");
        if (!token) { return; }
        Logout.style.display = "";

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

    document.querySelector<HTMLImageElement>("#logout img")!.src = avatar;
    document.querySelector<HTMLSpanElement>("#logout span")!.textContent = ` ${user.username}#${user.discriminator}`;
}

async function setGuildsList() {
    let guilds = await D.getGuilds();
    guilds = _.sortBy(guilds, g => g.name);

    //Guild.length = 0;
    for (const guild of guilds) {
        const O = new Option(guild.name, guild.id);
        Guild.add(O);
    }
    Guild.attributes.removeNamedItem("disabled");
    document.querySelector("#guild button")!.attributes.removeNamedItem("disabled");
    document.querySelector(".card .card-footer")!.textContent = `${guilds.length} guilds`;
}

async function setEmojiList() {
    const index = Guild.selectedIndex;
    if (!index) { return; }
    const id = Guild.options[index].value;
    const emojis = await D.getGuildEmojis(id);
    console.log(emojis);
    Browse.render(EmojiList(emojis));
}

function logout() {
    localStorage.clear();
    location.href = location.origin;
}
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

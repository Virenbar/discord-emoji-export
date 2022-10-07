/* eslint-disable @typescript-eslint/no-non-null-assertion */
//import "./css/bootstrap.scss";
//import "./css/custom.scss";

import "@popperjs/core";
import "bootstrap";

//import $ from "jquery";
import { APIUser } from "discord-api-types/v10";
import _ from "lodash";
import ReactDOM from "react-dom/client";
import { Welcome } from "./components/emoji";
import D from "./discord";

//import "bootstrap-select/dist/css/bootstrap-select.css"
/*
function component() {
    const element = document.createElement("div");
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    return element;
}
document.body.appendChild(component());
*/
const t = Welcome({ name: "1234" });
const card = ReactDOM.createRoot(document.getElementById("export") as HTMLElement);
card.render(t);

/////////////////////
const Login = document.getElementById("login",) as HTMLElement;
const Logout = document.getElementById("logout",) as HTMLElement;
const Guild = document.getElementById("inputGuild") as HTMLSelectElement;
const Export = document.getElementById("tabs") as HTMLElement;

function Init() {
    const Params = new URLSearchParams({
        client_id: "1023904952634056754",
        redirect_uri: window.location.origin,
        response_type: "token",
        scope: "identify guilds"
    });
    Login.style.display = "none";
    Logout.style.display = "none";

    // Export.style.display = "none";

    document.querySelector<HTMLLinkElement>("#login a")!.href = "https://discord.com/api/oauth2/authorize?" + Params.toString();
    document.querySelector<HTMLButtonElement>("#logout .btn-primary")!.onclick = (e) => {
        console.log(e.target);
        logout();
    };
    document.querySelector<HTMLButtonElement>("#guild button")!.onclick = (e) => {
        console.info(e.target);
        setEmojiList();
    };
}

async function CheckToken() {
    try {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const access_token = fragment.get("access_token");
        if (access_token) {
            localStorage.setItem("token", access_token);
            console.info("Token saved");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            Login.style.display = "";
            return;
        } else {
            Logout.style.display = "";
        }

        D.setToken(token);
        const T = await D.getTokenInfo();
        console.log(T, new Date(T.expires));

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
}

function logout() {
    localStorage.clear();
    location.href = location.origin;
}
window.onload = () => {
    Init();
    CheckToken();
};

export function TTT() {
    console.log("TTT");
}

<script setup lang="ts">
import { APIUser, RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import Toast from "~/utils/toast";

const state = useState<State>(() => ({ guilds: [] }));
if (!state.value.user) { loadToken(); }

function clearToken() {
  localStorage.clear();
  state.value = { guilds: [] };

}

async function setToken(token: string) {
  const Match = /(\w+\.\w+\.\w+)/.exec(token);
  if (Match?.length) {
    if (await initDiscord(Match[0])) {
      Toast.showInfo("Token validated");
    }
  } else {
    Toast.showWarning("Invalid token format", "Invalid token");
  }
}

async function loadToken() {
  const token = localStorage.getItem("token");
  if (!token) { return; }

  if (await initDiscord(token)) {
    Toast.showInfo("Token loaded from local storage");
  }
}

async function initDiscord(token: string) {
  try {
    Discord.setToken(token);
    const user = await Discord.getMe();
    const guilds = await Discord.getGuilds();
    localStorage.setItem("token", token);
    state.value = { user, guilds };
    return true;
  } catch (error) {
    HandleError(error);
    return false;
  }
}

interface State {
  user?: APIUser
  guilds: RESTAPIPartialCurrentUserGuild[]
}
</script>
<template>
  <div class="card text-white border-primary mb-3">
    <div class="card-header d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <h4 class="mx-0 my-2">
          Discord Emoji Export
        </h4>
        <button type="button" class="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#tokenModal">
          How to get Token
        </button>
      </div>
      <div>
        <ClearButton user="{state.user}" on-click="{clearToken}" />
      </div>
    </div>
    <div class="card-body">
      <p>
        Website for exporting emojis and stickers from discord servers.
      </p>
      <ul>
        <li>Set discord token</li>
        <li>Select server from list</li>
        <li>Download emojis and stickers</li>
      </ul>
      <TokenInput on-click="{setToken}" />
      <GuildSelect guilds="{state.guilds}" on-select="{props.onSelect}" />
      <AlertToken />
    </div>
    <div class="card-footer text-muted">
      <div class="float-end">
        {{ state.guilds.length }} servers
      </div>
    </div>
  </div>
</template>

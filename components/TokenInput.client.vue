<script setup lang="ts">
const Toast = useToast();

const { token, userData, getMe, getGuilds } = useDiscord();
const input = useState<string>("input");

if (!userData.value.user) { loadToken(); }

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

async function initDiscord(input: string) {
  try {
    token.value = input;
    const user = await getMe();
    const guilds = await getGuilds();
    localStorage.setItem("token", input);
    userData.value = { user, guilds };
    return true;
  } catch (error) {
    Toast.handleError(error);
    return false;
  }
}

function onClick() {
  setToken(input.value);
}
</script>
<template>
  <div class="input-group mb-1">
    <span class="input-group-text font-monospace">Token&nbsp;</span>
    <input v-model="input" type="text" class="form-control" placeholder="MTMy2Dc5M5xNDclwMTguNDcy.RS26iZ.KFAwot03n1l7lrpb5ksFOR;hdldmWpyhryRgsWttF3gralg5VjB6eFhINHI...">
    <button class="btn btn-primary" type="button" :onClick="onClick">
      Set token
    </button>
  </div>
</template>

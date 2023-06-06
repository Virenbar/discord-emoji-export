<script setup lang="ts">
const Toast = useToast();
const { token, user, guilds } = useStore();
const { getMe, getGuilds } = useDiscord();

const input = useState<string>("input");

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) { return; }

  if (await initDiscord(token)) {
    Toast.showInfo("Token loaded from local storage");
  }
});

async function initDiscord(input: string) {
  try {
    token.value = input;
    user.value = await getMe();
    guilds.value = await getGuilds();
    localStorage.setItem("token", input);
    return true;
  } catch (error) {
    Toast.handleError(error);
    return false;
  }
}

async function setToken() {
  const token = input.value;
  const Match = /(\w+\.\w+\.\w+)/.exec(token);
  if (Match?.length) {
    if (await initDiscord(Match[0])) {
      Toast.showInfo("Token set and saved");
      input.value = "";
    }
  } else {
    Toast.showWarning("Invalid token format", "Invalid token");
  }
}
</script>
<template>
  <div class="input-group mb-1">
    <span class="input-group-text font-monospace">Token&nbsp;</span>
    <input v-model="input" type="text" class="form-control" placeholder="MTMyTDc5MyAeNTcwMHg1NCcy.GBrWKC.Lx8YyWrtNZoVqy...">
    <button class="btn btn-primary" type="button" :onClick="setToken">
      Set token
    </button>
  </div>
</template>
<style scoped>
.btn {
  width: 6rem;
}
</style>

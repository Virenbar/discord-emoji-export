<script setup lang="ts">
const Toast = useToast();
const { user, guilds, setToken, getToken } = useStore();
const { token, getMe, getGuilds } = useDiscord();

const tokenRegex = /(mfa\.[\w-]{20,})|([\w-]{20,}\.[\w-]{5,}\.[\w-]{20,})/;
const input = useState<string>('input');

onMounted(async () => {
  if (await trySetToken(getToken())) {
    Toast.showInfo('Token loaded from local storage');
  }
});

async function trySetToken(input: string) {
  if (!input) return false;
  try {
    token.value = input;
    user.value = await getMe();
    guilds.value = await getGuilds();
    // Safe token if no error
    setToken(input);
    return true;
  }
  catch (error) {
    // Reset back if error
    token.value = getToken();
    console.error(error);
    Toast.showError(error);
    return false;
  }
}

async function onClick() {
  const token = input.value;
  const Match = tokenRegex.exec(token);
  if (Match?.length) {
    if (await trySetToken(Match[0])) {
      Toast.showInfo('Token set and saved');
      input.value = '';
    }
  }
  else {
    Toast.showWarning('Invalid token format', 'Invalid token');
  }
}
</script>
<template>
  <div class="input-group mb-1">
    <span class="input-group-text font-monospace">Token</span>
    <input v-model="input" type="text" class="form-control" placeholder="MTMyTDc5MyAeNTcwMHg1NCcy.GBrWKC.Lx8YyWrtNZoVqy...">
    <button class="btn btn-primary" type="button" :onClick="onClick">
      Set token
    </button>
  </div>
</template>
<style scoped>
.btn,
span {
  width: 6rem;
  display: block;
}
</style>

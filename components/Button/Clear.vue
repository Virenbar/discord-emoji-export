<script setup lang="ts">
const { token, userData, userAvatar } = useDiscord();

const onClick = () => {
  localStorage.clear();
  token.value = "";
  userData.value = { guilds: [] };
};
</script>
<template>
  <div v-if="userData.user" class="btn-group float-end">
    <button class="btn btn-secondary">
      <img class="rounded-circle" height="28" :src="userAvatar(userData.user)">
      <span class="align-middle">{{ ` ${userData.user.username}#${userData.user.discriminator}` }}</span>
    </button>
    <button class="btn btn-primary" :onClick="onClick">
      Clear token
    </button>
  </div>
</template>

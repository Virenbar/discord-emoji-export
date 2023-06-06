<script setup lang="ts">
const { user, guilds, clear } = useStore();
</script>
<template>
  <div class="card text-white border-primary mb-3">
    <div class="card-header d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <h4 class="mx-0 my-2">
          Discord Emoji Export
        </h4>
        <button type="button" class="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#tokenModal">
          How to get Token
        </button>
      </div>
      <div v-if="user" class="btn-group">
        <button class="btn btn-secondary">
          <img class="rounded-circle" :src="$discord().userAvatar(user)">
          <span class="align-middle">{{ ` ${user.username}#${user.discriminator}` }}</span>
        </button>
        <button class="btn btn-primary" :onClick="clear">
          Clear token
        </button>
      </div>
    </div>
    <div class="card-body">
      Website for exporting emojis and stickers from discord servers.
      <ul>
        <li>Set discord token</li>
        <li>Select server from list</li>
        <li>Download emojis and stickers</li>
      </ul>
      <CardGuildInput />
      <CardGuildSelect />
      <AlertToken />
    </div>
    <div class="card-footer text-muted">
      <div class="float-end">
        {{ guilds.length }} servers
      </div>
    </div>
  </div>
</template>
<style scoped>
.rounded-circle img {
  height: 28;
}
</style>

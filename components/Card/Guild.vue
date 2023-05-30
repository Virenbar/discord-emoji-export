<script setup lang="ts">
const { userData } = useDiscord();

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
        <ButtonClear />
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
      <TokenInput />
      <GuildSelect />
      <AlertToken />
    </div>
    <div class="card-footer text-muted">
      <div class="float-end">
        {{ userData.guilds.length }} servers
      </div>
    </div>
  </div>
</template>

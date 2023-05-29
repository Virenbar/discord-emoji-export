<script setup lang="ts">
const { token } = useDiscord();

const y = "";

function onClick() {
  token.value = "";
}
</script>
<template>
  <div class="input-group mb-1">
    <span class="input-group-text font-monospace">Token&nbsp;</span>
    <input v-bind="y" type="text" class="form-control" placeholder="MTMy2Dc5M5xNDclwMTguNDcy.RS26iZ.KFAwot03n1l7lrpb5ksFOR;hdldmWpyhryRgsWttF3gralg5VjB6eFhINHI...">
    <button class="btn btn-primary" type="button" :onClick="onClick">
      Set token
    </button>
  </div>
</template>

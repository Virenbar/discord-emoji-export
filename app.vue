<script setup lang="ts">
const user = useCookie<{ name: string }>('user')
const logins = useCookie<number>('logins')
const width = window.innerWidth
console.log(width)
window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

  if (!accessToken) {
    return (document.getElementById('login').style.display = 'block');
  }

  fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then(result => result.json())
    .then(response => {
      const { username, discriminator } = response;
      document.getElementById('info').innerText += ` ${username}#${discriminator}`;
    })
    .catch(console.error);
};
</script>

<template>
  <div>
    <TestButton id="test">sdafsasf</TestButton>
    <div id="info">Hoi!</div>
    <a id="login" style="display: none;" href="https://discord.com/api/oauth2/authorize?client_id=1023904952634056754&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=token&scope=guilds%20identify">Identify Yourself</a>
    <NuxtWelcome />
  </div>
</template>



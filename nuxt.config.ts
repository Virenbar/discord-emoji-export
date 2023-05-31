export default defineNuxtConfig({
  css: [
    "@/assets/css/styles.scss"
  ],
  app: {
    baseURL: "/discord-emoji-export/"
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lottie-player"].includes(tag)
    }
  }
});

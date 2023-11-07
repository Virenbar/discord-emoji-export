export default defineNuxtConfig({
  css: [
    "@/assets/css/styles.scss"
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lottie-player"].includes(tag)
    }
  },
  runtimeConfig: {
    public: {
      repository: "https://github.com/Virenbar/discord-emoji-export",
      branch: process.env.HEAD || "master",
      hash: process.env.COMMIT_REF || "unknown",
      date: new Date().toISOString()
    }
  },
});

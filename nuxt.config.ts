export default defineNuxtConfig({
  css: [
    "@/assets/css/styles.scss"
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lottie-player"].includes(tag)
    }
  }
});

export default defineNuxtConfig({
  css: [
    "@/assets/css/styles.scss"
  ],
  app: {
    baseURL: "/HC-Osnova/",
    head: {
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Discord Emoji Export" }
      ],
      link: [{ href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css", rel: "stylesheet" }],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" },
        { src: "https://kit.fontawesome.com/3d652cc361.js", crossorigin: "anonymous" }
      ]
    }
  }
});

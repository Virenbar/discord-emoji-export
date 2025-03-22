export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
  ],
  css: [
    '@/assets/css/styles.scss',
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['lottie-player'].includes(tag),
    },
  },
  runtimeConfig: {
    public: {
      repository: 'https://github.com/Virenbar/discord-emoji-export',
      branch: process.env.HEAD || 'master',
      hash: process.env.COMMIT_REF || 'unknown',
      date: new Date().toISOString(),
    },
  },
  compatibilityDate: '2025-03-22',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
});

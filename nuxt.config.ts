import { execSync } from 'child_process';

const exec = (command: string) => execSync(command).toString().trim();
const repository = 'https://github.com/Virenbar/discord-emoji-export';
const branch = exec('git branch --show-current') || process.env.HEAD;
const hash = exec('git rev-parse HEAD') || process.env.COMMIT_REF;
const date = new Date().toISOString();

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['lottie-player'].includes(tag),
    },
  },
  runtimeConfig: {
    public: { repository, branch, hash, date },
  },
  compatibilityDate: '2025-03-22',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'if-function'],
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

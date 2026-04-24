import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      base: '/',
      resolve: {
        dedupe: ['react', 'react-dom'],
      },
      server: {
        fs: {
          allow: ['.'],
        },
      },
    })
  },
}
export default config

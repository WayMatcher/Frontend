import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      // Configure aliases
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '~bootstrap': path.resolve(__dirname, '../node_modules/bootstrap'),
        },
      },
    });
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  }
};

export default config;
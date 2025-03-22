import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },

    addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],

    framework: {
        name: '@storybook/react-vite',
        options: {
            builder: {
                viteConfigPath: 'C:\\Users\\Niklas\\Programming\\Frontend\\vite.config.ts',
            },
        },
    },

    async viteFinal(config, { configType }) {
        const { mergeConfig } = await import('vite');

        if (configType === 'DEVELOPMENT') {
            // Your development configuration goes here
        }
        if (configType === 'PRODUCTION') {
            // Your production configuration goes here.
        }

        return mergeConfig(config, {
            // Add dependencies to pre-optimization
            optimizeDeps: {
                include: ['storybook-dark-mode'],
            },
        });
    },

    docs: {
        autodocs: true,
    },
};
export default config;

import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        user: {
            username: 'johndoe',
            password: 'password123',
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;

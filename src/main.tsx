import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import AuthProvider from 'react-auth-kit';

import createStore from 'react-auth-kit/createStore';

// Create a store for managing authentication state
/**
 * Initializes the authentication store with configuration options.
 * @returns {object} The authentication store.
 */
const store = createStore({
    authName: '_auth', // Name of the authentication cookie
    authType: 'cookie', // Type of authentication storage
    cookieDomain: window.location.hostname, // Domain for the cookie
    cookieSecure: window.location.protocol === 'https:', // Use secure cookies if the protocol is HTTPS
});

// Render the React application
/**
 * Renders the root React component into the DOM.
 */
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* Provide authentication context to the application */}
        <AuthProvider store={store}>
            <App />
        </AuthProvider>
    </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import AuthProvider from 'react-auth-kit';

import createStore from 'react-auth-kit/createStore';

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider store={store}>
            <App />
        </AuthProvider>
    </StrictMode>,
);

import './App.scss';
import { memo, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/user/LoginPage';
import RegisterPage from '@/pages/user/RegisterPage';
import EventsPage from '@/pages/events/EventsPage';
import NewEvent from '@/pages/events/NewEvent';
import ErrorBoundary from '@/components/ErrorBoundary';
import Profile from '@/components/user/Profile';
import EditPage from '@/pages/user/EditPage';
import PasswordForget from '@/pages/password/PasswordForget';
import PasswordChange from '@/pages/password/PasswordChange';
import AcceptInvite from '@/pages/invites/Accept';
import AcceptRequest from '@/pages/invites/Request';
import InboxPage from '@/pages/inbox/InboxPage';
import ErrorModalContext, { ErrorModalProvider } from '@/contexts/ErrorModalContext';
import { Container, Modal } from 'react-bootstrap';
import NotFoundPage from './pages/NotFoundPage';
import { UserProfilePopupProvider } from '@/contexts/UserProfilePopupContext';
import UserProfilePopup from '@/components/UserProfilePopup';
import Privacy from './components/Privacy';
import TermsConditions from './components/TermsConditions';
import API from './api/api';

const Pages = memo(() => {
    const { showAlert } = useContext(ErrorModalContext);
    const getAPIStatus = async () => {
        const api = new API();
        try {
            const response = await api.axios.get('/User/GetStatus');
            console.info('API Status:', response);
        } catch (error) {
            if (error instanceof Error) showAlert(error.message, 'danger');
            throw new Error('Failed to fetch API status');
        }
    };
    getAPIStatus();
    return (
        <BrowserRouter>
            <div className='App-Container' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <header className='App-Header'>
                    <NavBar />
                </header>
                <ErrorModalProvider>
                    <main className='App-Main' style={{ flex: '1 0 auto' }}>
                        <Routes>
                            <Route path='*' element={<NotFoundPage />} />
                            <Route path='/' element={<LandingPage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/password/forget' element={<PasswordForget />} />
                            <Route path='/password/change' element={<PasswordChange />} />
                            <Route path='/invites/accept' element={<AcceptInvite />} />
                            <Route path='/request/accept' element={<AcceptRequest />} />
                            <Route path='/register/*' element={<RegisterPage />} />
                            <Route path='/events' element={<EventsPage />} />
                            <Route path='/events/new' element={<NewEvent />} />
                            <Route path='/events/:eventid' element={<EventsPage />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/profile/:username' element={<Profile />} />
                            <Route path='/profile/:username/edit/*' element={<EditPage />} />
                            <Route path='/inbox' element={<InboxPage />} />
                            <Route path='/privacy' element={<Privacy />} />
                            <Route path='/terms' element={<TermsConditions />} />
                        </Routes>
                    </main>
                </ErrorModalProvider>
                <footer className='App-Footer' style={{ flexShrink: 0 }}>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
});

export default function AppWrapper() {
    const useErrorBoundary = import.meta.env.MODE === 'production';
    if (import.meta.env.MODE === 'development') console.warn('Error boundary is disabled in development mode');

    const AppContent = useErrorBoundary ? (
        <ErrorBoundary
            fallback={
                <Container className='text-center error-boundary'>
                    <Modal.Dialog>
                        <h1>Critical Error</h1>
                        <Modal.Body>
                            <p>Something went wrong. Please try again later.</p>
                        </Modal.Body>
                    </Modal.Dialog>
                </Container>
            }
        >
            <Pages />
        </ErrorBoundary>
    ) : (
        <Pages />
    );

    return (
        <UserProfilePopupProvider>
            {AppContent}
            <UserProfilePopup />
        </UserProfilePopupProvider>
    );
}

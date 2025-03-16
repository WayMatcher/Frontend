import './styles/App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserContext, { UserProvider } from './contexts/UserContext'; // Import

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/user/LoginPage';
import MFAPage from './pages/user/MFAPage';
import RegisterPage from './pages/user/RegisterPage';
import UserPage from './pages/user/UserPage';
import EventsPage from './pages/EventsPage';
import { useContext } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from './types/dto/User';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

export default function AppWrapper() {

  const { user } = useContext(UserContext);

  const authUser = useAuthUser<User>();

  return (
    <div>
      <UserProvider>
        <Router>
          <header className="App-Header">
            <NavBar />
          </header>
          <main className="App-Main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/user/login" element={<LoginPage />} />
              <Route element={<AuthOutlet fallbackPath='/user/login' />}>
                <Route path="/user/edit" element={<UserPage />} />
                <Route path="/user/mfa" element={authUser?.mfaPending ? <MFAPage /> : <Navigate to="/" />} />
              </Route>
              <Route path="/user/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventid" element={<EventsPage />} />
            </Routes>
          </main>
          <footer className="App-Footer">
            <Footer />
          </footer>
        </Router>
      </UserProvider>
    </div >
  );
}
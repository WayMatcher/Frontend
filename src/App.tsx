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

export default function AppWrapper() {

  const { user } = useContext(UserContext);

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
              <Route path="/user/login" element={(!user) ? <LoginPage /> : <Navigate to="/" />} />
              <Route path="/user/mfa" element={(user && !user.jwt) ? <Navigate to="/" /> : <MFAPage />} />
              <Route path="/user/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
              <Route path="/user/edit" element={(user && user.jwt) ? <UserPage /> : <Navigate to="/user/login" />} />
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
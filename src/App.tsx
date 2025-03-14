import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // Import

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/user/LoginPage';
import MFAPage from './pages/user/MFAPage';
import RegisterPage from './pages/user/RegisterPage';
import UserPage from './pages/user/UserPage';
import EventsPage from './pages/EventsPage';

export default function AppWrapper() {

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
              <Route path="/user/mfa" element={<MFAPage />} />
              <Route path="/user/register" element={<RegisterPage />} />
              <Route path="/user/edit" element={<UserPage />} />
              <Route path="/events" element={<EventsPage />} />
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
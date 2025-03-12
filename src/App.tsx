import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // Import

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MFAPage from './pages/MFAPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
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
              <Route path="/" element={<MainPage />} />
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
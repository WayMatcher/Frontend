import './styles/App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import UserPage from './pages/user/UserPage';
import EventsPage from './pages/EventsPage';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

export default function AppWrapper() {

  return (
    <>
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
    </ >
  );
}
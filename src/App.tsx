import './styles/App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "bootstrap-icons/font/bootstrap-icons.css";

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import EventsPage from './pages/EventsPage';
import ErrorBoundary from './components/ErrorBoundary';
import Profile, { ProfileEdit } from './components/user/Profile';

export default function AppWrapper() {

  return (
    <>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>

        <header className="App-Header">
          <NavBar />
        </header>
        <main className="App-Main">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventid" element={<EventsPage />} />
              <Route path="/profile/:username" element={<Profile />}>
                <Route path='/profile/:username/edit' element={<ProfileEdit />} />
              </Route>
            </Routes>
          </Router>
        </main>
        <footer className="App-Footer">
          <Footer />
        </footer>
      </ErrorBoundary >
    </ >
  );
}
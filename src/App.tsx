import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import EventPage from './pages/EventPage';

import { UserProvider } from './context/UserProvider';

function App() {
  return (
    <>
      <header className="App-Header">
        <NavBar />
      </header>
      <main className="App-Main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/event" element={<EventPage />} />
        </Routes>
      </main>
      <footer className="App-Footer">
        <Footer />
      </footer>
    </>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  );
}
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext'; // Import

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import EventsPage from './pages/EventsPage';

export default function AppWrapper() {
  return (
    <UserProvider>
      <Router>
        <header className="App-Header">
          <NavBar />
        </header>
        <main className="App-Main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user/login" element={<LoginPage />} />
            <Route path="/user/register" element={<RegisterPage />} />
            <ProtectedRoute>
              <Route path="/user/edit" element={<UserPage />} />
              <Route path="/events" element={<EventsPage />} />
            </ProtectedRoute>
          </Routes>
        </main>
        <footer className="App-Footer">
          <Footer />
        </footer>
      </Router>
    </UserProvider>
  );
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  // Redirect to login if not authenticated
  return user ? <>{children}</> : <Navigate to="/user/login" />;
};
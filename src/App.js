import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Pets from './pages/Pets';
import AdoptForm from './pages/AdoptForm';
import ReleaseForm from './pages/ReleaseForm';
import Register from './pages/Register';
import Login from './pages/Login';
import PetDetail from './pages/PetDetail';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pet/:id" element={<PetDetail user={user} />} />
            <Route path="/adopt/:id" element={<AdoptForm user={user} />} />
            <Route path="/release" element={<ReleaseForm />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
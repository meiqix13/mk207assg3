import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate login - in production, this would call an API
      onLogin({
        email: formData.email,
        name: formData.email.split('@')[0] // Use email prefix as name
      });

      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <div className="container">
          <div className="login-hero-content">
            <div className="hero-badge">🐾 Welcome Back 🐾</div>
            <h1>Login to Pet Heaven</h1>
            <p>Sign in to continue your journey of finding the perfect companion</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
              <h2 className="form-title">Sign In</h2>

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                placeholder="your.email@example.com"
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                placeholder="Enter your password"
              />

              <div className="form-footer">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/register" className="forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-block">
                Sign In
              </button>

              <div className="form-divider">
                <span>Don't have an account?</span>
              </div>

              <Link to="/register" className="btn btn-secondary btn-large btn-block">
                Create Account
              </Link>
            </form>

            <div className="login-benefits">
              <h3>Why Join Pet Heaven?</h3>
              <ul className="benefits-list">
                <li>
                  <span className="benefit-icon">🏆</span>
                  <div>
                    <strong>Priority Access</strong>
                    <p>Get early notifications about new pets</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">💝</span>
                  <div>
                    <strong>Save Favorites</strong>
                    <p>Create a list of pets you're interested in</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">📧</span>
                  <div>
                    <strong>Stay Updated</strong>
                    <p>Receive newsletters with success stories</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">🎁</span>
                  <div>
                    <strong>Exclusive Perks</strong>
                    <p>Member discounts and special event access</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

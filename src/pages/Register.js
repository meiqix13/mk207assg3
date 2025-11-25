import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import './Register.css';

const Register = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    interests: {
      adoption: false,
      volunteering: false,
      donations: false,
      fostering: false,
      events: false
    },
    preferredContact: '',
    hearAboutUs: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('interests.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          [key]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Registration submitted:', formData);

      // Simulate login
      onLogin({
        name: formData.name,
        email: formData.email
      });

      setSubmitted(true);

      setTimeout(() => {
        navigate('/');
      }, 2500);
    } else {
      const firstError = document.querySelector('.form-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (submitted) {
    return (
      <div className="container section">
        <div className="success-message">
          <div className="success-animation">
            <div className="success-emoji">🎉</div>
            <div className="success-emoji delay-1">💝</div>
            <div className="success-emoji delay-2">🌟</div>
          </div>
          <h2>Welcome to Pet Heaven Family!</h2>
          <p>Thank you for becoming a member, <strong>{formData.name}</strong>!</p>
          <p>You're now part of our amazing community of animal lovers. Check your email for your membership confirmation and exclusive updates!</p>
          <div className="welcome-perks">
            <h3>Your Member Benefits:</h3>
            <ul>
              <li>🎯 Priority adoption notifications</li>
              <li>📧 Monthly newsletters with success stories</li>
              <li>🎟️ Exclusive access to special events</li>
              <li>💰 Member discounts on merchandise</li>
              <li>🤝 Volunteer opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <section className="register-hero">
        <div className="container">
          <div className="register-hero-content">
            <div className="hero-badge">✨ Join Our Community ✨</div>
            <h1>Become a Pet Heaven Member</h1>
            <p>
              Join our family of animal lovers and help us make a difference! As a member, you'll receive 
              updates on our pets, exclusive event invitations, and opportunities to support our mission.
            </p>
            <div className="hero-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🏆</span>
                <span>Priority Access</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💌</span>
                <span>Exclusive Updates</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎁</span>
                <span>Special Perks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">👤</span>
                Personal Information
              </h3>
              <div className="form-grid">
                <div className="form-group span-2">
                  <FormInput
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    placeholder="Lim Ah Beng"
                  />
                </div>
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="bengbeng001@example.com"
                />
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  placeholder="+65 8888 1234"
                />
                <div className="form-group span-2">
                  <FormInput
                    label="Address (Optional)"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                  />
                </div>
                <FormInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Singapore"
                />
                <FormInput
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="120000"
                />
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">❤️</span>
                Your Interests
              </h3>
              <p className="section-description">
                Let us know how you'd like to support Pet Heaven! (Select all that apply)
              </p>
              <div className="interests-grid">
                <label className="interest-card">
                  <input
                    type="checkbox"
                    name="interests.adoption"
                    checked={formData.interests.adoption}
                    onChange={handleChange}
                  />
                  <div className="interest-content">
                    <span className="interest-emoji">🏡</span>
                    <span className="interest-label">Pet Adoption</span>
                    <span className="interest-desc">Find your furry companion</span>
                  </div>
                  <div className="interest-check">✓</div>
                </label>

                <label className="interest-card">
                  <input
                    type="checkbox"
                    name="interests.volunteering"
                    checked={formData.interests.volunteering}
                    onChange={handleChange}
                  />
                  <div className="interest-content">
                    <span className="interest-emoji">🤝</span>
                    <span className="interest-label">Volunteering</span>
                    <span className="interest-desc">Help at our facility</span>
                  </div>
                  <div className="interest-check">✓</div>
                </label>

                <label className="interest-card">
                  <input
                    type="checkbox"
                    name="interests.donations"
                    checked={formData.interests.donations}
                    onChange={handleChange}
                  />
                  <div className="interest-content">
                    <span className="interest-emoji">💝</span>
                    <span className="interest-label">Donations</span>
                    <span className="interest-desc">Support our mission</span>
                  </div>
                  <div className="interest-check">✓</div>
                </label>

                <label className="interest-card">
                  <input
                    type="checkbox"
                    name="interests.fostering"
                    checked={formData.interests.fostering}
                    onChange={handleChange}
                  />
                  <div className="interest-content">
                    <span className="interest-emoji">🏠</span>
                    <span className="interest-label">Fostering</span>
                    <span className="interest-desc">Temporary pet care</span>
                  </div>
                  <div className="interest-check">✓</div>
                </label>

                <label className="interest-card">
                  <input
                    type="checkbox"
                    name="interests.events"
                    checked={formData.interests.events}
                    onChange={handleChange}
                  />
                  <div className="interest-content">
                    <span className="interest-emoji">🎉</span>
                    <span className="interest-label">Events</span>
                    <span className="interest-desc">Join community activities</span>
                  </div>
                  <div className="interest-check">✓</div>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">📬</span>
                Communication Preferences
              </h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Preferred Contact Method</label>
                  <select
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="email">📧 Email</option>
                    <option value="phone">📞 Phone</option>
                    <option value="both">📧📞 Both</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">How did you hear about us?</label>
                  <select
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="search">Online Search</option>
                    <option value="event">Community Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell us why you want to join Pet Heaven or any questions you have..."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-large btn-submit">
                🎉 Join Pet Heaven Community
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary btn-large"
              >
                ← Back to Home
              </button>
            </div>
          </form>

          <div className="register-benefits">
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

export default Register;
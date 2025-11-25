import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import FormInput from '../components/FormInput';
import './ReleaseForm.css';

const ReleaseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    petName: '',
    petType: '',
    breed: '',
    age: '',
    gender: '',
    spayedNeutered: '',
    vaccinated: '',
    medicalConditions: '',
    temperament: '',
    goodWith: {
      children: false,
      dogs: false,
      cats: false
    },
    reason: '',
    idealHome: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('goodWith.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        goodWith: {
          ...prev.goodWith,
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

    if (!formData.ownerName.trim()) newErrors.ownerName = 'Your name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!formData.petType) newErrors.petType = 'Please select pet type';
    if (!formData.breed.trim()) newErrors.breed = 'Breed is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.reason.trim()) newErrors.reason = 'Please tell us why you need to release your pet';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Release form submitted:', formData);

      // EmailJS configuration
      const serviceID = 'service_l04imig';
      const templateID = 'template_0050pdq';
      const publicKey = '7jET4ietKSSIhTiN6';

      // Prepare email parameters
      const emailParams = {
        to_email: 'meiqi3studyacc@gmail.com',
        owner_name: formData.ownerName,
        owner_email: formData.email,
        owner_phone: formData.phone,
        owner_address: formData.address,
        pet_name: formData.petName,
        pet_type: formData.petType,
        pet_breed: formData.breed,
        pet_age: formData.age,
        pet_gender: formData.gender,
        pet_size: formData.size || 'Not specified',
        vaccinated: formData.vaccinated,
        neutered: formData.spayedNeutered,
        medical_conditions: formData.medicalConditions || 'None',
        good_with_kids: formData.goodWith.children ? 'Yes' : 'No',
        good_with_pets: (formData.goodWith.dogs || formData.goodWith.cats)
          ? `Dogs: ${formData.goodWith.dogs ? 'Yes' : 'No'}, Cats: ${formData.goodWith.cats ? 'Yes' : 'No'}`
          : 'No',
        energy_level: formData.energyLevel || 'Not specified',
        temperament: formData.temperament || 'Not specified',
        reason: formData.reason,
        additional_notes: `${formData.idealHome ? 'Ideal Home: ' + formData.idealHome : ''}${formData.additionalInfo ? '\n\nAdditional Info: ' + formData.additionalInfo : ''}`
      };


      // Send email via EmailJS
      emailjs.send(serviceID, templateID, emailParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          setSubmitted(true);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          alert('Form submitted, but email notification failed. Please contact us directly at meiqi3studyacc@gmail.com');
          setSubmitted(true);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        });
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
            <div className="success-emoji">💙</div>
            <div className="success-emoji delay-1">🏡</div>
            <div className="success-emoji delay-2">🐾</div>
          </div>
          <h2>Thank You for Your Compassion</h2>
          <p>We understand this is a difficult decision, and we appreciate you choosing Pet Heaven to care for <strong>{formData.petName}</strong>.</p>
          <p>Our team will contact you within 24 hours to arrange a meeting and discuss the next steps. We'll make sure {formData.petName} finds a loving forever home.</p>
          <div className="thank-you-message">
            <p>💝 You're making a responsible choice for your pet's future.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="release-form-page">
      <section className="release-hero">
        <div className="container">
          <div className="release-hero-content">
            <div className="hero-icon-group">
              <span className="hero-icon">🏡</span>
              <span className="hero-icon delay-1">💙</span>
              <span className="hero-icon delay-2">🐾</span>
            </div>
            <h1>Help Us Find a New Home</h1>
            <p>
              We understand that circumstances change, and sometimes the best decision for your pet is to find them a new home. 
              At Pet Heaven, we're here to help with compassion and care. Fill out the form below, and we'll work together 
              to ensure your beloved companion finds their perfect forever family.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="release-form">
            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">👤</span>
                Your Information
              </h3>
              <div className="form-grid">
                <FormInput
                  label="Your Name"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  error={errors.ownerName}
                  required
                  placeholder="Lim Ah Beng"
                />
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
                <div className="form-group">
                  <FormInput
                    label="Address (Optional)"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, City"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">🐾</span>
                Pet Information
              </h3>
              <div className="form-grid">
                <FormInput
                  label="Pet's Name"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  error={errors.petName}
                  required
                  placeholder="Fluffy"
                />
                <div className="form-group">
                  <label className="form-label">
                    Pet Type <span className="text-primary">*</span>
                  </label>
                  <select
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="dog">🐕 Dog</option>
                    <option value="cat">🐈 Cat</option>
                  </select>
                  {errors.petType && <div className="form-error">{errors.petType}</div>}
                </div>
                <FormInput
                  label="Breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  error={errors.breed}
                  required
                  placeholder="e.g., Golden Retriever"
                />
                <FormInput
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  error={errors.age}
                  required
                  placeholder="e.g., 3 years"
                />
                <div className="form-group">
                  <label className="form-label">
                    Gender <span className="text-primary">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && <div className="form-error">{errors.gender}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Spayed/Neutered?</label>
                  <select
                    name="spayedNeutered"
                    value={formData.spayedNeutered}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Up to date on vaccinations?</label>
                  <select
                    name="vaccinated"
                    value={formData.vaccinated}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="partial">Partially</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Medical conditions or special needs</label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Please describe any medical conditions, allergies, or special care needs..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">❤️</span>
                Personality & Behavior
              </h3>
              <div className="form-group">
                <label className="form-label">Describe your pet's temperament</label>
                <textarea
                  name="temperament"
                  value={formData.temperament}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Is your pet friendly, shy, energetic, calm? Tell us about their personality..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your pet is good with:</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="goodWith.children"
                      checked={formData.goodWith.children}
                      onChange={handleChange}
                    />
                    <span>👶 Children</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="goodWith.dogs"
                      checked={formData.goodWith.dogs}
                      onChange={handleChange}
                    />
                    <span>🐕 Dogs</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="goodWith.cats"
                      checked={formData.goodWith.cats}
                      onChange={handleChange}
                    />
                    <span>🐈 Cats</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Why do you need to release your pet? <span className="text-primary">*</span>
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="We understand this is difficult. Please share your situation..."
                  rows="5"
                  required
                />
                {errors.reason && <div className="form-error">{errors.reason}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">What would be an ideal home for your pet?</label>
                <textarea
                  name="idealHome"
                  value={formData.idealHome}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="e.g., Active family with a yard, quiet home with no other pets..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Anything else we should know about your pet..."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Submit Release Request
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
        </div>
      </section>
    </div>
  );
};

export default ReleaseForm;
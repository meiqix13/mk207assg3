import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { petsData } from '../data/petsData';
import FormInput from '../components/FormInput';
import './AdoptForm.css';

const AdoptForm = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = petsData.find(p => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    housingType: '',
    hasYard: '',
    hasOtherPets: '',
    otherPetsDetails: '',
    hasChildren: '',
    childrenAges: '',
    experience: '',
    hoursAlone: '',
    reason: '',
    veterinarian: '',
    references: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.housingType) newErrors.housingType = 'Please select housing type';
    if (!formData.hasYard) newErrors.hasYard = 'Please select an option';
    if (!formData.hasOtherPets) newErrors.hasOtherPets = 'Please select an option';
    if (!formData.hasChildren) newErrors.hasChildren = 'Please select an option';
    if (!formData.hoursAlone) newErrors.hoursAlone = 'Please provide this information';
    if (!formData.reason.trim()) newErrors.reason = 'Please tell us why you want to adopt';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Adoption application submitted:', {
        petId: pet.id,
        petName: pet.name,
        ...formData
      });

      // EmailJS configuration
      const serviceID = 'service_l04imig';
      const templateID = 'template_lkzwsg9';
      const publicKey = '7jET4ietKSSIhTiN6';

      // Prepare email parameters
      const emailParams = {
        to_email: 'meiqi3studyacc@gmail.com',
        pet_name: pet.name,
        pet_breed: pet.breed,
        pet_age: pet.age,
        pet_gender: pet.gender,
        applicant_name: formData.fullName,
        applicant_email: formData.email,
        applicant_phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip_code: formData.zipCode || 'Not provided',
        housing_type: formData.housingType,
        has_yard: formData.hasYard,
        has_other_pets: formData.hasOtherPets,
        other_pets_details: formData.otherPetsDetails || 'N/A',
        has_children: formData.hasChildren,
        children_ages: formData.childrenAges || 'N/A',
        experience: formData.experience || 'Not provided',
        hours_alone: formData.hoursAlone,
        reason: formData.reason,
        veterinarian: formData.veterinarian || 'Not provided',
        references: formData.references || 'Not provided'
      };

      // Send email via EmailJS
      emailjs.send(serviceID, templateID, emailParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          setSubmitted(true);
          setTimeout(() => {
            navigate('/pets');
          }, 3000);
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          alert('Form submitted, but email notification failed. Please contact us directly at meiqi3studyacc@gmail.com');
          setSubmitted(true);
          setTimeout(() => {
            navigate('/pets');
          }, 3000);
        });
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.form-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (!pet) {
    return (
      <div className="container section">
        <div className="not-found">
          <div className="not-found-emoji">😿</div>
          <h2>Pet Not Found</h2>
          <p>We couldn't find this pet. They may have already been adopted!</p>
          <button onClick={() => navigate('/pets')} className="btn btn-primary">
            Browse Available Pets
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container section">
        <div className="success-message">
          <div className="success-animation">
            <div className="success-emoji">🎉</div>
            <div className="success-emoji delay-1">💝</div>
            <div className="success-emoji delay-2">🐾</div>
          </div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for your interest in adopting <strong>{pet.name}</strong>!</p>
          <p>We've received your application and will review it carefully. Our team will contact you within 2-3 business days to schedule a meeting.</p>
          <div className="success-pet-preview">
            <img src={pet.image} alt={pet.name} className="success-pet-image" />
            <p className="success-pet-name">{pet.name}</p>
            <p>Get ready to meet your new best friend! 🎈</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adopt-form-page">
      {/* Hero Section with Pet Info */}
      <section className="adopt-hero">
        <div className="container">
          <div className="adopt-hero-content">
            <div className="adopt-pet-preview">
              <div className="adopt-pet-image-container">
                <img src={pet.image} alt={pet.name} className="adopt-pet-image" />
              </div>
              <div className="adopt-pet-info">
                <h1>Adopt {pet.name}! 💕</h1>
                <p className="adopt-pet-breed">{pet.breed} • {pet.age} years • {pet.gender}</p>
                <div className="pet-quick-info">
                  <span className="info-badge">⚡ {pet.energy} Energy</span>
                  <span className="info-badge">📏 {pet.size}</span>
                  {pet.goodWithKids && <span className="info-badge">👶 Kid Friendly</span>}
                  {pet.goodWithPets && <span className="info-badge">🐾 Pet Friendly</span>}
                  {pet.vaccinated && <span className="info-badge">✓ Vaccinated</span>}
                  {pet.neutered && <span className="info-badge">✓ Neutered</span>}
                </div>
              </div>
            </div>
            <div className="adopt-hero-text">
              <div className="emoji-line">🏡 ❤️ 🐾</div>
              <h2>You're About to Make a Life-Changing Decision!</h2>
              <p>Fill out the form below to start your adoption journey with {pet.name}. We'll review your application and get back to you soon!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="adoption-form">
            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">👤</span>
                Personal Information
              </h3>
              <div className="form-grid">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
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
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">🏠</span>
                Home Information
              </h3>
              <div className="form-grid">
                <div className="form-group span-2">
                  <FormInput
                    label="Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                    placeholder="123 Main Street"
                  />
                </div>
                <FormInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
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

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Housing Type <span className="text-primary">*</span>
                  </label>
                  <select
                    name="housingType"
                    value={formData.housingType}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                  {errors.housingType && <div className="form-error">{errors.housingType}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Do you have a yard? <span className="text-primary">*</span>
                  </label>
                  <select
                    name="hasYard"
                    value={formData.hasYard}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes-fenced">Yes, fenced</option>
                    <option value="yes-unfenced">Yes, unfenced</option>
                    <option value="no">No</option>
                  </select>
                  {errors.hasYard && <div className="form-error">{errors.hasYard}</div>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">👨‍👩‍👧‍👦</span>
                Household Information
              </h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Do you have other pets? <span className="text-primary">*</span>
                  </label>
                  <select
                    name="hasOtherPets"
                    value={formData.hasOtherPets}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.hasOtherPets && <div className="form-error">{errors.hasOtherPets}</div>}
                </div>

                {formData.hasOtherPets === 'yes' && (
                  <div className="form-group">
                    <label className="form-label">Please provide details</label>
                    <input
                      type="text"
                      name="otherPetsDetails"
                      value={formData.otherPetsDetails}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 1 dog, 2 cats"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Do you have children? <span className="text-primary">*</span>
                  </label>
                  <select
                    name="hasChildren"
                    value={formData.hasChildren}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.hasChildren && <div className="form-error">{errors.hasChildren}</div>}
                </div>

                {formData.hasChildren === 'yes' && (
                  <div className="form-group">
                    <label className="form-label">Children's ages</label>
                    <input
                      type="text"
                      name="childrenAges"
                      value={formData.childrenAges}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 5, 8, 12"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <span className="section-emoji">📋</span>
                Pet Care Experience
              </h3>
              <div className="form-group">
                <label className="form-label">Previous pet ownership experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell us about your experience with pets..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  How many hours will {pet.name} be alone daily? <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="hoursAlone"
                  value={formData.hoursAlone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 4-6 hours"
                  required
                />
                {errors.hoursAlone && <div className="form-error">{errors.hoursAlone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Why do you want to adopt {pet.name}? <span className="text-primary">*</span>
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Share your story with us..."
                  rows="5"
                  required
                />
                {errors.reason && <div className="form-error">{errors.reason}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Veterinarian contact (if applicable)</label>
                <input
                  type="text"
                  name="veterinarian"
                  value={formData.veterinarian}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Clinic name and phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Personal references</label>
                <textarea
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Name and contact information of 2 references..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                💝 Submit Adoption Application
              </button>
              <button 
                type="button" 
                onClick={() => navigate(`/pet/${pet.id}`)} 
                className="btn btn-secondary btn-large"
              >
                ← Back to {pet.name}'s Profile
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdoptForm;
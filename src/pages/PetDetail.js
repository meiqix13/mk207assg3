import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { petsData } from '../data/petsData';
import './PetDetail.css';

const PetDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = petsData.find(p => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className="container section">
        <div className="not-found">
          <div className="not-found-emoji">🐾</div>
          <h2>Oops! Pet Not Found</h2>
          <p>This adorable friend seems to have wandered off!</p>
          <Link to="/pets" className="btn btn-primary">
            Browse Other Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-detail">
      {/* Hero Section with Pet Image */}
      <section className="pet-detail-hero">
        <div className="container-wide">
          <div className="pet-detail-grid">
            <div className="pet-detail-image-section">
              <div className="pet-detail-image-container">
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="pet-detail-image"
                />
                <div className="pet-badges-large">
                  <span className={`badge-large badge-${pet.type === 'dog' ? 'primary' : 'accent'}`}>
                    {pet.type === 'dog' ? '🐕' : '🐈'} {pet.type}
                  </span>
                  {pet.isNew && (
                    <span className="badge-large badge-success">✨ New Arrival!</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pet-detail-info">
              <div className="pet-name-section">
                <h1 className="pet-name-large">
                  Meet {pet.name}! 
                  <span className="wave-emoji">👋</span>
                </h1>
                <p className="pet-breed-large">{pet.breed}</p>
              </div>

              <div className="pet-quick-info">
                <div className="quick-info-item">
                  <div className="quick-info-icon">🎂</div>
                  <div className="quick-info-content">
                    <span className="quick-info-label">Age</span>
                    <span className="quick-info-value">{pet.age}</span>
                  </div>
                </div>
                <div className="quick-info-item">
                  <div className="quick-info-icon">{pet.gender === 'Male' ? '♂️' : '♀️'}</div>
                  <div className="quick-info-content">
                    <span className="quick-info-label">Gender</span>
                    <span className="quick-info-value">{pet.gender}</span>
                  </div>
                </div>
                <div className="quick-info-item">
                  <div className="quick-info-icon">🏠</div>
                  <div className="quick-info-content">
                    <span className="quick-info-label">Looking for</span>
                    <span className="quick-info-value">Forever Home</span>
                  </div>
                </div>
              </div>

              <div className="pet-traits-large">
                {pet.traits && pet.traits.map((trait, index) => (
                  <span key={index} className="trait-tag-large">
                    ⭐ {trait}
                  </span>
                ))}
              </div>

              <Link 
                to={`/adopt/${pet.id}`} 
                className="btn btn-primary btn-large btn-adopt-cta"
              >
                💕 Adopt {pet.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="pet-about-section">
            <div className="about-card">
              <h2 className="about-title">
                <span className="title-emoji">📖</span>
                About {pet.name}
              </h2>
              <p className="about-description">{pet.fullDescription}</p>
            </div>

            <div className="info-cards-grid">
              <div className="info-card">
                <h3>
                  <span className="card-emoji">🏥</span>
                  Medical History
                </h3>
                <p>{pet.medicalHistory}</p>
              </div>

              <div className="info-card">
                <h3>
                  <span className="card-emoji">💝</span>
                  Ideal Home
                </h3>
                <p>{pet.idealHome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pet-cta-section">
        <div className="container">
          <div className="pet-cta-content">
            <div className="cta-heart-animation">💗</div>
            <h2>Ready to Give {pet.name} a Forever Home?</h2>
            <p>Start your adoption journey today! Fill out our simple application form and we'll be in touch soon.</p>
            <div className="cta-buttons-group">
              <Link to={`/adopt/${pet.id}`} className="btn btn-primary btn-large">
                💕 Adopt {pet.name}
              </Link>
              <Link to="/pets" className="btn btn-primary btn-large">
                🔍 Browse More Pets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetDetail;
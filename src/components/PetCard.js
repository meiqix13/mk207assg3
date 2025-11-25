import React from 'react';
import { Link } from 'react-router-dom';
import './PetCard.css';

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <div className="pet-card-image">
        <img src={pet.image} alt={pet.name} className="pet-image" />
        {pet.vaccinated && <span className="badge badge-success">✓ Vaccinated</span>}
      </div>

      <div className="pet-card-content">
        <h3 className="pet-name">{pet.name}</h3>
        <p className="pet-breed">{pet.breed}</p>

        <div className="pet-info">
          <div className="info-item">
            <span className="info-icon">🎂</span>
            <span>{pet.age} {pet.age === '1' ? 'year' : 'years'} old</span>
          </div>
          <div className="info-item">
            <span className="info-icon">{pet.gender === 'Male' ? '♂️' : '♀️'}</span>
            <span>{pet.gender}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">⚡</span>
            <span>{pet.energy} Energy</span>
          </div>
        </div>

        <p className="pet-description">
          {pet.description.length > 100
            ? `${pet.description.substring(0, 100)}...`
            : pet.description}
        </p>

        <div className="pet-tags">
          {pet.goodWithKids && <span className="tag">👶 Good with kids</span>}
          {pet.goodWithPets && <span className="tag">🐾 Good with pets</span>}
        </div>

        <Link to={`/pet/${pet.id}`} className="btn btn-primary btn-block">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default PetCard;

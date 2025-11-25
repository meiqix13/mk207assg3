import React, { useState, useMemo } from 'react';
import PetCard from '../components/PetCard';
import SearchFilter from '../components/SearchFilter';
import { petsData } from '../data/petsData';
import './Pets.css';

const Pets = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    age: 'all',
    gender: 'all'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Filter pets based on search criteria
  const filteredPets = useMemo(() => {
    return petsData.filter(pet => {
      // Search filter
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = !filters.search || 
        pet.name.toLowerCase().includes(searchLower) ||
        pet.breed.toLowerCase().includes(searchLower) ||
        pet.description.toLowerCase().includes(searchLower);

      // Type filter
      const matchesType = filters.type === 'all' || pet.type === filters.type;

      // Age filter
      let matchesAge = true;
      if (filters.age !== 'all') {
        const ageNum = parseInt(pet.age);
        switch (filters.age) {
          case 'puppy':
            matchesAge = ageNum <= 1;
            break;
          case 'young':
            matchesAge = ageNum > 1 && ageNum <= 3;
            break;
          case 'adult':
            matchesAge = ageNum > 3 && ageNum <= 7;
            break;
          case 'senior':
            matchesAge = ageNum > 7;
            break;
          default:
            matchesAge = true;
        }
      }

      // Gender filter
      const matchesGender = filters.gender === 'all' || 
        pet.gender.toLowerCase() === filters.gender.toLowerCase();

      return matchesSearch && matchesType && matchesAge && matchesGender;
    });
  }, [filters]);

  return (
    <div className="pets-page">
      <section className="pets-hero">
        <div className="container">
          <h1 className="fade-in-up">Find Your Perfect Companion</h1>
          <p className="pets-hero-text fade-in-up stagger-1">
            Browse our wonderful selection of cats and dogs waiting for their forever homes. 
            Each furry friend has a unique personality and lots of love to give! 🐾💕
          </p>
        </div>
      </section>

      <section className="pets-content section">
        <div className="container">
          <SearchFilter filters={filters} onFilterChange={handleFilterChange} />

          {filteredPets.length > 0 ? (
            <>
              <div className="pets-count">
                <span className="count-badge">
                  🎉 {filteredPets.length} adorable {filteredPets.length === 1 ? 'pet' : 'pets'} found!
                </span>
              </div>
              <div className="pets-grid">
                {filteredPets.map((pet, index) => (
                  <div key={pet.id} className={`fade-in-up stagger-${Math.min(index + 1, 4)}`}>
                    <PetCard pet={pet} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">😿</div>
              <h3>No pets found matching your criteria</h3>
              <p>Try adjusting your filters to see more adorable companions!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setFilters({ search: '', type: 'all', age: 'all', gender: 'all' })}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="fun-facts-section">
        <div className="container">
          <h2 className="text-center mb-4">Did You Know? 🤔</h2>
          <div className="fun-facts-grid">
            <div className="fun-fact-card">
              <div className="fun-fact-emoji">🐕</div>
              <p>Dogs can understand up to 250 words and gestures!</p>
            </div>
            <div className="fun-fact-card">
              <div className="fun-fact-emoji">🐈</div>
              <p>Cats spend 70% of their lives sleeping - that's 13-16 hours a day!</p>
            </div>
            <div className="fun-fact-card">
              <div className="fun-fact-emoji">❤️</div>
              <p>Pets can reduce stress, anxiety, and improve your overall health!</p>
            </div>
            <div className="fun-fact-card">
              <div className="fun-fact-emoji">🎾</div>
              <p>Adopting a pet saves two lives - the one you adopt and the one that takes its place!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pets;
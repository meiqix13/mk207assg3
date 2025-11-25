import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Every Pet Deserves a Forever Home",
      subtitle: "Welcome to Pet Heaven, where abandoned pets find hope, care, and loving families.",
      image: "/hero-slides/hero_1.jpg",
      slogan: "Give a paw, change a life"
    },
    {
      title: "Find Your Perfect Companion",
      subtitle: "Browse through our loving pets waiting for their forever homes.",
      image: "/hero-slides/hero_2.jpg",
      slogan: "Love has four paws"
    },
    {
      title: "Make a Difference Today",
      subtitle: "By adopting, you save a life and make room for another animal in need.",
      image: "/hero-slides/hero_3.jpeg",
      slogan: "Adopt, don't shop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  const features = [
    {
      icon: '🏡',
      title: 'Find Your Perfect Match',
      description: 'Browse through our loving pets waiting for their forever homes. Each one has a unique personality and story.'
    },
    {
      icon: '❤️',
      title: 'Compassionate Care',
      description: 'All our pets receive veterinary care, proper nutrition, and lots of love while they wait for adoption.'
    },
    {
      icon: '🤝',
      title: 'Ongoing Support',
      description: 'We provide guidance throughout the adoption process and continue to support you after you take your pet home.'
    },
    {
      icon: '🌟',
      title: 'Make a Difference',
      description: 'By adopting, you save a life and make room for another animal in need. Join our community of pet lovers.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Pets Adopted' },
    { number: '95%', label: 'Success Rate' },
    { number: '10+', label: 'Years of Service' },
    { number: '1000+', label: 'Happy Families' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="home">
      {/* Hero Section with Slider */}
      <section className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{'--bg-image': `url(${slide.image})`}}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content container">
                <div className="hero-text">
                  <div className="hero-slogan">{slide.slogan}</div>
                  <h1 className="hero-title">
                    {slide.title.split(' ').map((word, i) =>
                      word === 'Home' || word === 'Companion' || word === 'Today' ? (
                        <span key={i} className="text-primary">{word} </span>
                      ) : (
                        word + ' '
                      )
                    )}
                  </h1>
                  <p className="hero-description">{slide.subtitle}</p>
                  <div className="hero-buttons">
                    <Link to="/pets" className="btn btn-primary btn-large">
                      Find Your Companion
                    </Link>
                    <Link to="/about" className="btn btn-secondary btn-large">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>
          <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>

          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card fade-in-up stagger-${index + 1}`}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Why Choose Us</p>
            <h2>Making Adoption Easy & Joyful</h2>
            <p className="section-description">
              We're committed to creating perfect matches between pets and families, 
              ensuring happy endings for all.
            </p>
          </div>

          <div className="grid grid-2">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card fade-in-up stagger-${index + 1}`}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section location-section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Find Us</p>
            <h2>Our Shelter Locations</h2>
            <p className="section-description">
              Visit any of our shelters across Singapore to meet our lovely pets in person.
            </p>
          </div>
          <div className="shelter-map">
            <iframe
              title="Pet Heaven Shelter Locations"
              src="https://www.google.com/maps/d/embed?mid=1wPqtvq0QcFEfbffugkEm5Qut5xYg14s&ehbc=2E312F"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '24px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Change a Life?</h2>
            <p className="cta-description">
              Start your adoption journey today or help us by releasing a pet you can no longer care for.
            </p>
            <div className="cta-buttons">
              <Link to="/pets" className="btn btn-primary btn-large">
                Adopt a Pet
              </Link>
              <Link to="/release" className="btn btn-accent btn-large">
                Release a Pet
              </Link>
              <Link to="/register" className="btn btn-primary btn-large">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import { facilitiesData } from '../data/petsData';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="fade-in-up">Our Mission: Creating Forever Bonds</h1>
            <p className="about-hero-text fade-in-up stagger-1">
              At Pet Heaven, we believe every abandoned pet deserves a second chance at love and happiness. 
              Since our founding, we've dedicated ourselves to rescuing, rehabilitating, and rehoming pets 
              while providing compassionate support to both animals and families.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <p className="section-subtitle">Our Story</p>
              <h2>A Decade of Love & Care</h2>
              <p>
                Pet Heaven was founded in 2014 by a group of passionate animal lovers who saw the growing 
                need for a compassionate, no-kill shelter in our community. What started as a small operation 
                in a converted barn has grown into a comprehensive animal welfare organization serving hundreds 
                of pets each year.
              </p>
              <p>
                Our approach is simple: treat every animal with dignity, provide excellent medical care, 
                and work tirelessly to find the perfect forever home for each pet. We take the time to 
                understand both our animals and potential adopters to ensure lasting, successful matches.
              </p>
              <p>
                Through the years, we've expanded our services to include training programs, behavioral 
                counseling, and post-adoption support. We're proud to maintain a 95% adoption success rate 
                and have helped over 500 pets find their forever families.
              </p>
            </div>
            <div className="story-image">
              <div className="picture-stack">
                <div className="stack-image stack-1">
                  <img src={`${process.env.PUBLIC_URL}/stack/stack1.jpg`} alt="stack1" />
                </div>
                <div className="stack-image stack-2">
                  <img src={`${process.env.PUBLIC_URL}/stack/stack2.jpeg`} alt="stack2" />
                </div>
                <div className="stack-image stack-3">
                  <img src={`${process.env.PUBLIC_URL}/stack/stack3.jpg`} alt="stack3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Our Values</p>
            <h2>What We Stand For</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Compassion</h3>
              <p>Every animal receives individualized care, attention, and love while in our facility.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Excellence</h3>
              <p>We maintain the highest standards in veterinary care, nutrition, and facility management.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>Transparent operations and honest communication guide all our interactions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Commitment</h3>
              <p>We never give up on finding the right home for every pet in our care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section facilities-section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Our Facilities</p>
            <h2>A Home Away From Home</h2>
            <p className="section-description">
              Our modern facility is designed with animal welfare as the top priority, 
              providing comfortable, safe, and enriching spaces for all our residents.
            </p>
          </div>

          <div className="grid grid-3">
            {facilitiesData.map((facility, index) => (
              <div key={index} className="facility-card">
                <div className="facility-image">
                  <img src={`${process.env.PUBLIC_URL}${facility.image.replace(process.env.PUBLIC_URL, '')}`} alt={`stack${index + 1}`} />
                  <div className="facility-overlay">
                    <div className="facility-icon">{facility.icon}</div>
                  </div>
                </div>
                <div className="facility-content">
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">How It Works</p>
            <h2>Our Adoption Process</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Browse & Connect</h3>
              <p>Explore our available pets online and find one that catches your heart</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Submit Application</h3>
              <p>Fill out our adoption form and tell us about your home and lifestyle</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Meet & Greet</h3>
              <p>Visit our facility to meet your potential new family member in person</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Take Home</h3>
              <p>Complete the adoption and welcome your new companion to their forever home</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join our community of animal lovers and help us continue our mission.</p>
            <div className="about-cta-buttons">
              <Link to="/pets" className="btn btn-primary btn-large">
                Find Your Pet
              </Link>
              <Link to="/register" className="btn btn-secondary btn-large">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
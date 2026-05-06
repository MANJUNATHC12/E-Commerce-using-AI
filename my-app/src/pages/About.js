import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <div className="about-hero">
                <h1>Redefining Online <span className="highlight">Shopping</span></h1>
                <p>We are a premium e-commerce platform dedicated to providing the highest quality products with exceptional customer service. Experience the future of retail with us.</p>
            </div>
            
            <div className="about-grid">
                <div className="about-card">
                    <h3>Our Mission</h3>
                    <p>To deliver an unparalleled shopping experience by combining cutting-edge technology with curated, high-end products.</p>
                </div>
                <div className="about-card">
                    <h3>Quality First</h3>
                    <p>Every product in our catalog undergoes rigorous quality checks to ensure it meets our premium standards.</p>
                </div>
                <div className="about-card">
                    <h3>Global Reach</h3>
                    <p>We bring the world's best products right to your doorstep, no matter where you are, with lightning-fast shipping.</p>
                </div>
            </div>
        </div>
    );
}

export default About;

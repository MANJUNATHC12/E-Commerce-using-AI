import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Men.css';

const Men = () => {
    const banners = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "Summer Collection '26",
            subtitle: "Up to 40% Off on Men's T-Shirts & Shorts",
            link: "/men/summer-wear",
            buttonText: "Shop Summer"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "Premium Sneakers",
            subtitle: "Step up your game with our new arrivals",
            link: "/men/shoes",
            buttonText: "Explore Shoes"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1594938298596-ec0f3f269a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "Exclusive Traditional Wear",
            subtitle: "Festive season special offers. Flat 20% off.",
            link: "/men/traditional",
            buttonText: "Shop Ethnic"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "Winter Essentials",
            subtitle: "Stay warm, look cool.",
            link: "/men/winter-wear",
            buttonText: "Shop Winter"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval);
    }, [banners.length]);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + banners.length) % banners.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="men-container">
            {/* Automatic Slider Banner */}
            <div className="slider-wrapper">
                <div 
                    className="slider-content" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {banners.map((banner) => (
                        <div className="slide" key={banner.id}>
                            <img src={banner.image} alt={banner.title} className="slide-image" />
                            <div className="slide-overlay">
                                <div className="slide-text">
                                    <h2>{banner.title}</h2>
                                    <p>{banner.subtitle}</p>
                                    <Link to={banner.link} className="slide-btn">{banner.buttonText}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button className="slider-arrow left-arrow" onClick={prevSlide}>
                    &#10094;
                </button>
                <button className="slider-arrow right-arrow" onClick={nextSlide}>
                    &#10095;
                </button>

                {/* Dots */}
                <div className="slider-dots">
                    {banners.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
            
            {/* Some placeholder content for the rest of the Men's page */}
            <div className="men-categories">
                <h3>Explore Men's Categories</h3>
                <div className="categories-grid">
                    <Link to="/men/shoes" className="category-card">Shoes & Slippers</Link>
                    <Link to="/men/summer-wear" className="category-card">Summer Wear</Link>
                    <Link to="/men/winter-wear" className="category-card">Winter Wear</Link>
                    <Link to="/men/sport-wear" className="category-card">Sport Wear</Link>
                    <Link to="/men/traditional" className="category-card">Traditional Wear</Link>
                </div>
            </div>
        </div>
    );
};

export default Men;

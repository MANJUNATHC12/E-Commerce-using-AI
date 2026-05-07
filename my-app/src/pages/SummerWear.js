import React, { useState } from 'react';
import './Shoes.css';
import LoginPopup from '../Components/LoginPopup';

const SummerWear = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleAddToCart = async (product) => {
        const user = localStorage.getItem("user");
        if (!user) {
            setShowLoginPopup(true);
            return;
        }
        try {
            const res = await fetch("http://localhost:5164/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    img: product.img
                })
            });
            if (res.ok) {
                window.dispatchEvent(new Event('cartUpdated'));
            }
        } catch (error) {
            console.error("Failed to add to cart", error);
        }
    };

    const products = [
        { name: "Linen Casual Shirt", brand: "H&M", price: "₹1,499", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85f4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Cotton Polo T-Shirt", brand: "Puma", price: "₹1,299", img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Printed Beach Shorts", brand: "Zara", price: "₹1,999", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Lightweight Chinos", brand: "Levis", price: "₹2,499", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Classic White Tee", brand: "Nike", price: "₹999", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Denim Shorts", brand: "Wrangler", price: "₹1,799", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Tropical Print Shirt", brand: "Jack & Jones", price: "₹1,899", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85f4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Breathable Tank Top", brand: "Adidas", price: "₹899", img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Linen Trousers", brand: "Marks & Spencer", price: "₹2,999", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "V-Neck T-Shirt", brand: "Tommy Hilfiger", price: "₹1,599", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Cargo Shorts", brand: "Columbia", price: "₹2,299", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Striped Polo", brand: "U.S. Polo Assn", price: "₹1,499", img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ];

    return (
        <div className="shoes-container">
            <h2 className="shoes-title">Men's Summer Wear</h2>
            <div className="shoes-grid">
                {products.map((product, index) => (
                    <div className="shoe-card" key={index}>
                        <div className="shoe-image-container">
                            <img src={product.img} alt={product.name} />
                        </div>
                        <div className="shoe-details">
                            <span className="shoe-brand">{product.brand}</span>
                            <h3 className="shoe-name">{product.name}</h3>
                            <div className="shoe-footer">
                                <span className="shoe-price">{product.price}</span>
                                <button className="add-btn" onClick={() => handleAddToCart(product)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
        </div>
    );
};

export default SummerWear;

import React from 'react';
import './Shoes.css';

const TraditionalWear = () => {
    const handleAddToCart = async (product) => {
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
        { name: "Silk Kurta Set", brand: "Manyavar", price: "₹4,999", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Embroidered Sherwani", brand: "FabIndia", price: "₹14,999", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Cotton Blend Kurta", brand: "Peter England", price: "₹1,999", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Festive Nehru Jacket", brand: "Manyavar", price: "₹3,499", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Designer Jodhpuri Suit", brand: "Raymond", price: "₹12,499", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Printed Short Kurta", brand: "Biba", price: "₹1,499", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Banarasi Silk Kurta", brand: "FabIndia", price: "₹5,999", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Classic Pathani Suit", brand: "Manyavar", price: "₹4,299", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Linen Kurta", brand: "Allen Solly", price: "₹2,499", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Velvet Nehru Jacket", brand: "Raymond", price: "₹4,999", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Wedding Sherwani", brand: "Manyavar", price: "₹24,999", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Solid Festive Kurta", brand: "FabIndia", price: "₹2,199", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ];

    return (
        <div className="shoes-container">
            <h2 className="shoes-title">Men's Indian Traditional Wear</h2>
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
        </div>
    );
};

export default TraditionalWear;

import React from 'react';
import './Shoes.css';

const SportWear = () => {
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
        { name: "Pro Training T-Shirt", brand: "Nike", price: "₹1,999", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Running Shorts", brand: "Adidas", price: "₹1,499", img: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Compression Tights", brand: "Under Armour", price: "₹2,999", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Track Pants", brand: "Puma", price: "₹2,499", img: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Gym Stringer", brand: "Gymshark", price: "₹1,299", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Sports Jacket", brand: "Reebok", price: "₹3,499", img: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Dri-FIT Polo", brand: "Nike", price: "₹2,299", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Workout Joggers", brand: "Asics", price: "₹2,799", img: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Athletic Tank Top", brand: "Adidas", price: "₹1,199", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Training Hoodie", brand: "Under Armour", price: "₹4,999", img: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Yoga Pants", brand: "Puma", price: "₹1,899", img: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Sweat-wicking Tee", brand: "Reebok", price: "₹1,599", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ];

    return (
        <div className="shoes-container">
            <h2 className="shoes-title">Men's Sport Wear</h2>
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

export default SportWear;

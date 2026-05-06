import React from 'react';
import './Shoes.css';

const WinterWear = () => {
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
        { name: "Puffer Jacket", brand: "North Face", price: "₹7,999", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Woolen Sweater", brand: "Marks & Spencer", price: "₹3,499", img: "https://images.unsplash.com/photo-1614833214532-680c102a27a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Fleece Hoodie", brand: "Nike", price: "₹4,299", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Leather Jacket", brand: "Superdry", price: "₹9,999", img: "https://images.unsplash.com/photo-1520975954732-57dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Thermal Innerwear", brand: "Jockey", price: "₹1,299", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Trench Coat", brand: "Zara", price: "₹8,999", img: "https://images.unsplash.com/photo-1520975954732-57dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Knitted Cardigan", brand: "H&M", price: "₹2,999", img: "https://images.unsplash.com/photo-1614833214532-680c102a27a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Windbreaker", brand: "Adidas", price: "₹3,999", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Denim Jacket", brand: "Levis", price: "₹4,599", img: "https://images.unsplash.com/photo-1520975954732-57dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Turtleneck Pullover", brand: "Mango", price: "₹2,499", img: "https://images.unsplash.com/photo-1614833214532-680c102a27a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Snow Parka", brand: "Columbia", price: "₹11,999", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Basic Sweatshirt", brand: "Puma", price: "₹2,299", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ];

    return (
        <div className="shoes-container">
            <h2 className="shoes-title">Men's Winter Wear</h2>
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

export default WinterWear;

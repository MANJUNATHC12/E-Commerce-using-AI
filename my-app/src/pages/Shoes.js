import React from 'react';
import './Shoes.css';

const Shoes = () => {
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

    const shoeBrands = [
        { name: "Nike Air Jordan 1", brand: "Nike", price: "₹12,999", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Puma RS-X", brand: "Puma", price: "₹7,999", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Nike Air Max", brand: "Nike", price: "₹10,499", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Adidas Ultraboost", brand: "Adidas", price: "₹14,999", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Nike Air Jordan Low", brand: "Nike", price: "₹9,999", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Puma Suede Classic", brand: "Puma", price: "₹5,499", img: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Nike Blazer Mid", brand: "Nike", price: "₹8,499", img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Adidas NMD R1", brand: "Adidas", price: "₹11,999", img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Nike Air Jordan High", brand: "Nike", price: "₹15,999", img: "https://images.unsplash.com/photo-1552346154-21d32810baa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Puma Future Rider", brand: "Puma", price: "₹6,999", img: "https://images.unsplash.com/photo-1606890658317-7d14490b76fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Nike Dunk Low", brand: "Nike", price: "₹8,999", img: "https://images.unsplash.com/photo-1620809651762-232f416ab0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { name: "Adidas Stan Smith", brand: "Adidas", price: "₹7,599", img: "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ];

    return (
        <div className="shoes-container">
            <h2 className="shoes-title">Men's Premium Footwear</h2>
            <div className="shoes-grid">
                {shoeBrands.map((shoe, index) => (
                    <div className="shoe-card" key={index}>
                        <div className="shoe-image-container">
                            <img src={shoe.img} alt={shoe.name} />
                        </div>
                        <div className="shoe-details">
                            <span className="shoe-brand">{shoe.brand}</span>
                            <h3 className="shoe-name">{shoe.name}</h3>
                            <div className="shoe-footer">
                                <span className="shoe-price">{shoe.price}</span>
                                <button className="add-btn" onClick={() => handleAddToCart(shoe)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shoes;

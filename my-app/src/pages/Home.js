import { useEffect, useState } from "react";
import "./Home.css";
import LoginPopup from "../Components/LoginPopup";

function Home() {
    const [user, setUser] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUser(data);
    }, []);

    const handleAddToCart = async (product) => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            setShowLoginPopup(true);
            return;
        }
        try {
            const res = await fetch("http://localhost:5164/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: product.name,
                    brand: product.category,
                    price: product.price,
                    img: product.image
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
        {
            id: 1,
            name: "Premium Denim Jacket",
            category: "Men's Clothing",
            price: "₹3,499",
            image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            name: "Sport Running Shoes",
            category: "Footwear",
            price: "₹4,999",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            name: "Boys Graphic T-Shirt",
            category: "Kids Clothing",
            price: "₹899",
            image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            name: "Classic Chronograph Watch",
            category: "Accessories",
            price: "₹8,999",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 5,
            name: "Leather Formal Shoes",
            category: "Men's Footwear",
            price: "₹2,599",
            image: "https://images.unsplash.com/photo-1614252235316-8d197af21430?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 6,
            name: "Kids Winter Hoodie",
            category: "Kids Clothing",
            price: "₹1,299",
            image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 7,
            name: "Women's Summer Dress",
            category: "Women's Clothing",
            price: "₹1,899",
            image: "https://images.unsplash.com/photo-1515347619362-7101abcbab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 8,
            name: "Canvas Casual Sneakers",
            category: "Footwear",
            price: "₹1,499",
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
        }
    ];

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <h2>
                    Welcome back, <span className="highlight">{user ? user.name : 'Guest'}</span>!
                </h2>
                <p>Discover our latest collection of premium products.</p>
            </header>

            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-name">{product.name}</h3>
                            <div className="product-footer">
                                <span className="product-price">{product.price}</span>
                                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
        </div>
    );
}

export default Home;
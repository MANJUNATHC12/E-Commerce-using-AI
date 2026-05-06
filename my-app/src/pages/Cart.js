import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await fetch("http://localhost:5164/api/cart");
            if (res.ok) {
                const data = await res.json();
                setCartItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch cart items", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Helper to extract numerical value from strings like "₹12,999"
    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        return parseFloat(priceString.replace('₹', '').replace(/,/g, ''));
    };

    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (parsePrice(item.price) * item.quantity);
    }, 0);

    const taxGst = subtotal * 0.05; // 5% GST
    const total = subtotal + taxGst;

    const formatCurrency = (amount) => {
        return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };

    const updateQuantity = async (id, action) => {
        try {
            const res = await fetch(`http://localhost:5164/api/cart/${id}/${action}`, {
                method: "PUT"
            });
            if (res.ok) {
                fetchCart();
                window.dispatchEvent(new Event('cartUpdated'));
            }
        } catch (error) {
            console.error(`Failed to ${action} quantity`, error);
        }
    };

    const removeItem = async (id) => {
        try {
            const res = await fetch(`http://localhost:5164/api/cart/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                fetchCart();
                window.dispatchEvent(new Event('cartUpdated'));
            }
        } catch (error) {
            console.error("Failed to remove item", error);
        }
    };

    if (loading) {
        return <div className="cart-container"><p>Loading cart...</p></div>;
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is currently empty. Go add some items!</p>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.img} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <span className="cart-item-brand">{item.brand}</span>
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <div className="cart-item-price">{item.price}</div>
                                </div>
                                <div className="cart-item-quantity">
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                                    <strong>{item.quantity}</strong>
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 'increase')}>+</button>
                                </div>
                                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3 className="summary-title">Order Summary</h3>
                        
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        
                        <div className="summary-row">
                            <span>GST (5%)</span>
                            <span>{formatCurrency(taxGst)}</span>
                        </div>
                        
                        <div className="summary-total">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>

                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

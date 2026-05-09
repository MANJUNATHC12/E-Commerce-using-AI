import React, { useEffect, useState } from 'react';
import './Cart.css';
import scannerImg from '../image/qrscanner.jpg';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { width, height } = useWindowSize();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkoutStep, setCheckoutStep] = useState(0);
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        houseNumber: '',
        flatNumber: '',
        pincode: '',
        city: '',
        state: '',
        paymentMethod: 'UPI Payment'
    });

    const handleProceedToCheckout = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            setShippingDetails(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phoneNumber || ''
            }));
        }
        setCheckoutStep(1);
    };

    const handlePaymentSuccess = async () => {
        // Save order for tracking before clearing
        const orderData = {
            orderDetails: cartItems,
            total: total,
            date: new Date().toLocaleString()
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderData));

        setCheckoutStep(3);
        // Clear cart in backend
        try {
            // Ideally we'd have a 'clear cart' endpoint, but for now we delete items one by one or assume it's cleared on order
            // cartItems.forEach(item => removeItem(item.id));
        } catch (error) {
            console.error("Failed to clear cart", error);
        }
    };

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
            <div className="cart-header-actions">
                <h1 className="cart-title">Your Shopping Cart</h1>
                <button
                    className="view-orders-btn"
                    onClick={() => navigate('/track-order')}
                >
                    Track Recent Order
                </button>
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is currently empty.</p>
                    <div className="empty-cart-actions">
                        <Link to="/home" className="shop-now-btn">Go Shopping</Link>
                        <button
                            className="track-recent-btn"
                            onClick={() => navigate('/track-order')}
                        >
                            Track Previous Order
                        </button>
                    </div>
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

                        <button className="checkout-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            )}

            {/* Checkout Flow */}
            {checkoutStep === 1 && (
                <div className="checkout-modal-overlay">
                    <div className="checkout-modal shipping-form-modal">
                        <button className="close-modal-btn" onClick={() => setCheckoutStep(0)}>×</button>
                        <h2>Shipping Details</h2>
                        <form className="shipping-form" onSubmit={(e) => { e.preventDefault(); setCheckoutStep(2); }}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={shippingDetails.name} onChange={e => setShippingDetails({ ...shippingDetails, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={shippingDetails.email} onChange={e => setShippingDetails({ ...shippingDetails, email: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" value={shippingDetails.phone} onChange={e => setShippingDetails({ ...shippingDetails, phone: e.target.value })} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" value={shippingDetails.address} onChange={e => setShippingDetails({ ...shippingDetails, address: e.target.value })} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>House Number</label>
                                    <input type="text" value={shippingDetails.houseNumber} onChange={e => setShippingDetails({ ...shippingDetails, houseNumber: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Flat Number</label>
                                    <input type="text" value={shippingDetails.flatNumber} onChange={e => setShippingDetails({ ...shippingDetails, flatNumber: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input type="text" value={shippingDetails.pincode} onChange={e => setShippingDetails({ ...shippingDetails, pincode: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" value={shippingDetails.city} onChange={e => setShippingDetails({ ...shippingDetails, city: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input type="text" value={shippingDetails.state} onChange={e => setShippingDetails({ ...shippingDetails, state: e.target.value })} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Payment Method</label>
                                <select value={shippingDetails.paymentMethod} onChange={e => setShippingDetails({ ...shippingDetails, paymentMethod: e.target.value })} required>
                                    <option value="UPI Payment">UPI Payment</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Mobile Banking">Mobile Banking</option>
                                    <option value="COD">Cash on Delivery (COD)</option>
                                </select>
                            </div>
                            <button type="submit" className="complete-payment-btn">Next: Payment</button>
                        </form>
                    </div>
                </div>
            )}

            {checkoutStep === 2 && (
                <div className="checkout-modal-overlay">
                    <div className="checkout-modal">
                        <button className="close-modal-btn" onClick={() => setCheckoutStep(0)}>×</button>
                        <h2>Invoice & Payment</h2>

                        <div className="bill-section">
                            <h3>Bill Summary</h3>
                            <div className="bill-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="bill-item">
                                        <span>{item.name} (x{item.quantity})</span>
                                        <span>{formatCurrency(parsePrice(item.price) * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <hr className="bill-divider" />
                            <div className="bill-row"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                            <div className="bill-row"><span>GST (5%)</span><span>{formatCurrency(taxGst)}</span></div>
                            <div className="bill-row total"><span>Total to Pay</span><span>{formatCurrency(total)}</span></div>
                        </div>

                        <div className="payment-section">
                            {shippingDetails.paymentMethod === 'UPI Payment' && (
                                <>
                                    <h3>Scan to Pay</h3>
                                    <div className="qr-container">
                                        <img
                                            src={scannerImg}
                                            alt="Payment Scanner"
                                            className="qr-code"
                                            style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <p className="payment-instruction">Use any UPI app to scan and pay</p>
                                </>
                            )}

                            {(shippingDetails.paymentMethod === 'Credit Card' || shippingDetails.paymentMethod === 'Debit Card') && (
                                <div className="card-payment-form">
                                    <h3>Enter {shippingDetails.paymentMethod} Details</h3>
                                    <div className="form-group">
                                        <label>Account Name</label>
                                        <input type="text" placeholder="Name on Card" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength="16" required />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Valid Thru</label>
                                            <input type="text" placeholder="MM/YY" maxLength="5" required />
                                        </div>
                                        <div className="form-group">
                                            <label>CVV</label>
                                            <input type="password" placeholder="XXX" maxLength="3" required />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {shippingDetails.paymentMethod === 'COD' && (
                                <>
                                    <h3>Cash on Delivery</h3>
                                    <p className="payment-instruction">Pay with cash when your order arrives.</p>
                                </>
                            )}

                            {shippingDetails.paymentMethod === 'Mobile Banking' && (
                                <>
                                    <h3>Mobile Banking</h3>
                                    <p className="payment-instruction">You will be redirected to your bank's secure portal.</p>
                                </>
                            )}

                            <button className="complete-payment-btn" onClick={handlePaymentSuccess} style={{ marginTop: '1.5rem' }}>
                                Simulate Payment Success
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {checkoutStep === 3 && (
                <div className="checkout-modal-overlay">
                    <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
                    <div className="checkout-modal success-modal">
                        <div className="success-icon">🎉</div>
                        <h2>Order Placed Successfully!</h2>
                        <p>Thank you for your purchase, {shippingDetails.name}!</p>

                        <div className="order-summary-box">
                            <h3>Order Summary</h3>
                            {cartItems.map(item => (
                                <div key={item.id} className="summary-item">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>{formatCurrency(parsePrice(item.price) * item.quantity)}</span>
                                </div>
                            ))}
                            <div className="summary-total-row">
                                <span>Total Paid</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <div className="success-actions">
                            <button
                                className="track-order-btn"
                                onClick={() => navigate('/track-order', { state: { orderDetails: cartItems, total: total } })}
                            >
                                Track Your Order
                            </button>
                            <button className="close-success-btn" onClick={() => {
                                setCartItems([]);
                                setCheckoutStep(0);
                                window.dispatchEvent(new Event('cartUpdated'));
                                navigate('/home');
                            }}>
                                Back to Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

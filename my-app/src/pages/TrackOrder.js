import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './TrackOrder.css';

const TrackOrder = () => {
    const location = useLocation();
    
    // Get order details from state or localStorage
    const savedOrder = JSON.parse(localStorage.getItem('lastOrder') || '{}');
    const { orderDetails, total, date } = location.state || savedOrder || { orderDetails: [], total: 0, date: 'May 09, 2026' };
    
    const [isCancelled, setIsCancelled] = React.useState(false);

    const steps = [
        { status: 'Ordered', date: date || 'May 09, 2026', completed: true, active: !isCancelled },
        { status: 'Shipped', date: 'Expected Soon', completed: false, active: false },
        { status: 'Out for Delivery', date: 'Expected Soon', completed: false, active: false },
        { status: 'Delivered', date: 'Expected Soon', completed: false, active: false },
    ];

    const handleCancelOrder = () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            setIsCancelled(true);
        }
    };

    return (
        <div className="track-order-container">
            <div className="track-header">
                <h1>{isCancelled ? 'Order Cancelled' : 'Track Your Order'}</h1>
                <p>Order ID: #ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
                {isCancelled && <div className="cancel-badge">Cancelled</div>}
            </div>

            <div className="tracking-visual">
                {isCancelled ? (
                    <div className="cancelled-visual">
                        <div className="cancelled-line"></div>
                        <div className="cancelled-step">
                            <div className="step-icon cancel">✕</div>
                            <div className="step-info">
                                <h3>Order Cancelled</h3>
                                <p>You cancelled this order on May 09, 2026</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    steps.map((step, index) => (
                        <div key={index} className={`tracking-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}>
                            <div className="step-icon">
                                {step.completed ? '✓' : index + 1}
                            </div>
                            <div className="step-info">
                                <h3>{step.status}</h3>
                                <p>{step.date}</p>
                            </div>
                            {index < steps.length - 1 && <div className="step-line"></div>}
                        </div>
                    ))
                )}
            </div>

            <div className="order-details-card">
                <h2>Order Summary</h2>
                {orderDetails && orderDetails.length > 0 ? (
                    <>
                        <div className="order-items-list">
                            {orderDetails.map((item, index) => (
                                <div key={index} className={`order-item-row ${isCancelled ? 'item-cancelled' : ''}`}>
                                    <img src={item.img} alt={item.name} className="order-item-thumb" />
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">
                                        {item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-total-row">
                            <span>{isCancelled ? 'Amount Refunded' : 'Total Paid'}</span>
                            <span className={`total-amount ${isCancelled ? 'refunded' : ''}`}>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                    </>
                ) : (
                    <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No recent orders found. Start shopping to place an order!</p>
                )}
            </div>

            <div className="track-actions">
                {!isCancelled && (
                    <button className="cancel-order-btn" onClick={handleCancelOrder}>
                        Cancel Order
                    </button>
                )}
                <Link to="/home" className="back-home-btn">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default TrackOrder;

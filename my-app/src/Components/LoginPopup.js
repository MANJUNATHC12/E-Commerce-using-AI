import React from 'react';
import './LoginPopup.css';

const LoginPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="login-popup-overlay">
            <div className="login-popup">
                <button className="login-popup-close" onClick={onClose}>&times;</button>
                <div className="login-popup-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <h3>Authentication Required</h3>
                <p>Please login first to add items to your cart.</p>
                <div className="login-popup-actions">
                    <button className="login-btn-primary" onClick={() => window.location.href = '/login'}>
                        Go to Login
                    </button>
                    <button className="login-btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;

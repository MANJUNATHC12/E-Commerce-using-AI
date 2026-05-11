import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-glow"></div>

            <div className="footer-container">
                {/* Brand & About */}
                <div className="footer-section footer-brand-section">
                    <h2 className="footer-brand">my-app</h2>
                    <p className="footer-tagline">
                        Your one-stop destination for premium fashion. Discover curated
                        collections for Men, Women &amp; Kids — crafted for every occasion.
                    </p>
                    <div className="footer-socials">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/men">Men's Collection</Link></li>
                        <li><Link to="/women">Women's Collection</Link></li>
                        <li><Link to="/kids">Kids' Collection</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="footer-section">
                    <h3 className="footer-heading">Customer Service</h3>
                    <ul className="footer-links">
                        <li><Link to="/track-order">Track Order</Link></li>
                        <li><Link to="/cart">My Cart</Link></li>
                        <li><Link to="/Login">My Account</Link></li>
                        <li><a href="#shipping">Shipping Policy</a></li>
                        <li><a href="#returns">Returns &amp; Exchange</a></li>
                        <li><a href="#faq">FAQs</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer-section footer-newsletter-section">
                    <h3 className="footer-heading">Stay in the Loop</h3>
                    <p className="newsletter-text">
                        Subscribe to get exclusive offers, early access to new arrivals, and style tips.
                    </p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="newsletter-input"
                            aria-label="Email for newsletter"
                        />
                        <button type="submit" className="newsletter-btn">
                            Subscribe
                        </button>
                    </form>
                    <div className="footer-contact-info">
                        <div className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span>support@myapp.com</span>
                        </div>
                        <div className="contact-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path>
                            </svg>
                            <span>+91 98765 43210</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-inner">
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} <strong>my-app</strong>. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <a href="#privacy">Privacy Policy</a>
                        <span className="divider">|</span>
                        <a href="#terms">Terms of Service</a>
                        <span className="divider">|</span>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

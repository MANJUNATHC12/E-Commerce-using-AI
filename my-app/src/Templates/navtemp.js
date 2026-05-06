import "./navtemp.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navtemp() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = async () => {
        try {
            const res = await fetch("http://localhost:5164/api/cart");
            if (res.ok) {
                const data = await res.json();
                const total = data.reduce((acc, item) => acc + item.quantity, 0);
                setCartCount(total);
            }
        } catch (error) {
            console.error("Failed to fetch cart", error);
        }
    };

    useEffect(() => {
        fetchCart();
        window.addEventListener('cartUpdated', fetchCart);
        return () => window.removeEventListener('cartUpdated', fetchCart);
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }, [theme]);

    return (
        <nav>
            <div className="nav-brand">
                <h1>my-app</h1>
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
            </div>

            <div className="nav-search">
                <input type="text" placeholder="Search products..." className="search-input" />
                <button className="search-button">Search</button>
            </div>

            <ul className={menuOpen ? "nav-links mobile-active" : "nav-links"}>
                <li className="dropdown mega-dropdown">
                    <Link to="/men" style={{ textDecoration: 'none', color: 'inherit' }}>Men</Link>
                    <div className="mega-menu">
                        <div className="mega-column">
                            <h4 className="mega-title">Categories</h4>
                            <ul>
                                <li><Link to="/men/shoes">Shoes</Link></li>
                                <li><Link to="/men/summer-wear">Summer Wear</Link></li>
                                <li><Link to="/men/winter-wear">Winter Wear</Link></li>
                                <li><Link to="/men/sport-wear">Sport Wear</Link></li>
                                <li><Link to="/men/traditional">Indian Traditional Wear</Link></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li><Link to="/women" style={{ textDecoration: 'none', color: 'inherit' }}>Women</Link></li>
                <li><Link to="/kids" style={{ textDecoration: 'none', color: 'inherit' }}>Kids</Link></li>
                <li><Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
                <li><Link to="/beauty" style={{ textDecoration: 'none', color: 'inherit' }}>Beauty</Link></li>
                <li className="dropdown" onClick={() => { setProfileOpen(!profileOpen); setThemeOpen(false); }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span style={{ fontSize: '0.8rem' }}>▾</span>
                    </div>
                    {profileOpen && (
                        <ul className="dropdown-menu">
                            <li><Link to="/Login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link></li>
                            <li><Link to="/Register" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link></li>
                        </ul>
                    )}
                </li>
                <li className="dropdown">
                    <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ position: 'relative' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </li>
                <li className="dropdown" onClick={() => { setThemeOpen(!themeOpen); setProfileOpen(false); }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <span style={{ fontSize: '0.8rem' }}>▾</span>
                    </div>
                    {themeOpen && (
                        <ul className="dropdown-menu">
                            <li><span className="dropdown-item" onClick={() => { setTheme('light'); setThemeOpen(false); }}>Light</span></li>
                            <li><span className="dropdown-item" onClick={() => { setTheme('dark'); setThemeOpen(false); }}>Dark</span></li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navtemp;
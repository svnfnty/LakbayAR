import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/explore', label: 'Explore' },
        { to: '/leaderboard', label: 'Leaderboard' },
    ];

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 20px',
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(148,163,184,0.1)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'var(--gradient-hero)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                    }}
                >
                    🗺️
                </div>
                <span
                    style={{
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        letterSpacing: '-0.5px',
                    }}
                    className="gradient-text"
                >
                    LakbayAR
                </span>
            </Link>

            {/* Desktop Nav */}
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                }}
                className="desktop-nav"
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        style={{
                            padding: '8px 18px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color:
                                location.pathname === link.to
                                    ? 'var(--color-primary-light)'
                                    : 'var(--color-text-muted)',
                            background:
                                location.pathname === link.to
                                    ? 'rgba(14, 165, 233, 0.1)'
                                    : 'transparent',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link to="/explore" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem', marginLeft: '8px' }}>
                    📍 Start Exploring
                </Link>
            </div>

            {/* Mobile toggle */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: 'none',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text)',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                }}
                className="mobile-toggle"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '72px',
                        left: 0,
                        right: 0,
                        background: 'rgba(15, 23, 42, 0.98)',
                        backdropFilter: 'blur(20px)',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        borderBottom: '1px solid var(--glass-border)',
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 500,
                                color: location.pathname === link.to ? 'var(--color-primary-light)' : 'var(--color-text)',
                                background: location.pathname === link.to ? 'rgba(14,165,233,0.1)' : 'transparent',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;

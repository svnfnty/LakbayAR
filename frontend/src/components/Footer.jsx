const Footer = () => {
    return (
        <footer
            style={{
                borderTop: '1px solid var(--glass-border)',
                padding: '48px 20px 32px',
                background: 'rgba(15, 23, 42, 0.5)',
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '40px',
                        marginBottom: '40px',
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1.5rem' }}>🗺️</span>
                            <span className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                                LakbayAR
                            </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                            Discover the beauty and history of Gingoog City through augmented reality.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-primary-light)' }}>
                            Quick Links
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {['Explore Spots', 'Leaderboard', 'AR Experience'].map((link) => (
                                <span key={link} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                                    {link}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-primary-light)' }}>
                            Gingoog City
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                            Misamis Oriental, Philippines<br />
                            8.8200° N, 125.1000° E
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        borderTop: '1px solid var(--glass-border)',
                        paddingTop: '20px',
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)',
                    }}
                >
                    © 2026 LakbayAR — Explore Gingoog City. Built with 💙
                </div>
            </div>
        </footer>
    );
};

export default Footer;

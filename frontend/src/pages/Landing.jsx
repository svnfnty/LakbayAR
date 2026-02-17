import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSpots } from '../services/api';
import SpotCard from '../components/SpotCard';
import Footer from '../components/Footer';

const Landing = () => {
    const [featuredSpots, setFeaturedSpots] = useState([]);

    useEffect(() => {
        getSpots()
            .then((spots) => setFeaturedSpots(spots.slice(0, 3)))
            .catch(console.error);
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '100px 20px 60px',
                }}
            >
                {/* Animated Background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(14,165,233,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(20,184,166,0.1) 0%, transparent 50%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
                        animation: 'float 6s ease-in-out infinite',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '10%',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
                        animation: 'float 8s ease-in-out infinite reverse',
                    }}
                />

                <div style={{ position: 'relative', textAlign: 'center', maxWidth: '800px' }}>
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            background: 'rgba(14, 165, 233, 0.1)',
                            border: '1px solid rgba(14, 165, 233, 0.2)',
                            fontSize: '0.85rem',
                            color: 'var(--color-primary-light)',
                            marginBottom: '24px',
                        }}
                    >
                        🌴 Explore Gingoog City, Misamis Oriental
                    </div>

                    <h1
                        className="animate-fade-in-up"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: '-2px',
                            marginBottom: '20px',
                            animationDelay: '0.1s',
                        }}
                    >
                        Discover{' '}
                        <span className="gradient-text">Gingoog City</span>
                        <br />Through AR
                    </h1>

                    <p
                        className="animate-fade-in-up"
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                            color: 'var(--color-text-muted)',
                            maxWidth: '600px',
                            margin: '0 auto 36px',
                            lineHeight: 1.7,
                            animationDelay: '0.2s',
                        }}
                    >
                        Experience the beauty, culture, and history of Gingoog City like never before.
                        Point your camera at landmarks and unlock immersive AR stories.
                    </p>

                    <div
                        className="animate-fade-in-up"
                        style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.3s' }}
                    >
                        <Link to="/explore" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: '1rem' }}>
                            🗺️ Start Exploring
                        </Link>
                        <a href="#how-it-works" className="btn btn-outline" style={{ padding: '14px 36px', fontSize: '1rem' }}>
                            Learn More
                        </a>
                    </div>

                    {/* Stats */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: 'flex',
                            gap: '40px',
                            justifyContent: 'center',
                            marginTop: '60px',
                            animationDelay: '0.5s',
                        }}
                    >
                        {[
                            { value: '6+', label: 'Tourist Spots' },
                            { value: 'AR', label: 'Experiences' },
                            { value: '🏆', label: 'Points & Rewards' },
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section
                id="how-it-works"
                style={{
                    padding: '80px 20px',
                    background: 'rgba(30, 41, 59, 0.3)',
                }}
            >
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                            How <span className="gradient-text">LakbayAR</span> Works
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto' }}>
                            Three simple steps to explore Gingoog City's best destinations
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '24px',
                        }}
                    >
                        {[
                            {
                                icon: '📍',
                                title: 'Find Nearby Spots',
                                desc: 'Use your location to discover tourist spots near you in Gingoog City.',
                                step: '01',
                            },
                            {
                                icon: '📱',
                                title: 'Scan with AR',
                                desc: 'Point your camera at landmarks to unlock immersive historical stories.',
                                step: '02',
                            },
                            {
                                icon: '🏆',
                                title: 'Earn Points',
                                desc: 'Mark spots as visited, earn points, and climb the leaderboard.',
                                step: '03',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="card glass"
                                style={{
                                    padding: '32px',
                                    textAlign: 'center',
                                    animation: `fadeInUp 0.5s ease-out ${i * 0.15}s both`,
                                }}
                            >
                                <div
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: 'var(--gradient-hero)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        marginBottom: '16px',
                                    }}
                                >
                                    {item.step}
                                </div>
                                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Spots */}
            <section style={{ padding: '80px 20px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                            Featured <span className="gradient-text">Destinations</span>
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto' }}>
                            Popular spots to explore in Gingoog City
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '24px',
                        }}
                    >
                        {featuredSpots.map((spot, idx) => (
                            <SpotCard key={spot.id} spot={spot} index={idx} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link to="/explore" className="btn btn-outline" style={{ padding: '14px 36px' }}>
                            View All Spots →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Install PWA CTA */}
            <section
                style={{
                    padding: '60px 20px',
                    background: 'rgba(30, 41, 59, 0.3)',
                }}
            >
                <div
                    className="container glass"
                    style={{
                        borderRadius: 'var(--radius-lg)',
                        padding: '48px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(20,184,166,0.05))',
                        border: '1px solid rgba(14,165,233,0.2)',
                    }}
                >
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>
                        📱 Install LakbayAR
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                        Add LakbayAR to your home screen for instant access to Gingoog City's landmarks — even offline!
                    </p>
                    <button className="btn btn-accent" style={{ padding: '14px 36px' }}>
                        Install App
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;

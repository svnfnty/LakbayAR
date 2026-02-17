import { useState, useEffect } from 'react';
import { getNearbySpots, getSpots } from '../services/api';
import { getCurrentPosition } from '../utils/geolocation';
import SpotCard from '../components/SpotCard';
import Footer from '../components/Footer';

const Explore = () => {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [userPos, setUserPos] = useState(null);
    const [locError, setLocError] = useState(null);

    useEffect(() => {
        loadSpots();
    }, []);

    const loadSpots = async () => {
        setLoading(true);
        try {
            const pos = await getCurrentPosition();
            setUserPos(pos);
            const data = await getNearbySpots(pos.lat, pos.lng);
            setSpots(data);
        } catch {
            setLocError('Location unavailable. Showing all spots.');
            const data = await getSpots();
            setSpots(data);
        }
        setLoading(false);
    };

    const filteredSpots = (() => {
        switch (filter) {
            case 'nearby':
                return spots.filter((s) => s.distance !== undefined && s.distance < 50);
            case 'popular':
                return [...spots].sort((a, b) => (b.visits_count || 0) - (a.visits_count || 0));
            default:
                return spots;
        }
    })();

    return (
        <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
            {/* Header */}
            <section
                style={{
                    padding: '40px 20px 32px',
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 60%)',
                }}
            >
                <div className="container">
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
                        Explore <span className="gradient-text">Gingoog City</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                        Discover historical landmarks, natural wonders, and cultural sites
                    </p>

                    {locError && (
                        <div
                            style={{
                                padding: '10px 16px',
                                borderRadius: 'var(--radius-sm)',
                                background: 'rgba(245, 158, 11, 0.1)',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                color: '#fbbf24',
                                fontSize: '0.85rem',
                                marginBottom: '16px',
                            }}
                        >
                            ⚠️ {locError}
                        </div>
                    )}

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                            { key: 'all', label: '🌏 All Spots' },
                            { key: 'nearby', label: '📍 Nearby' },
                            { key: 'popular', label: '🔥 Popular' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    background: filter === tab.key ? 'var(--gradient-hero)' : 'rgba(30, 41, 59, 0.8)',
                                    color: filter === tab.key ? 'white' : 'var(--color-text-muted)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section style={{ padding: '32px 20px 60px' }}>
                <div className="container">
                    {loading ? (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '24px',
                            }}
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="card">
                                    <div className="skeleton" style={{ width: '100%', aspectRatio: '16/10' }} />
                                    <div style={{ padding: '16px 20px' }}>
                                        <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '8px' }} />
                                        <div className="skeleton" style={{ height: '14px', width: '90%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredSpots.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                            <p>No spots found for this filter. Try a different category.</p>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '24px',
                            }}
                        >
                            {filteredSpots.map((spot, idx) => (
                                <SpotCard key={spot.id} spot={spot} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Explore;

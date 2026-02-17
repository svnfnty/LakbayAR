import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSpot, recordVisit } from '../services/api';
import { getCurrentPosition, calculateDistance, formatDistance, openNavigation } from '../utils/geolocation';
import Toast from '../components/Toast';
import Footer from '../components/Footer';

const categoryIcons = {
    'Beach/Nature': '🏖️',
    'Mountain/Adventure': '⛰️',
    'Historical/Cultural': '🏛️',
    'Nature/Adventure': '🌿',
    'Nature/Waterfall': '💧',
    'Historical/Religious': '⛪',
};

const Detail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [spot, setSpot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState(null);
    const [toast, setToast] = useState(null);
    const [visiting, setVisiting] = useState(false);

    useEffect(() => {
        loadSpot();
    }, [slug]);

    const loadSpot = async () => {
        setLoading(true);
        try {
            const data = await getSpot(slug);
            setSpot(data);
            try {
                const pos = await getCurrentPosition();
                const dist = calculateDistance(pos.lat, pos.lng, data.latitude, data.longitude);
                setDistance(dist);
            } catch { /* ignore geolocation error */ }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleVisit = async () => {
        if (!spot || visiting) return;
        setVisiting(true);
        try {
            const res = await recordVisit(spot.id);
            setToast({ message: `+${res.data.points_earned} Points Earned! 🎉`, type: 'success' });
        } catch (err) {
            setToast({ message: 'Failed to record visit', type: 'error' });
        }
        setVisiting(false);
    };

    if (loading) {
        return (
            <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
                <div className="container" style={{ padding: '40px 20px' }}>
                    <div className="skeleton" style={{ width: '100%', height: '400px', borderRadius: 'var(--radius)' }} />
                    <div className="skeleton" style={{ height: '32px', width: '60%', marginTop: '24px' }} />
                    <div className="skeleton" style={{ height: '16px', width: '80%', marginTop: '12px' }} />
                    <div className="skeleton" style={{ height: '16px', width: '70%', marginTop: '8px' }} />
                </div>
            </div>
        );
    }

    if (!spot) {
        return (
            <div style={{ paddingTop: '72px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
                    <h2>Spot not found</h2>
                    <Link to="/explore" className="btn btn-primary" style={{ marginTop: '16px' }}>
                        Back to Explore
                    </Link>
                </div>
            </div>
        );
    }

    const icon = categoryIcons[spot.category] || '📍';

    return (
        <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
            {/* Hero Image */}
            <div
                style={{
                    width: '100%',
                    height: '400px',
                    background: `linear-gradient(135deg, ${getGradient(spot.category)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <span style={{ fontSize: '6rem', opacity: 0.3 }}>{icon}</span>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    ←
                </button>

                {/* Distance badge */}
                {distance !== null && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                            background: 'rgba(14, 165, 233, 0.9)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                        }}
                    >
                        📍 {formatDistance(distance)} away
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="container" style={{ padding: '32px 20px 60px' }}>
                {/* Meta */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span
                        style={{
                            padding: '4px 14px',
                            borderRadius: '20px',
                            background: 'rgba(14, 165, 233, 0.1)',
                            border: '1px solid rgba(14, 165, 233, 0.2)',
                            fontSize: '0.8rem',
                            color: 'var(--color-primary-light)',
                            fontWeight: 600,
                        }}
                    >
                        {icon} {spot.category}
                    </span>
                    <span
                        style={{
                            padding: '4px 14px',
                            borderRadius: '20px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            fontSize: '0.8rem',
                            color: '#fbbf24',
                            fontWeight: 600,
                        }}
                    >
                        +{spot.points_reward} points
                    </span>
                    <span
                        style={{
                            padding: '4px 14px',
                            borderRadius: '20px',
                            background: 'rgba(148, 163, 184, 0.1)',
                            fontSize: '0.8rem',
                            color: 'var(--color-text-muted)',
                        }}
                    >
                        {spot.visits_count || 0} visits
                    </span>
                </div>

                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
                    {spot.name}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                    📍 {spot.city}, {spot.province}
                </p>

                {/* Description */}
                <div
                    className="glass"
                    style={{
                        borderRadius: 'var(--radius)',
                        padding: '24px',
                        marginBottom: '20px',
                    }}
                >
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-primary-light)' }}>
                        About this Place
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
                        {spot.description}
                    </p>
                </div>

                {/* History */}
                <div
                    className="glass"
                    style={{
                        borderRadius: 'var(--radius)',
                        padding: '24px',
                        marginBottom: '32px',
                    }}
                >
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-accent)' }}>
                        📜 Historical Background
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
                        {spot.history_content}
                    </p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                        className="btn btn-primary"
                        style={{ flex: '1', minWidth: '200px', padding: '14px 24px' }}
                        onClick={() => openNavigation(spot.latitude, spot.longitude)}
                    >
                        🧭 Navigate with Google Maps
                    </button>
                    <Link
                        to={`/ar/${spot.slug}`}
                        className="btn btn-accent"
                        style={{ flex: '1', minWidth: '200px', padding: '14px 24px', textAlign: 'center' }}
                    >
                        📱 Start AR Experience
                    </Link>
                </div>

                <button
                    className="btn btn-ghost"
                    style={{ width: '100%', marginTop: '12px', padding: '14px' }}
                    onClick={handleVisit}
                    disabled={visiting}
                >
                    {visiting ? '⏳ Recording...' : '✅ Mark as Visited'}
                </button>
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <Footer />
        </div>
    );
};

function getGradient(category) {
    const gradients = {
        'Beach/Nature': '#0ea5e9, #06b6d4, #14b8a6',
        'Mountain/Adventure': '#10b981, #059669, #047857',
        'Historical/Cultural': '#8b5cf6, #7c3aed, #6d28d9',
        'Nature/Adventure': '#22c55e, #16a34a, #15803d',
        'Nature/Waterfall': '#06b6d4, #0891b2, #0e7490',
        'Historical/Religious': '#a855f7, #9333ea, #7e22ce',
    };
    return gradients[category] || '#64748b, #475569, #334155';
}

export default Detail;

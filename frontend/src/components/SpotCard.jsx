import { Link } from 'react-router-dom';
import { formatDistance } from '../utils/geolocation';

const categoryIcons = {
    'Beach/Nature': '🏖️',
    'Mountain/Adventure': '⛰️',
    'Historical/Cultural': '🏛️',
    'Nature/Adventure': '🌿',
    'Nature/Waterfall': '💧',
    'Historical/Religious': '⛪',
};

const SpotCard = ({ spot, index = 0 }) => {
    const icon = categoryIcons[spot.category] || '📍';

    return (
        <Link
            to={`/spot/${spot.slug}`}
            className="card"
            style={{
                display: 'block',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                cursor: 'pointer',
            }}
        >
            {/* Image */}
            <div
                style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    background: `linear-gradient(135deg, ${getGradient(spot.category)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <span style={{ fontSize: '3rem', opacity: 0.5 }}>{icon}</span>

                {/* Category badge */}
                <div
                    style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    {icon} {spot.category}
                </div>

                {/* Points badge */}
                <div
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'white',
                    }}
                >
                    +{spot.points_reward} pts
                </div>

                {/* Distance */}
                {spot.distance !== undefined && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            background: 'rgba(14, 165, 233, 0.9)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'white',
                        }}
                    >
                        📍 {formatDistance(spot.distance)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '16px 20px' }}>
                <h3
                    style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        marginBottom: '6px',
                        lineHeight: 1.3,
                    }}
                >
                    {spot.name}
                </h3>
                <p
                    style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {spot.description}
                </p>
                <div
                    style={{
                        marginTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span
                        style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-text-muted)',
                        }}
                    >
                        {spot.visits_count || 0} visits
                    </span>
                    <span
                        style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-primary-light)',
                            fontWeight: 600,
                        }}
                    >
                        View Details →
                    </span>
                </div>
            </div>
        </Link>
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

export default SpotCard;

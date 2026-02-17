import { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';
import Footer from '../components/Footer';

const medals = ['🥇', '🥈', '🥉'];

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLeaderboard()
            .then(setLeaders)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
            <section
                style={{
                    padding: '40px 20px 60px',
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.1) 0%, transparent 60%)',
                }}
            >
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏆</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
                            <span className="gradient-text">Leaderboard</span>
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            Top explorers of Gingoog City
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="skeleton" style={{ height: '72px', borderRadius: 'var(--radius)' }} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {leaders.map((entry, idx) => (
                                <div
                                    key={entry.user_id}
                                    className="glass"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px 20px',
                                        borderRadius: 'var(--radius)',
                                        animation: `fadeInUp 0.4s ease-out ${idx * 0.08}s both`,
                                        border: idx < 3 ? '1px solid rgba(245,158,11,0.2)' : '1px solid var(--glass-border)',
                                        background: idx < 3 ? 'rgba(245,158,11,0.05)' : 'var(--glass-bg)',
                                    }}
                                >
                                    {/* Rank */}
                                    <div
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 800,
                                            fontSize: idx < 3 ? '1.3rem' : '0.9rem',
                                            background: idx < 3 ? 'none' : 'rgba(148, 163, 184, 0.1)',
                                            color: idx < 3 ? undefined : 'var(--color-text-muted)',
                                        }}
                                    >
                                        {idx < 3 ? medals[idx] : `#${entry.rank}`}
                                    </div>

                                    {/* Avatar */}
                                    <div
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, hsl(${entry.user_id * 40}, 70%, 50%), hsl(${entry.user_id * 40 + 30}, 70%, 40%))`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {entry.username.charAt(entry.username.length - 1)}
                                    </div>

                                    {/* Name */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{entry.username}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                            {entry.total_visits} spots visited
                                        </div>
                                    </div>

                                    {/* Points */}
                                    <div style={{ textAlign: 'right' }}>
                                        <div
                                            style={{
                                                fontWeight: 800,
                                                fontSize: '1.1rem',
                                                color: 'var(--color-accent)',
                                            }}
                                        >
                                            {entry.total_points}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>points</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Leaderboard;

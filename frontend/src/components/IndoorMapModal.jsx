/* eslint-disable react/prop-types */
// Placeholder image for floor plan - use a generic map image
const PLACEHOLDER_MAP = "https://images.unsplash.com/photo-1577086664693-894553052526?q=80&w=2070&auto=format&fit=crop";

const IndoorMapModal = ({ isOpen, onClose, spotName }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: '#1e293b',
                width: '100%',
                maxWidth: '600px',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                animation: 'scaleIn 0.3s ease-out'
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>🏢 Indoor Map: {spotName}</h3>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '20px', height: '400px', overflow: 'auto', background: '#0f172a' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                            src={PLACEHOLDER_MAP}
                            alt="Floor Plan"
                            style={{ width: '100%', height: 'auto', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)' }}
                        />

                        {/* Simulated "You are Here" Pin */}
                        <div className="animate-bounce" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -100%)',
                            fontSize: '2rem',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                        }}>
                            📍
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, 10px)',
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap'
                        }}>
                            You are here
                        </div>
                    </div>

                    <p style={{ marginTop: '16px', color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}>
                        Use this guide to explore the interior of {spotName}.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IndoorMapModal;

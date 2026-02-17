import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSpot, recordVisit } from '../services/api';
import Toast from '../components/Toast';
import AROverlay3D from '../components/AROverlay3D';

const ARMode = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [spot, setSpot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cameraActive, setCameraActive] = useState(false);
    const [markerDetected, setMarkerDetected] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [toast, setToast] = useState(null);
    const [visiting, setVisiting] = useState(false);

    useEffect(() => {
        loadSpot();
        return () => stopCamera();
    }, [slug]);

    const loadSpot = async () => {
        try {
            const data = await getSpot(slug);
            setSpot(data);
            setLoading(false);
            startCamera();
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);
            }
        } catch (err) {
            console.error('Camera error:', err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        }
    };

    // Simulate marker detection for demo
    const simulateDetection = () => {
        setMarkerDetected(true);
        setShowOverlay(true);
        setToast({ message: `🎯 ${spot?.name || 'Spot'} Detected!`, type: 'success' });
    };

    const handleVisit = async () => {
        if (!spot || visiting) return;
        setVisiting(true);
        try {
            const res = await recordVisit(spot.id);
            setToast({ message: `+${res.data.points_earned} Points Earned! 🎉`, type: 'success' });
        } catch {
            setToast({ message: 'Failed to record visit', type: 'error' });
        }
        setVisiting(false);
    };

    if (loading) {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#000',
                }}
            >
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }} className="animate-float">📱</div>
                    <p>Loading AR Experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                zIndex: 2000,
            }}
        >
            {/* Camera Feed */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />

            {/* Top Bar */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '16px 20px',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 10,
                }}
            >
                <button
                    onClick={() => { stopCamera(); navigate(-1); }}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                    }}
                >
                    ←
                </button>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: markerDetected ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                    }}
                >
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: markerDetected ? '#10b981' : '#ef4444',
                            boxShadow: markerDetected ? '0 0 10px #10b981' : '0 0 10px #ef4444',
                        }}
                    />
                    {markerDetected ? 'Marker Detected' : 'Scanning...'}
                </div>
                <div style={{ width: '40px' }} />
            </div>

            {/* Scanning Overlay (when no marker detected) */}
            {!markerDetected && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                    }}
                >
                    {/* Scanning Frame */}
                    <div
                        style={{
                            width: '240px',
                            height: '240px',
                            border: '3px solid rgba(14, 165, 233, 0.5)',
                            borderRadius: '20px',
                            position: 'relative',
                        }}
                        className="animate-pulse-glow"
                    >
                        {/* Corner accents */}
                        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                            <div
                                key={pos}
                                style={{
                                    position: 'absolute',
                                    width: '30px',
                                    height: '30px',
                                    borderColor: 'var(--color-primary)',
                                    borderWidth: '3px',
                                    borderStyle: 'solid',
                                    ...(pos.includes('top') ? { top: '-2px' } : { bottom: '-2px' }),
                                    ...(pos.includes('left') ? { left: '-2px' } : { right: '-2px' }),
                                    borderTopStyle: pos.includes('top') ? 'solid' : 'none',
                                    borderBottomStyle: pos.includes('bottom') ? 'solid' : 'none',
                                    borderLeftStyle: pos.includes('left') ? 'solid' : 'none',
                                    borderRightStyle: pos.includes('right') ? 'solid' : 'none',
                                    borderRadius: pos === 'top-left' ? '20px 0 0 0' : pos === 'top-right' ? '0 20px 0 0' : pos === 'bottom-left' ? '0 0 0 20px' : '0 0 20px 0',
                                }}
                            />
                        ))}
                    </div>

                    <p style={{ marginTop: '24px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                        Point your camera at the <strong>{spot?.name}</strong> marker
                    </p>

                    {/* Demo button */}
                    <button
                        onClick={simulateDetection}
                        className="btn btn-ghost"
                        style={{
                            marginTop: '24px',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.2)',
                        }}
                    >
                        🎮 Simulate Detection (Demo)
                    </button>
                </div>
            )}

            {/* 3D AR Overlay */}
            {markerDetected && spot && <AROverlay3D spotName={spot.name} />}
            {/* AR Info Overlay (when marker detected) */}
            {showOverlay && spot && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        background: 'linear-gradient(0deg, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.9) 80%, transparent 100%)',
                        backdropFilter: 'blur(20px)',
                        padding: '32px 20px 24px',
                        borderTopLeftRadius: '24px',
                        borderTopRightRadius: '24px',
                        zIndex: 10,
                        animation: 'fadeInUp 0.5s ease-out',
                    }}
                >
                    {/* Handle bar */}
                    <div
                        style={{
                            width: '40px',
                            height: '4px',
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '2px',
                            margin: '0 auto 20px',
                        }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'var(--gradient-hero)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                            }}
                        >
                            {categoryIcons[spot.category] || '📍'}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.2 }}>{spot.name}</h2>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{spot.category}</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                        {spot.history_content?.substring(0, 300)}...
                    </p>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                            className="btn btn-primary"
                            style={{ flex: 1, minWidth: '140px', padding: '12px' }}
                            onClick={handleVisit}
                            disabled={visiting}
                        >
                            {visiting ? '⏳ ...' : `✅ Mark Visited (+${spot.points_reward})`}
                        </button>
                        <button
                            className="btn btn-ghost"
                            style={{ minWidth: '100px', padding: '12px', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                            onClick={() => setShowOverlay(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

const categoryIcons = {
    'Beach/Nature': '🏖️',
    'Mountain/Adventure': '⛰️',
    'Historical/Cultural': '🏛️',
    'Nature/Adventure': '🌿',
    'Nature/Waterfall': '💧',
    'Historical/Religious': '⛪',
};

export default ARMode;

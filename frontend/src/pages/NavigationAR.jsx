/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSpot } from '../services/api';
import { getCurrentPosition, calculateDistance, calculateBearing } from '../utils/geolocation';
import Toast from '../components/Toast';

const NavigationAR = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);

    const [spot, setSpot] = useState(null);
    const [userLoc, setUserLoc] = useState(null);
    const [heading, setHeading] = useState(0);
    const [bearing, setBearing] = useState(0);
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        loadData();
        return () => stopCamera();
    }, [slug]);

    // Request device orientation permission (iOS 13+)
    const requestAccess = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const response = await DeviceOrientationEvent.requestPermission();
                if (response === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    setError('Permission denied for device orientation');
                }
            } catch (e) {
                console.error(e);
                setError('Error requesting orientation permission');
            }
        } else {
            // Non-iOS 13+ devices
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };

    const handleOrientation = (event) => {
        // alpha: rotation around z-axis (compass direction)
        // webkitCompassHeading: iOS implementation
        let compass = event.webkitCompassHeading || Math.abs(event.alpha - 360);
        setHeading(compass);
    };

    const loadData = async () => {
        try {
            // 1. Get Spot Data
            const spotData = await getSpot(slug);
            setSpot(spotData);

            // 2. Start Camera
            startCamera();

            // 3. Watch Position
            if ('geolocation' in navigator) {
                navigator.geolocation.watchPosition(
                    (pos) => {
                        const { latitude, longitude } = pos.coords;
                        setUserLoc({ latitude, longitude });

                        // Recalculate distance & bearing
                        const dist = calculateDistance(latitude, longitude, parseFloat(spotData.latitude), parseFloat(spotData.longitude));
                        const bear = calculateBearing(latitude, longitude, parseFloat(spotData.latitude), parseFloat(spotData.longitude));

                        setDistance(dist);
                        setBearing(bear);
                    },
                    (err) => setError('Location access denied'),
                    { enableHighAccuracy: true }
                );
            }
        } catch (err) {
            setError('Failed to load spot data');
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('Camera error:', err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        }
        window.removeEventListener('deviceorientation', handleOrientation);
    };

    // Calculate arrow rotation: relative to device heading
    const arrowRotation = (bearing - heading + 360) % 360;

    return (
        <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 2000 }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Overlay UI */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                {/* Header */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem' }}>←</button>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>AR Navigation</div>
                    <div style={{ width: '24px' }} />
                </div>

                {/* Permission Request for iOS */}
                {!permissionGranted && (
                    <button
                        onClick={requestAccess}
                        className="btn btn-primary"
                        style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}
                    >
                        Enable Compass 🧭
                    </button>
                )}

                {/* Navigation Arrow */}
                {permissionGranted && distance !== null && (
                    <div style={{
                        transform: `rotate(${arrowRotation}deg)`,
                        transition: 'transform 0.1s ease-out'
                    }}>
                        <div style={{
                            fontSize: '10rem',
                            color: distance < 0.02 ? '#10b981' : '#f59e0b', // Green if arrived (<20m)
                            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                        }}>
                            ⬆️
                        </div>
                    </div>
                )}

                {/* Status Panel */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '20px',
                    right: '20px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(10px)',
                    padding: '20px',
                    borderRadius: '20px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    {spot && (
                        <>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                background: '#0ea5e9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                📍
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Destination: {spot.name}</h3>
                                <p style={{ margin: '4px 0 0', color: '#94a3b8' }}>
                                    {distance ? `${(distance * 1000).toFixed(0)}m away` : 'Calculating...'}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
            </div>
        </div>
    );
};

export default NavigationAR;

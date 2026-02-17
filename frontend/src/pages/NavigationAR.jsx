/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSpot } from '../services/api';
import { getCurrentPosition, calculateDistance, calculateBearing } from '../utils/geolocation';
import Toast from '../components/Toast';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to recenter map when user moves
const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
};

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
    const [route, setRoute] = useState([]);

    useEffect(() => {
        loadData();
        return () => stopCamera();
    }, [slug]);

    // Fetch Route when locations update
    useEffect(() => {
        if (userLoc && spot) {
            const fetchRoute = async () => {
                try {
                    const response = await fetch(`https://router.project-osrm.org/route/v1/walking/${userLoc.longitude},${userLoc.latitude};${spot.longitude},${spot.latitude}?overview=full&geometries=geojson`);
                    const data = await response.json();
                    if (data.routes && data.routes.length > 0) {
                        // GeoJSON is [lon, lat], Leaflet wants [lat, lon]
                        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                        setRoute(coords);
                    }
                } catch (error) {
                    console.error("Error fetching route:", error);
                }
            };
            fetchRoute();
        }
    }, [userLoc, spot]);

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
                        if (spotData) {
                            const dist = calculateDistance(latitude, longitude, parseFloat(spotData.latitude), parseFloat(spotData.longitude));
                            const bear = calculateBearing(latitude, longitude, parseFloat(spotData.latitude), parseFloat(spotData.longitude));
                            setDistance(dist);
                            setBearing(bear);
                        }
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
        <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
            {/* AR View (Top 65%) */}
            <div style={{ position: 'relative', flex: '1 1 65%', overflow: 'hidden' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Header */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', zIndex: 20 }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem' }}>←</button>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>AR Navigation</div>
                    <div style={{ width: '24px' }} />
                </div>

                {/* Navigation Arrow */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                }}>
                    {!permissionGranted && (
                        <button
                            onClick={requestAccess}
                            className="btn btn-primary"
                            style={{ pointerEvents: 'auto' }}
                        >
                            Enable Compass 🧭
                        </button>
                    )}

                    {permissionGranted && distance !== null && (
                        <div style={{
                            transform: `rotate(${arrowRotation}deg)`,
                            transition: 'transform 0.1s ease-out'
                        }}>
                            <div style={{
                                fontSize: '8rem',
                                color: distance < 0.02 ? '#10b981' : '#f59e0b', // Green if arrived (<20m)
                                filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                            }}>
                                ⬆️
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Map View (Bottom 35%) */}
            <div style={{ flex: '1 1 35%', position: 'relative', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', overflow: 'hidden', marginTop: '-20px', zIndex: 100, background: 'white', boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}>
                {userLoc && spot ? (
                    <MapContainer
                        center={[userLoc.latitude, userLoc.longitude]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OSM'
                        />
                        <Marker position={[userLoc.latitude, userLoc.longitude]}>
                            <Popup>You</Popup>
                        </Marker>
                        <Marker position={[parseFloat(spot.latitude), parseFloat(spot.longitude)]}>
                            <Popup>{spot.name}</Popup>
                        </Marker>
                        {route.length > 0 && <Polyline positions={route} color="#0ea5e9" weight={5} opacity={0.8} dashArray="10, 10" />}
                        <RecenterMap lat={userLoc.latitude} lng={userLoc.longitude} />
                    </MapContainer>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#64748b' }}>
                        Loading Map...
                    </div>
                )}

                {/* Distance Overlay */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(15, 23, 42, 0.9)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    zIndex: 1000
                }}>
                    {distance ? `${(distance * 1000).toFixed(0)}m to destination` : 'Locating...'}
                </div>
            </div>

            {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        </div>
    );
};

export default NavigationAR;

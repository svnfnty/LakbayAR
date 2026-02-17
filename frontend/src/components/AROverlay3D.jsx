/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Stars, Sparkles } from '@react-three/drei';
import { useRef, useState } from 'react';

const FloatingMarker = ({ text, color = '#f59e0b' }) => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const [scale, setScale] = useState(0);

    useFrame((state, delta) => {
        // Entry animation (spring-like scale up)
        if (scale < 1) {
            setScale(s => Math.min(s + delta * 2, 1)); // Linear grow for now, or use a curve
        }

        if (meshRef.current) {
            // Normal rotation or fast spin when active
            meshRef.current.rotation.y += active ? 0.2 : 0.01;

            // Bobbing motion
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent click-through
        setActive(!active);
        // Reset active state after 1 second
        setTimeout(() => setActive(false), 1000);
    };

    // Combine entry scale with active scale
    const finalScale = (active ? 1.2 : 1) * (scale < 1 ? Math.sin(scale * Math.PI / 2) : 1); // Ease out sine (sort of)

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group
                onClick={handleClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={finalScale}
            >
                {/* Pin Head */}
                <mesh
                    position={[0, 1.5, 0]}
                    scale={hovered ? 1.1 : 1}
                    ref={meshRef}
                >
                    <octahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial
                        color={active ? '#ef4444' : color}
                        emissive={active ? '#ef4444' : color}
                        emissiveIntensity={active ? 2 : 0.5}
                        wireframe={!active}
                    />
                </mesh>

                {/* Inner Core */}
                <mesh position={[0, 1.5, 0]}>
                    <octahedronGeometry args={[0.4, 0]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Pin Stick (Cone) */}
                <mesh position={[0, 0.5, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.2, 1.5, 4]} />
                    <meshStandardMaterial color={color} transparent opacity={0.8} />
                </mesh>

                {/* Text Label */}
                <Text
                    position={[0, 2.8, 0]}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000"
                >
                    {text}
                </Text>

                <Text
                    position={[0, 2.3, 0]}
                    fontSize={0.3}
                    color={active ? "#4ade80" : "#94a3b8"}
                    anchorX="center"
                    anchorY="middle"
                >
                    {active ? "🎉 Activated!" : "(Tap to Interact)"}
                </Text>
            </group>
        </Float>
    );
};

const AROverlay3D = ({ spotName }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{ pointerEvents: 'all' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="cyan" />

                <FloatingMarker text={spotName} />

                <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#0ea5e9" />

                {/* Only show stars if looking up - simulated by generic background for now */}
                {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
            </Canvas>
        </div>
    );
};

export default AROverlay3D;

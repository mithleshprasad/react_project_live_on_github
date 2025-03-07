import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import asphalt from '../assets/textures/asphalt.jpg';

const Road = () => {
    const asphaltTexture = useLoader(TextureLoader, asphalt); // Load asphalt texture correctly

    return (
        <>
            {/* Road Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[20, 100]} />
                <meshStandardMaterial map={asphaltTexture} />
            </mesh>

            {/* Lane Markings */}
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.1, 100]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 0.1]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </>
    );
};

export default Road;

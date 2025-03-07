// // src/components/Car.js
// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';

// const Car = ({ position, isPlayer }) => {
//     const ref = useRef();

//     useFrame(() => {
//         if (ref.current) {
//             ref.current.position.set(...position);
//         }
//     });

//     return (
//         <mesh ref={ref}>
//             <boxGeometry args={[1, 0.5, 2]} />
//             <meshStandardMaterial color={isPlayer ? 'blue' : 'red'} />
//             {/* Simple wheels */}
//             {[-0.5, 0.5].map((x) => (
//                 <mesh key={x} position={[x, -0.25, -1]} rotation={[0, 0, 0]}>
//                     <cylinderGeometry args={[0.2, 0.2, 0.2, 32]} />
//                     <meshStandardMaterial color="black" />
//                 </mesh>
//             ))}
//             {[-0.5, 0.5].map((x) => (
//                 <mesh key={x + 2} position={[x, -0.25, 1]} rotation={[0, 0, 0]}>
//                     <cylinderGeometry args={[0.2, 0.2, 0.2, 32]} />
//                     <meshStandardMaterial color="black" />
//                 </mesh>
//             ))}
//         </mesh>
//     );
// };

// export default Car;
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Car = ({ position, isPlayer }) => {
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.position.set(...position);
        }
    });

    return (
        <group ref={ref}>
            {/* Car Body */}
            <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[1.5, 0.5, 3]} />
                <meshStandardMaterial color={isPlayer ? '#1E90FF' : '#FF4500'} />
            </mesh>
            {/* Car Roof */}
            <mesh position={[0, 0.65, 0]}>
                <boxGeometry args={[0.8, 0.3, 1.5]} />
                <meshStandardMaterial color={isPlayer ? '#87CEEB' : '#FF6347'} />
            </mesh>
            {/* Windows */}
            <mesh position={[0, 0.7, 0.6]}>
                <boxGeometry args={[0.6, 0.2, 0.1]} />
                <meshStandardMaterial color="lightgray" />
            </mesh>
            {/* Front and Back Windows */}
            <mesh position={[0, 0.7, -1.4]}>
                <boxGeometry args={[0.1, 0.2, 1.0]} />
                <meshStandardMaterial color="lightgray" />
            </mesh>
            <mesh position={[0, 0.7, 1.4]}>
                <boxGeometry args={[0.1, 0.2, 1.0]} />
                <meshStandardMaterial color="lightgray" />
            </mesh>
            {/* Wheels */}
            {[-0.7, 0.7].map((x) => (
                <mesh key={x} position={[x, 0.1, -1.5]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.5, 32]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            ))}
            {[-0.7, 0.7].map((x) => (
                <mesh key={x + 2} position={[x, 0.1, 1.5]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.5, 32]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            ))}
        </group>
    );
};

export default Car;

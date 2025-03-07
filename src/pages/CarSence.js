// // src/components/CarScene.js
// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import Car from './CarRacing';

// const Road = () => {
//     return (
//         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//             <planeGeometry args={[20, 100]} />
//             <meshStandardMaterial color="gray" />
//         </mesh>
//     );
// };

// const CarScene = () => {
//     const [playerPosition, setPlayerPosition] = useState([0, 0.25, 0]);
//     const speed = 0.1; // Speed for the opponent car

//     const moveCar = (rotationChange) => {
//         setPlayerPosition((prevPosition) => {
//             const newX = Math.min(Math.max(prevPosition[0] + rotationChange, -10), 10); // Keep within bounds
//             return [newX, prevPosition[1], prevPosition[2]];
//         });
//     };

//     const moveForward = () => {
//         setPlayerPosition((prevPosition) => {
//             const newZ = prevPosition[2] - speed; // Move forward
//             return [prevPosition[0], prevPosition[1], newZ];
//         });
//     };

//     const resetPosition = () => {
//         setPlayerPosition([0, 0.25, 0]); // Reset to starting position
//     };

//     return (
//         <>
//             <Canvas style={{ height: '100vh' ,background:'lawngreen',width:"1000px"}}>
//                 <ambientLight />
//                 <directionalLight position={[10, 10, 5]} />
//                 <Road />
//                 <Car position={playerPosition} isPlayer={true} />
//                 <Car position={[0, 0.25, 10]} isPlayer={false} /> {/* Opponent car */}
//                 <OrbitControls />
//             </Canvas>
//             <div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>
//                 <h3>Control the Car</h3>
//                 <button onClick={() => moveCar(-0.2)}>Left</button>
//                 <button onClick={() => moveCar(0.2)}>Right</button>
//                 <button onClick={moveForward}>Forward</button>
//                 <button onClick={resetPosition}>Reset Position</button>
//             </div>
//         </>
//     );
// };

// export default CarScene;
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Car from './CarRacing';
import Road from './CarRoad';

const CarScene = () => {
    const [playerPosition, setPlayerPosition] = useState([0, 0.25, 0]);
    const [speed, setSpeed] = useState(0.05); // Start with low speed

    const moveCar = (rotationChange) => {
        setPlayerPosition((prevPosition) => {
            const newX = Math.min(Math.max(prevPosition[0] + rotationChange, -10), 10);
            return [newX, prevPosition[1], prevPosition[2]];
        });
    };

    const moveForward = () => {
        setPlayerPosition((prevPosition) => {
            const newZ = prevPosition[2] - speed; // Move forward based on speed
            return [prevPosition[0], prevPosition[1], newZ];
        });
    };

    const resetPosition = () => {
        setPlayerPosition([0, 0.25, 0]);
    };

    const increaseSpeed = () => {
        setSpeed((prevSpeed) => Math.min(prevSpeed + 0.05, 1)); // Increase speed, max at 1
    };

    const decreaseSpeed = () => {
        setSpeed((prevSpeed) => Math.max(prevSpeed - 0.05, 0.05)); // Decrease speed, min at 0.05
    };

    return (
        <>
            <Canvas style={{ height: '100vh' ,width:"1000px",background:"gray" }}>
                <ambientLight />
                <directionalLight position={[10, 10, 5]} />
                <Road />
                <Car position={playerPosition} isPlayer={true} />
                <Car position={[0, 0.25, 10]} isPlayer={false} /> {/* Opponent car */}
                <OrbitControls />
            </Canvas>
            <div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>
                <h3>Control the Car</h3>
                <button onClick={() => moveCar(-0.2)}>Left</button>
                <button onClick={() => moveCar(0.2)}>Right</button>
                <button onClick={moveForward}>Forward</button>
                <button onClick={resetPosition}>Reset Position</button>
                <div>
                    <button onClick={increaseSpeed}>Increase Speed</button>
                    <button onClick={decreaseSpeed}>Decrease Speed</button>
                </div>
                <p style={{color:"black"}}>{speed.toFixed(2)}</p>
            </div>
        </>
    );
};

export default CarScene;

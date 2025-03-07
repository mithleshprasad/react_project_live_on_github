// import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import BetForm from './BetForm';
// import CashOutButton from './CashOutButton';
// import Aviator from '../assets/aviator.png';

// const socket = io('http://localhost:5000'); // Replace with your backend URL

// const Game = () => {
//   const [multiplier, setMultiplier] = useState(1);
//   const [isGameActive, setIsGameActive] = useState(false);
//   const [animationSpeed, setAnimationSpeed] = useState(0);
//   const [gameRoundId, setGameRoundId] = useState(null);
//   const [results, setResults] = useState([]);
//   const highThreshold = 5;
//   const [finalMultiplier, setFinalMultiplier] = useState(1); // Add state for finalMultiplier

//   const canvasRef = useRef(null);
//   const aviatorImage = useRef(new Image());
//   aviatorImage.current.src = Aviator;

//   // Effect to handle socket events
//   useEffect(() => {
//     const handleMultiplierUpdate = (data) => {
//       setMultiplier(data.multiplier);
//       setAnimationSpeed(Math.round(data.speed));
//       console.warn("data.speed", data.speed);
//     };

//     // Set up socket listeners
//     socket.on('multiplierUpdate', handleMultiplierUpdate);
//     socket.on('gameCrash', (finalMultiplier) => {
//       alert(`Game crashed at multiplier: ${finalMultiplier}`);
//       setFinalMultiplier(finalMultiplier)
//       placeBet();
//       setIsGameActive(false);
//     });

//     return () => {
//       socket.off('multiplierUpdate', handleMultiplierUpdate);
//       socket.off('gameCrash');
//     };
//   }, []);

//   // Fetch initial results
//   useEffect(() => {
//     placeBet();
//   }, []);

//   const placeBet = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/bets/ResultList');
//       if (response.data.success) {
//         setResults(response.data.results);
//       }
//     } catch (err) {
//       console.error('Error fetching results:', err);
//       alert('Error fetching results');
//     }
//   };

//   const getColor = (crashPoint) => (crashPoint > highThreshold ? 'green' : 'red');

//   const [aviatorPosition, setAviatorPosition] = useState({ x: 0, y: 0 });

//   const startGame = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/game/startGame');
//       setGameRoundId(response.data.gameRoundId);
//       setIsGameActive(true);
//       let animationFrameId;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       const aviatorImage = new Image();
//       aviatorImage.src = Aviator;
//       let position = { x: 0, y: canvas.height }; 

//       const moveAviator = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height); 
  
       
//         position.x += 1;
//         position.y -= 1; 
  
//         ctx.drawImage(aviatorImage, position.x, position.y, 50, 50);
  
     
//         setAviatorPosition({ x: position.x, y: position.y });
  
       
//         if (position.x < canvas.width && position.y > 0) {
//           animationFrameId = requestAnimationFrame(moveAviator); 
//         }
//       };
  
//       aviatorImage.onload = () => {
//         moveAviator(); 
//       };
  
//       return () => {
//         cancelAnimationFrame(animationFrameId); 
//       };
//     } catch (err) {
//       console.error('Error starting game:', err);
//     }
//   };
//   return (
//     <div className='text-center'>
//       <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//         {results.map((result) => (
//           <div
//             key={result._id}
//             style={{
//               margin: '0 10px',
//               color: getColor(result.crashPoint),
//               fontWeight: 'bold',
//             }}
//           >
//             {result.crashPoint.toFixed(2)}
//           </div>
//         ))}
//       </div>

//      <h1>Aviator Game</h1>
      
//          <canvas
//         ref={canvasRef}
//         width={500} // Set the canvas size
//         height={500}
//         style={{ border: '3px solid red', marginTop: '20px',background:"#4f5d4f" }} 
//       />

//       {/* <div>
     
//         <p>Aviator Position: X: {aviatorPosition.x}, Y: {aviatorPosition.y}</p>
//       </div> */}
//       <h2>{multiplier.toFixed(2)}x</h2>
//       {!isGameActive ? (
//         <button className='btn bg-primary text-light' onClick={startGame}>
//           Start New Game
//         </button>
//       ) : (
//         <>
//           <BetForm gameRoundId={gameRoundId} />
//           <CashOutButton gameRoundId={gameRoundId} multiplier={multiplier} />
//         </>
//       )}

  
   
//     </div>
//   );
// };

// export default Game;








import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import BetForm from './BetForm';
import CashOutButton from './CashOutButton';
import Aviator from '../assets/aviator.png';

const socket = io('http://localhost:5000'); // Replace with your backend URL

const Game = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [isGameActive, setIsGameActive] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(0);
  const [gameRoundId, setGameRoundId] = useState(null);
  const [results, setResults] = useState([]);
  const highThreshold = 5;
  const [finalMultiplier, setFinalMultiplier] = useState(1); // Add state for finalMultiplier

  const canvasRef = useRef(null);
  const aviatorImage = useRef(new Image());
  aviatorImage.current.src = Aviator;

  // Effect to handle socket events
  useEffect(() => {
    const handleMultiplierUpdate = (data) => {
      setMultiplier(data.multiplier);
      setAnimationSpeed(Math.round(data.speed));
      console.warn("data.speed", data.speed);
    };

    // Set up socket listeners
    socket.on('multiplierUpdate', handleMultiplierUpdate);
    socket.on('gameCrash', (finalMultiplier) => {
      alert(`Game crashed  ${finalMultiplier.toFixed(2)}`);
      setFinalMultiplier(finalMultiplier);
      placeBet();
      setIsGameActive(false);
    });

    return () => {
      socket.off('multiplierUpdate', handleMultiplierUpdate);
      socket.off('gameCrash');
    };
  }, []);

  // Fetch initial results
  useEffect(() => {
    placeBet();
  }, []);

  const placeBet = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bets/ResultList');
      if (response.data.success) {
        setResults(response.data.results);
      }
    } catch (err) {
      console.error('Error fetching results:', err);
      alert('Error fetching results');
    }
  };

  const getColor = (crashPoint) => (crashPoint > highThreshold ? 'green' : 'red');

  const [aviatorPosition, setAviatorPosition] = useState({ x: 0, y: 0 });

  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/game/startGame');
      setGameRoundId(response.data.gameRoundId);
      setIsGameActive(true);
      let animationFrameId;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const aviatorImage = new Image();
      aviatorImage.src = Aviator;
      let position = { x: 0, y: canvas.height }; 

      const moveAviator = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the adjusted Y position based on finalMultiplier
        const adjustedY = canvas.height - (finalMultiplier * 10); // Adjust 10 for scaling

        // Calculate step size based on desired speed
        const stepSize = 2; // Adjust this value to change the speed of the aviator

        position.x += stepSize; // Move right
        position.y = adjustedY - (position.x * Math.sqrt(2)); // Move up at 45 degrees

        // Ensure the aviator doesn't go out of bounds
        if (position.x > canvas.width) {
          position.x = canvas.width;
        }
        if (position.y < 0) {
          position.y = 0;
        }

        ctx.drawImage(aviatorImage, position.x, position.y, 50, 50);
        setAviatorPosition({ x: position.x, y: position.y });

        // Continue animation if the aviator is still within the canvas
        if (position.x < canvas.width && position.y > 0) {
          animationFrameId = requestAnimationFrame(moveAviator);
        }
      };

      aviatorImage.onload = () => {
        moveAviator(); 
      };

      return () => {
        cancelAnimationFrame(animationFrameId); 
      };
    } catch (err) {
      console.error('Error starting game:', err);
    }
  };

  return (
    <div className='text-center'>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {results.map((result) => (
          <div
            key={result._id}
            style={{
              margin: '0 10px',
              color: getColor(result.crashPoint),
              fontWeight: 'bold',
            }}
          >
            {result.crashPoint.toFixed(2)}
          </div>
        ))}
      </div>

      <h1>Aviator Game</h1>
      
      <canvas
        ref={canvasRef}
        style={{ border: '3px solid red', marginTop: '20px',background:"#000" }} 
      />

      <h2>{multiplier.toFixed(2)}x</h2>
      {!isGameActive ? (
        <button className='btn bg-primary text-light' onClick={startGame}>
          Start New Game
        </button>
      ) : (
        <>
          <BetForm gameRoundId={gameRoundId} />
          <CashOutButton gameRoundId={gameRoundId} multiplier={multiplier} />
        </>
      )}
    </div>
  );
};

export default Game;

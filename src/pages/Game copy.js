// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import BetForm from './BetForm';
// import CashOutButton from './CashOutButton';
// import axios from 'axios';


// const socket = io('http://localhost:5000'); // Replace with your backend URL

// const Game = () => {
//   const [multiplier, setMultiplier] = useState(1);
//   const [isGameActive, setIsGameActive] = useState(false);
//   const [gameRoundId, setGameRoundId] = useState(null);

//   useEffect(() => {
//     // Listen for multiplier updates from server
//     socket.on('multiplierUpdate', (multiplier) => {
//       setMultiplier(multiplier);
//     });

//     // Listen for game crash event
//     socket.on('gameCrash', (finalMultiplier) => {
//       alert(`Game crashed at multiplier: ${finalMultiplier}`);
//       placeBet();
//       setIsGameActive(false);
//     });

//     return () => {
//       socket.off('multiplierUpdate');
//       socket.off('gameCrash');
//     };
//   }, []);
//   const [results, setResults] = useState([]);
//   const highThreshold = 5;
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
//   const getColor = (crashPoint) => {
//     return crashPoint > highThreshold ? 'green' : 'red'; // Change colors as needed
//   };
//   // Start game round via API
//   const startGame = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/game/startGame');
//       setGameRoundId(response.data.gameRoundId);
//       setIsGameActive(true);
//     } catch (err) {
//       console.error('Error starting game:', err);
//     }
//   };

//   return (
//     <div className='text-center'>
//          <>
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
//       </div></>
//       <h1>Aviator Game</h1>
//       <h2> {multiplier.toFixed(2)}x</h2>

//       {!isGameActive ? (
//         <button className='btn bg-primary text-light' onClick={startGame}>Start New Game</button>
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
import BetForm from './BetForm';
import CashOutButton from './CashOutButton';
import axios from 'axios';
import Aviator from '../assets/aviator.png';
const socket = io('http://localhost:5000'); // Replace with your backend URL

const Game = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [AnimationSpeed, setAnimationSpeed] = useState(1);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameRoundId, setGameRoundId] = useState(null);
  const [results, setResults] = useState([]);
  const highThreshold = 5;

  const canvasRef = useRef(null);
  const aviatorImage = new Image();
  aviatorImage.src = `${Aviator}`;

  useEffect(() => {
    socket.on('multiplierUpdate', (data) => {
      setMultiplier(data.multiplier);
      setAnimationSpeed(data.speed);
      console.warn("data.speed",data.speed)
    });

    socket.on('gameCrash', (finalMultiplier) => {
      alert(`Game crashed at multiplier: ${finalMultiplier}`);
      placeBet();
      setIsGameActive(false);
    });

    return () => {
      socket.off('multiplierUpdate');
      socket.off('gameCrash');
    };
  }, []);

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

  const getColor = (crashPoint) => {
    return crashPoint > highThreshold ? 'green' : 'red';
  };

  // Start game round via API
  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/game/startGame');
      setGameRoundId(response.data.gameRoundId);
      setIsGameActive(true);
    } catch (err) {
      console.error('Error starting game:', err);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const midX = width ;
    const midY = height;
  
    let aviatorX = 0;
    let aviatorY = height - 150; 
    let localSpeed = AnimationSpeed ; // Use the speed from the server and scale it
  
    const drawAviator = () => {
      ctx.clearRect(0, 0, width, height); 
  
      const aviatorWidth = 150 ; 
      const aviatorHeight = 150 ;
  
      ctx.drawImage(aviatorImage, aviatorX, aviatorY, aviatorWidth, aviatorHeight); // Draw aviator with dynamic size
  
      aviatorX += localSpeed ;
      aviatorY -= localSpeed;
  
      if (aviatorX < midX - aviatorWidth / 2 && aviatorY > midY - aviatorHeight / 2) {
        requestAnimationFrame(drawAviator);
      }
    };
  
 
    aviatorImage.onload = () => {
      drawAviator();
    };
  
    return () => {
      cancelAnimationFrame(drawAviator);
    };
  }, [aviatorImage]);
  

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
      <canvas ref={canvasRef} style={{ border: '1px solid black', marginTop: '20px',     background: 'linear-gradient(to right bottom, #000, rgba(255, 0, 0, 0))' }} />
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

      {/* Add the canvas for aviator animation */}
     
    </div>
  );
};

export default Game;


import React, { useState, useEffect } from 'react';

const shapes = ['Circle', 'Square', 'Triangle', 'Rectangle', 'Pentagon'];

const ShapeSprint = () => {
    const [currentShape, setCurrentShape] = useState('');
    const [points, setPoints] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
        }
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        setPoints(0);
        setIsPlaying(true);
        setTimeLeft(30);
        callShape();
    };

    const callShape = () => {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        setCurrentShape(randomShape);
    };

    const catchShape = (caughtShape) => {
        if (caughtShape === currentShape) {
            setPoints(points + 1);
        }
        callShape();
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Shape Sprint Game</h1>
            {isPlaying ? (
                <>
                    <h2>Catch: {currentShape}</h2>
                    <h3>Points: {points}</h3>
                    <h4>Time Left: {timeLeft}s</h4>
                    <div>
                        {shapes.map((shape) => (
                            <button 
                                key={shape} 
                                onClick={() => catchShape(shape)} 
                                style={{ margin: '5px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}
                            >
                                {shape}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <button onClick={startGame} style={{ padding: '10px 20px' }}>
                    Start Game
                </button>
            )}
        </div>
    );
};

export default ShapeSprint;

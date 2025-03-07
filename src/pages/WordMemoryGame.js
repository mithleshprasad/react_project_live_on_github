import React, { useState, useEffect } from 'react';
import './WordMemoryGame.css'; // Import custom CSS for styling

const words = [
    "Apple", "Banana", "Cherry", "Date", "Elderberry", 
    "Fig", "Grape", "Honeydew", "Kiwi", "Lemon", 
    "Mango", "Nectarine", "Orange", "Papaya", "Quince",
    "Raspberry", "Strawberry", "Tangerine", "Ugli fruit", "Vanilla",
    "Watermelon", "Xigua", "Yellow passion fruit", "Zucchini"
];

const WordMemoryGame = () => {
    const [shownWords, setShownWords] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [showWords, setShowWords] = useState(false);
    const [timer, setTimer] = useState(5); // Timer set to 5 seconds

    // Start the game and display words
    const startGame = () => {
        setScore(0);
        setUserInput('');
        const shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 10); // Select 10 random words
        setShownWords(shuffledWords);
        setShowWords(true);
        setGameStarted(true);
        setTimer(5); // Reset timer to 5 seconds

        // Start timer countdown
        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setShowWords(false); // Hide words when time is up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Check user's input against shown words
    const checkWords = () => {
        const inputWords = userInput.split(',').map(word => word.trim());
        const correctWords = shownWords.filter(word => inputWords.includes(word));
        setScore(correctWords.length * 10); // Each correct word gives 10 points
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Word Memory Game</h1>
            <h3>Score: {score}</h3>
            {showWords && (
                <div>
                    <h2>Remember these words:</h2>
                    <div className="word-container">
                        {shownWords.map((word, index) => (
                            <span key={index} className="word">{word}</span>
                        ))}
                    </div>
                    <h4>Time left: {timer} seconds</h4>
                </div>
            )}
            {!showWords && gameStarted && (
                <div>
                    <h3>Type the words you remember (comma separated):</h3>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter words..."
                    />
                    <button onClick={checkWords} style={{ padding: '10px 20px', margin: '20px' }}>
                        Check Words
                    </button>
                </div>
            )}
            {!gameStarted && (
                <button onClick={startGame} style={{ padding: '10px 20px', margin: '20px' }}>
                    Start Game
                </button>
            )}
        </div>
    );
};

export default WordMemoryGame;

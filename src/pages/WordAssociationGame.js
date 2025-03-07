import React, { useState, useEffect } from 'react';
import './WordAssociationGame.css';

const words = [
    { word: 'Apple', related: ['Fruit', 'Red', 'Healthy'], hint: 'A common fruit that is often red or green. Answer: Fruit' },
    { word: 'Dog', related: ['Pet', 'Bark', 'Friend'], hint: 'A loyal pet known for barking. Answer: Pet' },
    { word: 'Car', related: ['Drive', 'Vehicle', 'Fast'], hint: 'A common mode of transportation with wheels. Answer: Vehicle' },
    { word: 'Ocean', related: ['Water', 'Blue', 'Waves'], hint: 'A large body of salt water. Answer: Water' },
    { word: 'Tree', related: ['Green', 'Leaves', 'Nature'], hint: 'A tall plant that has a trunk and branches. Answer: Green' },
];

const WordAssociationGame = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20); // 10 seconds for each word
    const [message, setMessage] = useState('');
    const [gameActive, setGameActive] = useState(false);
    const [showHint, setShowHint] = useState(false); // State for showing hint

    useEffect(() => {
        let timer;
        if (gameActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setMessage('Time is up! ❌');
            nextWord();
        }
        return () => clearInterval(timer);
    }, [gameActive, timeLeft]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (words[currentWordIndex].related.includes(userInput)) {
            setScore(score + 10);
            setMessage('Good Job! 🎉');
        } else {
            setMessage('Wrong Association! ❌');
        }
        nextWord();
        setUserInput('');
        setShowHint(false); // Reset hint visibility
    };

    const nextWord = () => {
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            setTimeLeft(20);
            setShowHint(false); // Reset hint visibility
        } else {
            setMessage(`Game Over! Your score: ${score}`);
            setGameActive(false);
        }
    };

    const startGame = () => {
        setScore(0);
        setCurrentWordIndex(0);
        setUserInput('');
        setTimeLeft(20);
        setMessage('');
        setShowHint(false); // Reset hint visibility
        setGameActive(true);
    };

    const resetGame = () => {
        setScore(0);
        setCurrentWordIndex(0);
        setUserInput('');
        setTimeLeft(20);
        setMessage('');
        setShowHint(false); // Reset hint visibility
        setGameActive(false);
    };

    const handleShowHint = () => {
        setShowHint(true); // Show the hint when the button is clicked
    };

    return (
        <div className="container">
            <h1 className="title">Word Friends Game!</h1>
            {gameActive ? (
                <>
                    <h2>Current Word: {words[currentWordIndex].word}</h2>
                    <h3>Time Left: {timeLeft}s</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type a related word..."
                            required
                        />
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    <button onClick={handleShowHint} className="hint-btn">Show Hint</button>
                    {showHint && <p className="hint">Hint: {words[currentWordIndex].hint}</p>}
                    <p>{message}</p>
                    <p>Score: {score}</p>
                </>
            ) : (
                <>
                    <p>{message}</p>
                    <button onClick={startGame} className="submit-btn">Start Game</button>
                </>
            )}
            <button onClick={resetGame} className="submit-btn">Reset Game</button>
        </div>
    );
};

export default WordAssociationGame;

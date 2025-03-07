import React, { useState, useEffect } from 'react';
import './wordsByLevel.css'; // Importing custom CSS for styling

// Card data
const cards = [
    { id: 1, image: '🍎' }, { id: 1, image: '🍎' },
    { id: 2, image: '🍌' }, { id: 2, image: '🍌' },
    { id: 3, image: '🍇' }, { id: 3, image: '🍇' },
    { id: 4, image: '🍉' }, { id: 4, image: '🍉' },
    { id: 5, image: '🍊' }, { id: 5, image: '🍊' },
    { id: 6, image: '🍒' }, { id: 6, image: '🍒' },
];

const MemoryMatch = () => {
    const [shuffledCards, setShuffledCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [points, setPoints] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Shuffle cards on component mount
    useEffect(() => {
        shuffleCards();
    }, []);

    // Check for matches
    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            if (shuffledCards[firstIndex].id === shuffledCards[secondIndex].id) {
                setMatchedPairs((prev) => [...prev, shuffledCards[firstIndex].id]);
                setPoints((prev) => prev + 10); // Increase points by 10 for a match
            }
            const timeout = setTimeout(() => {
                setFlippedIndices([]); // Reset flipped indices after a short delay
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [flippedIndices, shuffledCards]);

    // Shuffle cards function
    const shuffleCards = () => {
        const shuffled = cards.sort(() => 0.5 - Math.random());
        setShuffledCards(shuffled);
        setMatchedPairs([]);
        setPoints(0);
        setIsPlaying(true);
        setFlippedIndices([]); // Reset flipped indices
    };

    // Handle card click
    const handleCardClick = (index) => {
        if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(shuffledCards[index].id)) {
            setFlippedIndices((prev) => [...prev, index]);
        }
    };

    // Render card function
    const renderCard = (card, index) => {
        const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(card.id);
        return (
            <div 
                key={index} 
                className={`card ${isFlipped ? 'flipped' : ''}`} 
                onClick={() => handleCardClick(index)}
            >
                {isFlipped ? card.image : '❓'}
            </div>
        );
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Memory Match Game</h1>
            <h3>Points: {points}</h3>
            {isPlaying ? (
                <>
                    <div className="grid">
                        {shuffledCards.map((card, index) => renderCard(card, index))}
                    </div>
                    <button onClick={shuffleCards} style={{ padding: '10px 20px', marginTop: '20px' }}>
                        Restart Game
                    </button>
                </>
            ) : (
                <button onClick={shuffleCards} style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Start Game
                </button>
            )}
        </div>
    );
};

export default MemoryMatch;

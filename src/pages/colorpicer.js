import React, { useState } from 'react';
import './Appcolor.css';

// Available colors
const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Purple', hex: '#800080' },
];

function App() {
    // State variables
    const [targetColor, setTargetColor] = useState(getRandomColor());
    const [result, setResult] = useState('');

    // Function to get a random color
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Handle color click
    const handleColorClick = (color) => {
        if (color.name === targetColor.name) {
            setResult(`🎉 Correct! The color is ${color.name}`);
        } else {
            setResult('❌ Try Again!');
        }
    };

    // Reset the game
    const resetGame = () => {
        setTargetColor(getRandomColor());
        setResult('');
    };

    return (
        <div className="container">
            <h1>Color Picker Game</h1>
            <h2>Pick the color: <span style={{ color: targetColor.hex }}>{targetColor.name}</span></h2>
            <div className="colors-container">
                {colors.map((color) => (
                    <div
                        key={color.name}
                        className="color-box"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => handleColorClick(color)}
                    />
                ))}
            </div>
            <div className="result">{result}</div>
            {result && (
                <button onClick={resetGame} className="reset-btn">Play Again</button>
            )}
        </div>
    );
}

export default App;

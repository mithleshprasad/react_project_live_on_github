import React from 'react';
import '../pages/App.css';
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="container">
            <h1 className="title">Fun Games for Kids</h1>
            <div className="button-container">
                <Link to="/Colorpicer" className="submit-btn bg-color-game mx-1">Color Game</Link>
                <Link to="/scrambleWord" className="submit-btn bg-scramble-game mx-1">Scramble Word Game</Link>
                <Link to="/Mathgame" className="submit-btn bg-quiz-game mx-1">Quiz Game</Link>
                <Link to="/wordsByLevel" className="submit-btn bg-memory-game mx-1">Memory Match</Link>
                <Link to="/WordAssociationGame" className="submit-btn bg-scavenger-game mx-1">Word Association Game</Link>
                <Link to="/CarSence" className="submit-btn bg-scramble-game mx-1">Car Racing Game</Link>
                {/* <Link to="/WordMemoryGame" className="submit-btn bg-memory-game mx-1">Word Memory Game</Link> */}
            </div>
        </div>
    );
}

export default App;

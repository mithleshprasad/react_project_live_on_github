import React, { useState, useEffect } from 'react';
import './AppScrap.css';

// List of 200 words and their Hindi meanings
const wordsData = [
  { word: 'apple', meaning: 'सेब' },
  { word: 'banana', meaning: 'केला' },
  { word: 'cherry', meaning: 'चेरी' },
  { word: 'grape', meaning: 'अंगूर' },
  { word: 'orange', meaning: 'संतरा' },
  { word: 'lemon', meaning: 'नींबू' },
  { word: 'mango', meaning: 'आम' },
  { word: 'peach', meaning: 'आड़ू' },
  { word: 'melon', meaning: 'खरबूजा' },
  { word: 'berry', meaning: 'जामुन' },
  { word: 'kiwi', meaning: 'कीवी' },
  { word: 'plum', meaning: 'आलूबुखारा' },
  { word: 'pear', meaning: 'नाशपाती' },
  { word: 'watermelon', meaning: 'तरबूज' },
  { word: 'pineapple', meaning: 'अनानास' },
  { word: 'coconut', meaning: 'नारियल' },
  { word: 'avocado', meaning: 'एवोकाडो' },
  { word: 'strawberry', meaning: 'स्ट्रॉबेरी' },
  { word: 'blueberry', meaning: 'ब्लूबेरी' },
  { word: 'raspberry', meaning: 'रास्पबेरी' },
  { word: 'carrot', meaning: 'गाजर' },
  { word: 'onion', meaning: 'प्याज' },
  { word: 'garlic', meaning: 'लहसुन' },
  { word: 'potato', meaning: 'आलू' },
  { word: 'tomato', meaning: 'टमाटर' },
  { word: 'cucumber', meaning: 'खीरा' },
  { word: 'spinach', meaning: 'पालक' },
  { word: 'broccoli', meaning: 'ब्रोकली' },
  { word: 'corn', meaning: 'मक्का' },
  { word: 'pepper', meaning: 'मिर्च' },
  { word: 'cauliflower', meaning: 'फूलगोभी' },
  { word: 'ginger', meaning: 'अदरक' },
  { word: 'mint', meaning: 'पुदीना' },
  { word: 'celery', meaning: 'अजवाइन' },
  { word: 'lettuce', meaning: 'सलाद पत्ता' },
  { word: 'radish', meaning: 'मूली' },
  { word: 'beetroot', meaning: 'चुकंदर' },
  { word: 'zucchini', meaning: 'तोरी' },
  { word: 'eggplant', meaning: 'बैंगन' },
  { word: 'pumpkin', meaning: 'कद्दू' },
  { word: 'pea', meaning: 'मटर' },
  { word: 'yam', meaning: 'जिमीकंद' },
  { word: 'asparagus', meaning: 'शतावरी' },
  { word: 'artichoke', meaning: 'हाथीचक्की' },
  { word: 'mushroom', meaning: 'कुकुरमुत्ता' },
  { word: 'olive', meaning: 'जैतून' },
  { word: 'grapefruit', meaning: 'मौसमी' },
  { word: 'lime', meaning: 'नींबू' },
  { word: 'papaya', meaning: 'पपीता' },
  { word: 'apricot', meaning: 'खुबानी' },
  { word: 'guava', meaning: 'अमरूद' },
  { word: 'fig', meaning: 'अंजीर' },
  { word: 'date', meaning: 'खजूर' },
  { word: 'pomegranate', meaning: 'अनार' },
  { word: 'lychee', meaning: 'लीची' },
  { word: 'persimmon', meaning: 'तेंदू' },
  { word: 'nectarine', meaning: 'शफ्फाक आड़ू' },
  { word: 'tangerine', meaning: 'नारंगी' },
  { word: 'cantaloupe', meaning: 'खरबूजा' },
  { word: 'honeydew', meaning: 'शहद खीरा' },
  { word: 'dragonfruit', meaning: 'ड्रैगन फ्रूट' },
  { word: 'passionfruit', meaning: 'जुनून फल' },
  { word: 'starfruit', meaning: 'तारा फल' },
  { word: 'jackfruit', meaning: 'कटहल' },
  { word: 'durian', meaning: 'दुरियन' },
  { word: 'rambutan', meaning: 'रम्बुटान' },
  { word: 'longan', meaning: 'लॉन्गन' },
  { word: 'mulberry', meaning: 'शहतूत' },
  { word: 'blackberry', meaning: 'ब्लैकबेरी' },
  { word: 'cranberry', meaning: 'क्रैनबेरी' },
  { word: 'gooseberry', meaning: 'आंवला' },
  { word: 'currant', meaning: 'किशमिश' },
  // Continue adding more words to reach 200 words
];

// Function to scramble a word
const scrambleWord = (word) => {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
};

function App() {
  const [currentWordData, setCurrentWordData] = useState(getRandomWordData());
  const [scrambledWord, setScrambledWord] = useState(scrambleWord(currentWordData.word));
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [message, setMessage] = useState('');

  // Load score and correct words from local storage
  useEffect(() => {
    const savedScore = localStorage.getItem('scrambleScore');
    const savedCorrectWords = localStorage.getItem('correctWords');
    if (savedScore) setScore(parseInt(savedScore, 10));
    if (savedCorrectWords) setCorrectWords(parseInt(savedCorrectWords, 10));
  }, []);

  // Save score and correct words to local storage when they change
  useEffect(() => {
    localStorage.setItem('scrambleScore', score);
    localStorage.setItem('correctWords', correctWords);
  }, [score, correctWords]);

  // Get a random word and its Hindi meaning from the list
  function getRandomWordData() {
    return wordsData[Math.floor(Math.random() * wordsData.length)];
  }

  // Handle letter clicks to form the word
  const handleLetterClick = (letter) => {
    setInput((prevInput) => prevInput + letter);
  };

  // Check if the word is correct
  const checkWord = () => {
    if (input.toLowerCase() === currentWordData.word.toLowerCase()) {
      setMessage('🎉 Correct!');
      setScore(score + 1);
      setCorrectWords(correctWords + 1);
      resetGame();
    } else {
      setMessage('❌ Try Again!');
    }
  };

  // Reset the game with a new word
  const resetGame = () => {
    const newWordData = getRandomWordData();
    setCurrentWordData(newWordData);
    setScrambledWord(scrambleWord(newWordData.word));
    setInput('');
    setMessage('');
  };

  // Reset the score to zero and reset the game
  const resetScore = () => {
    setScore(0);
    setCorrectWords(0);
    setMessage('Score has been reset.');
    resetGame();
  };

  return (
    <div className="container">
      <h1>Word Scramble Game</h1>
      {/* <h2>Unscramble the word:</h2> */}
      <h3>Hindi Meaning: {currentWordData.meaning}</h3>
      <div className="scrambled-word">
        {scrambledWord.split('').map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter)}
            className="letter-btn m-1"
          >
            {letter}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Form the word here"
        readOnly
        className="input-box"
      />
      <div className="buttons">
        <button onClick={checkWord} className="check-btn">Check</button>
        <button onClick={resetScore} className="reset-btn">Reset Score</button>
      </div>
      <div className="message">{message}</div>
      <div className="score">Score: {score}</div>
      <div className="correct-words">Correct Words: {correctWords}</div>
    </div>
  );
}

export default App;

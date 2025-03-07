import React, { useState, useEffect } from 'react';
import './Appmath.css';

const MathQuizGame = () => {
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(5); // Max questions per level

  // Generate a random math question
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10 * level);
    const num2 = Math.floor(Math.random() * 10 * level);
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let newQuestion = `${num1} ${operation} ${num2}`;
    setQuestion(newQuestion);

    // Calculate the correct answer
    let answer;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      default:
        break;
    }
    setCorrectAnswer(answer);
  };

  // Check the answer
  const checkAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
      setMessage('🎉 Correct!');
    } else {
      setMessage(`❌ Incorrect! The correct answer was ${correctAnswer}`);
    }

    setQuestionsAnswered(questionsAnswered + 1);
    setAnswer('');
  };

  // Reset the game
  const resetGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setLevel(1);
    generateQuestion();
    setMessage('');
  };

  // Move to the next level if max questions are answered
  useEffect(() => {
    if (questionsAnswered >= maxQuestions) {
      setLevel(level + 1);
      setQuestionsAnswered(0);
      generateQuestion();
    } else {
      generateQuestion();
    }
  }, [questionsAnswered, level]);

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="container">
      <h1>Math Quiz Game</h1>
      <h2>Level: {level}</h2>
      <h3>Score: {score}</h3>
      <h4>{question}</h4>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
        className="input-box"
      />
      <div className="buttons">
        <button onClick={checkAnswer} className="check-btn bg-dark">Check </button>
        <button onClick={resetGame} className="reset-btn bg-danger">Reset </button>
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

export default MathQuizGame;

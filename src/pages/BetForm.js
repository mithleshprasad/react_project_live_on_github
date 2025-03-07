import React, { useState } from 'react';
import axios from 'axios';

const BetForm = ({ gameRoundId }) => {
  const [betAmount, setBetAmount] = useState('');
  const [userId, setUserId] = useState('');

  const placeBet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bets/placeBet', {
        userId,
        betAmount: Number(betAmount),
        gameRoundId:"df43"
      });
      alert('Bet placed successfully!');
    } catch (err) {
      console.error('Error placing bet:', err);
      alert('Error placing bet');
    }
  };

  return (
    <form onSubmit={placeBet}>
      {/* <input
      className='form control'
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      /> */}
      <input
        type="number"
          className='form control'
        placeholder="Bet Amount"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        required
      />
      <button className='btn bg-dark text-light mx-1' type="submit">Place Bet</button>
    </form>
  );
};

export default BetForm;

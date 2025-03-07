import React from 'react';
import axios from 'axios';

const CashOutButton = ({ gameRoundId, multiplier }) => {
  const userId = 'some-user-id'; // This should be fetched from session or input

  const cashOut = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/bets/cashOut', {
        userId,
        gameRoundId,
        currentMultiplier: multiplier
      });
      alert(`Cashed out successfully! Winnings: ${response.data.winnings}`);
    } catch (err) {
      console.error('Error cashing out:', err);
      alert('Error cashing out');
    }
  };

  return <button className='btn bg-success text-light' onClick={cashOut}>Cash Out</button>;
};

export default CashOutButton;

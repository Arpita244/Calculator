// File: src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      // Prevent division by zero
      if (input.includes('/0')) {
        setInput('Error');
      } else {
        setInput(eval(input).toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };

  // Add keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        <button onClick={handleClear} className="clear">C</button>
        <button onClick={handleDelete} className="delete">DEL</button>
        <button onClick={() => handleClick('/')} className="operator">/</button>
        <button onClick={() => handleClick('*')} className="operator">*</button>

        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('-')} className="operator">-</button>

        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('+')} className="operator">+</button>

        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={handleCalculate} className="equal">=</button>

        <button onClick={() => handleClick('0')} className="zero">0</button>
        <button onClick={() => handleClick('.')}>.</button>
      </div>
    </div>
  );
};

export default App;

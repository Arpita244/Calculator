import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [memory, setMemory] = useState(null);
  const [theme, setTheme] = useState('light'); // Theme state
  const [isScientific, setIsScientific] = useState(false); // Scientific mode toggle

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
      if (input.includes('/0')) {
        setInput('Error');
      } else {
        setInput(eval(input).toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };

  const handleSquareRoot = () => {
    try {
      const value = parseFloat(input);
      if (isNaN(value) || value < 0) {
        setInput('Error');
      } else {
        setInput(Math.sqrt(value).toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };

  const handleLogarithm = () => {
    try {
      const value = parseFloat(input);
      if (value <= 0) {
        setInput('Error');
      } else {
        setInput(Math.log(value).toString()); // Natural log (ln)
      }
    } catch (error) {
      setInput('Error');
    }
  };

  const handleLogBase10 = () => {
    try {
      const value = parseFloat(input);
      if (value <= 0) {
        setInput('Error');
      } else {
        setInput(Math.log10(value).toString()); // Base 10 log
      }
    } catch (error) {
      setInput('Error');
    }
  };

  const handleFactorial = () => {
    try {
      const value = parseInt(input);
      if (value < 0) {
        setInput('Error');
      } else {
        let fact = 1;
        for (let i = 1; i <= value; i++) {
          fact *= i;
        }
        setInput(fact.toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };

  const handleMemorySave = () => {
    const value = eval(input);
    setMemory(value);
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setInput(memory.toString());
    } else {
      setInput('0');
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
  };

  const handleNegate = () => {
    setInput((-eval(input)).toString());
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleScientificMode = () => {
    setIsScientific(!isScientific);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
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
    <div className={`calculator ${theme}`}>
      <h1 className="title">Calculator App</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={toggleScientificMode}>
        {isScientific ? 'Switch to Basic' : 'Switch to Scientific'}
      </button>
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
        <button onClick={handleSquareRoot}>√</button>
        <button onClick={handleNegate}>±</button>

        {isScientific && (
          <>
            <button onClick={handleLogarithm}>ln</button>
            <button onClick={handleLogBase10}>log</button>
            <button onClick={handleFactorial}>x!</button>
          </>
        )}

        <button onClick={handleMemorySave}>M</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryClear}>MC</button>
      </div>
    </div>
  );
};

export default App;



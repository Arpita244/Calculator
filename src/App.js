import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState(() => localStorage.getItem('input') || '');
  const [memory, setMemory] = useState(() => JSON.parse(localStorage.getItem('memory')) || null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isScientific, setIsScientific] = useState(false);

  // Update local storage whenever input changes
  useEffect(() => {
    localStorage.setItem('input', input);
  }, [input]);

  // Update local storage whenever memory changes
  useEffect(() => {
    localStorage.setItem('memory', JSON.stringify(memory));
  }, [memory]);

  // Update local storage whenever theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleClick = (value) => setInput(input + value);

  const handleSin = () => {
    try {
      const value = parseFloat(input);
      setInput(Math.sin(value).toString());
    } catch {
      setInput('Error');
    }
  };

  const handleClear = () => setInput('');
  const handleDelete = () => setInput(input.slice(0, -1));

  const handleCalculate = () => {
    try {
      if (input.includes('/0')) {
        setInput('Error');
      } else {
        setInput(eval(input).toString());
      }
    } catch {
      setInput('Error');
    }
  };

  const handleSquareRoot = () => {
    try {
      const value = parseFloat(input);
      setInput(value >= 0 ? Math.sqrt(value).toString() : 'Error');
    } catch {
      setInput('Error');
    }
  };

  const handleLogarithm = () => {
    try {
      const value = parseFloat(input);
      setInput(value > 0 ? Math.log(value).toString() : 'Error');
    } catch {
      setInput('Error');
    }
  };

  const handleLogBase10 = () => {
    try {
      const value = parseFloat(input);
      setInput(value > 0 ? Math.log10(value).toString() : 'Error');
    } catch {
      setInput('Error');
    }
  };

  const handleFactorial = () => {
    try {
      const value = parseInt(input, 10);
      if (value < 0) {
        setInput('Error');
      } else {
        let fact = 1;
        for (let i = 1; i <= value; i++) fact *= i;
        setInput(fact.toString());
      }
    } catch {
      setInput('Error');
    }
  };

  const handleMemorySave = () => setMemory(eval(input));
  const handleMemoryRecall = () => setInput(memory !== null ? memory.toString() : '0');
  const handleMemoryClear = () => setMemory(null);
  const handleNegate = () => setInput((-eval(input)).toString());
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleScientificMode = () => setIsScientific(!isScientific);

  const handleSpeakResult = () => {
    const speech = new SpeechSynthesisUtterance(input || '0');
    speech.lang = 'en-US';
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
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

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('theme')) {
      setTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  return (
    <div className={`calculator ${theme}`}>
      <h1 className="title">Calculator App</h1>
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
            <button onClick={handleSin}>sin</button>
          </>
        )}
        <button onClick={handleMemorySave}>M</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryClear}>MC</button>
      </div>
      <div className="bottom-controls">
        <button onClick={toggleTheme} className="theme-toggle">
          Toggle Theme
        </button>
        <button onClick={toggleScientificMode} className="scientific-toggle">
          {isScientific ? 'Switch to Basic' : 'Switch to Scientific'}
        </button>
        <button onClick={handleSpeakResult} className="theme-toggle">
          🔊 Speak Result
        </button>
      </div>
    </div>
  );
};

export default App;

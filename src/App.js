import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State for holding the input value and memory
  const [input, setInput] = useState('');
  const [memory, setMemory] = useState(null);

  // State to handle the current theme and scientific mode
  const [theme, setTheme] = useState('light');
  const [isScientific, setIsScientific] = useState(false);

  // Function to handle button clicks with sound effect
  const playClickSound = () => {
    const audio = new Audio('click-sound.mp3');
    audio.play();
  };

  const handleClick = (value) => {
    playClickSound();
    setInput(input + value); // Add the clicked value to the input
  };

  // Function to handle the sin calculation
  const handleSin = () => {
    try {
      const value = parseFloat(input);
      setInput(Math.sin(value).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  // Clear the input
  const handleClear = () => {
    setInput('');
  };

  // Delete the last character of the input
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  // Evaluate the expression and handle errors like division by zero
  const handleCalculate = () => {
    try {
      // Prevent division by zero
      if (input.includes('/0')) {
        setInput('Error');
      } else {
        setInput(eval(input).toString());
      }
    } catch (error) {
      setInput('Error'); // Display error if there's a problem with the calculation
    }
  };

  // Handle square root calculation
  const handleSquareRoot = () => {
    try {
      const value = parseFloat(input);
      if (isNaN(value) || value < 0) {
        setInput('Error'); // Show error if input is not a valid number
      } else {
        setInput(Math.sqrt(value).toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };

  // Handle natural logarithm (ln)
  const handleLogarithm = () => {
    try {
      const value = parseFloat(input);
      if (value <= 0) {
        setInput('Error');
      } else {
        setInput(Math.log(value).toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };

  // Handle logarithm base 10
  const handleLogBase10 = () => {
    try {
      const value = parseFloat(input);
      if (value <= 0) {
        setInput('Error');
      } else {
        setInput(Math.log10(value).toString());
      }
    } catch (error) {
      setInput('Error');
    }
  };

  // Handle factorial calculation
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

  // Save current calculation result to memory
  const handleMemorySave = () => {
    const value = eval(input);
    setMemory(value);
  };

  // Recall the saved value from memory
  const handleMemoryRecall = () => {
    if (memory !== null) {
      setInput(memory.toString());
    } else {
      setInput('0');
    }
  };

  // Clear the memory
  const handleMemoryClear = () => {
    setMemory(null);
  };

  // Negate the current value (make it negative or positive)
  const handleNegate = () => {
    setInput((-eval(input)).toString());
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Toggle between basic and scientific calculator modes
  const toggleScientificMode = () => {
    setIsScientific(!isScientific);
  };

  // Listen for key press events to handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      // Allow digits and basic operators
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

  // Set the initial theme based on system preference
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDarkMode ? 'dark' : 'light');
  }, []);

  return (
    <div className={`calculator ${theme}`}>
      <h1 className="title">Calculator App</h1>
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {/* Standard Calculator Buttons */}
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

        {/* Scientific Mode Buttons */}
        {isScientific && (
          <>
            <button onClick={handleLogarithm}>ln</button>
            <button onClick={handleLogBase10}>log</button>
            <button onClick={handleFactorial}>x!</button>
            <button onClick={handleSin}>sin</button> {/* Add Sin button */}
          </>
        )}

        {/* Memory Buttons */}
        <button onClick={handleMemorySave}>M</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryClear}>MC</button>
      </div>

      {/* Theme and Mode Toggle Buttons */}
      <div className="bottom-controls">
        <button onClick={toggleTheme} className="theme-toggle">
          Toggle Theme
        </button>
        <button onClick={toggleScientificMode} className="scientific-toggle">
          {isScientific ? 'Switch to Basic' : 'Switch to Scientific'}
        </button>
      </div>
    </div>
  );
};

export default App;




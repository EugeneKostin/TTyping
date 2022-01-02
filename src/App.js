import logo from './logo.svg';
import './App.css';
import getRandomText from './services/textGenerator';
import useKeyPress from './hooks/useKeyPress';
import React, { useState, useEffect } from 'react';

function App() {
  const getCurrentTime = () => Date.now();

  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState('');
  const [incomingChars, setIncomingChars] = useState('');

  const [startTime, setStartTime] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [cpm, setCpm] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  useEffect(() => {
    (async () => {
      let text = await getRandomText();
      text = text.toString();
      setCurrentChar(text.charAt(0))
      setIncomingChars(text.slice(1))
    })();
  }, []);

  useEffect(() => {
    const cpmTimer = setInterval(() => {
      const durationInMinutes = (getCurrentTime() - startTime) / (60 * 1000);
      // console.log('chars ', charCount, 'dur: ', durationInMinutes)
      setCpm((charCount / durationInMinutes).toFixed());
    }, 1000);
    return () => clearInterval(cpmTimer);
  }, [startTime, charCount]);

  useKeyPress(key => {
    if (!startTime) {
      setStartTime(getCurrentTime());
    }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    // console.log('cur: ', currentChar)
    // console.log('inc: ', updatedIncomingChars)

    if (key === currentChar) {
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.slice(1);
      setIncomingChars(updatedIncomingChars);

      setCharCount(charCount + 1);
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(1));
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main className='App-content'>
        <h3>
          Скорость: {cpm} зн./мин | Точность: {accuracy}%
        </h3>
        <div className="generated-text">
          <span className="generated-text_out">
            {outgoingChars}
          </span>
          <span className="generated-text_cur">{currentChar}</span>
          <span>{incomingChars}</span>
        </div>
      </main>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './styles/css/App.min.css';
import getRandomText from './services/textGenerator';
import useKeyPress from './hooks/useKeyPress';
import React, { useState, useEffect } from 'react';

function App() {
  const getCurrentTime = () => Date.now();

  const [passedChars, setPassedChars] = useState('');
  const [currentChar, setCurrentChar] = useState('');
  const [isCurCharCorrect, setIsCurCharCorrect] = useState(true);
  const [incomingChars, setIncomingChars] = useState('');

  const [startTime, setStartTime] = useState(0);
  const [passedCharsCount, setPassedCharsCount] = useState(0);
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
      setCpm((passedCharsCount / durationInMinutes).toFixed());
    }, 1000);
    return () => clearInterval(cpmTimer);
  }, [startTime, passedCharsCount]);

  useKeyPress(key => {
    if (!startTime) {
      setStartTime(getCurrentTime());
    }

    let updatedOutgoingChars = passedChars;
    let updatedIncomingChars = incomingChars;
    // console.log('cur: ', currentChar)
    // console.log('inc: ', updatedIncomingChars)

    if (key === currentChar) {
      updatedOutgoingChars += currentChar;
      setPassedChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));
      setIsCurCharCorrect(true);

      updatedIncomingChars = incomingChars.slice(1);
      setIncomingChars(updatedIncomingChars);

      setPassedCharsCount(passedCharsCount + 1);
    } else {
      setIsCurCharCorrect(false);
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(1));
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className='App-header__title'>Touch Typing App</h1>
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
          Скорость: {cpm} зн./мин | Точность: {accuracy}% | 
          <button onClick={() => window.location.reload(false)} className='app-refresh-button'>Заново</button>
        </h3>
        <div className="generated-text">
          <span className="generated-text_out">
            {passedChars}
          </span>
          <span className={"generated-text_cur " + (isCurCharCorrect ? "" : "wrong")}>{currentChar}</span>
          <span>{incomingChars}</span>
        </div>
      </main>
    </div>
  );
}

export default App;

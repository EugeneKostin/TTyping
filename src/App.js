import logo from './logo.svg';
import './styles/css/App.min.css';
import getRandomText from './services/textGenerator';
import useKeyPress from './hooks/useKeyPress';
import React, { useState, useEffect } from 'react';
import Result from './components/Result';

function App() {
  const getCurrentTime = () => Date.now();

  const [passedChars, setPassedChars] = useState('');
  const [currentChar, setCurrentChar] = useState('');
  const [curCharCorrect, setCurCharCorrect] = useState(true);
  const [incomingChars, setIncomingChars] = useState('');

  const [startTime, setStartTime] = useState(0);
  const [passedCharsCount, setPassedCharsCount] = useState(0);
  const [cpm, setCpm] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  // inactive, started, loading, active, finished
  const [showResult, setShowResult] = useState(false)
  const [appActive, setAppActive] = useState(true)

  const resultProps = {
    passedChars,
    cpm,
    accuracy,
  };

  useEffect(() => {
    (async () => {
      let text = await getRandomText();
      text = text.toString();
      setCurrentChar(text.charAt(0))
      setIncomingChars(text.slice(1))
    })();
  }, []);

  useEffect(() => {
    let cpmTimer = null;
    if (appActive) {
      cpmTimer = setInterval(() => {
        const durationInMinutes = (getCurrentTime() - startTime) / (60 * 1000);
        // console.log('chars ', charCount, 'dur: ', durationInMinutes)
        setCpm((passedCharsCount / durationInMinutes).toFixed());
      }, 500);
    } else {
      // mb save in local storage data
    }
    return () => clearInterval(cpmTimer);
  }, [startTime, passedCharsCount, appActive]);

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

      if (incomingChars.length) {
        setCurrentChar(incomingChars.charAt(0));
        setCurCharCorrect(true);
        updatedIncomingChars = incomingChars.slice(1);
        // console.log(updatedIncomingChars)
        setIncomingChars(updatedIncomingChars);
      } else {
        // console.log('the last one')
        setCurrentChar('');
        setAppActive(false);
        setShowResult(true);
      }
      setPassedCharsCount(passedCharsCount + 1);
    } else {
      setCurCharCorrect(false);
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
        <button onClick={() => setShowResult(true)}>show ME</button>
        <h3>
          Скорость: {cpm} зн./мин | Точность: {accuracy}% |
          <button onClick={() => window.location.reload(false)} className='app-refresh-button'>Заново</button>
        </h3>
        <div className="generated-text">
          <span className="generated-text_out">
            {passedChars}
          </span>
          <span className={"generated-text_cur " + (curCharCorrect ? "" : "wrong")}>{currentChar}</span>
          <span>{incomingChars}</span>
        </div>
        <div>
          {showResult ? <Result resultProps={resultProps} /> : 'dont show'}
        </div>
      </main>
    </div>
  );
}

export default App;

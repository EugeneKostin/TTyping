import { logo, speed, target } from './icons';
import './styles/css/App.min.css';
import getRandomText from './services/textGenerator';
import useKeyPress from './hooks/useKeyPress';
import React, { useState, useEffect } from 'react';
import Result from './components/Result';
import GeneratedText from './components/GeneratedText';

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
  const [showResult, setShowResult] = useState(false);
  const [appActive, setAppActive] = useState(true);
  const [textLoading, setTextLoading] = useState(false);

  const resultProps = {
    passedChars,
    cpm,
    accuracy,
  };
  const textProps = {
    passedChars,
    curCharCorrect,
    currentChar,
    incomingChars,
  };

  useEffect(() => {
    (async () => {
      setTextLoading(true);
      let text = await getRandomText();
      text = text.toString();
      setCurrentChar(text.charAt(0))
      setIncomingChars(text.slice(1))
      setTextLoading(false);
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
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1 className='app-header__title'>Touch Typing App</h1>
      </header>
      <main className='app-content'>

        <div className='app-stat'>
          <div className='app-stat__container'>
            <div className='app-stat__item'>
              <img src={speed} className="app-stat__img app-stat__img_left-align" alt="speed" />
              <div className='app-stat__label'>Скорость</div>
              {cpm}
              <sup>зн./мин</sup>
            </div>
            <div className='app-stat__item'>
              <img src={target} className="app-stat__img app-stat__img_right-align" alt="accuracy" />
              <div className='app-stat__label'>Точность</div>
              {accuracy}
              <sup>%</sup>
            </div>
          </div>
          <div className='app-stat__container'>
            <button onClick={() => window.location.reload(false)} className='app-stat__button'>Заново</button>
            <button onClick={() => setShowResult(true)} className='app-stat__button'>Результат</button>
          </div>
        </div>
          {textLoading ? <div className='generated-text__loader'><img src={logo} className="app-logo app-logo_loader" alt="logo" /></div> : <GeneratedText textProps={textProps} />}
          {/* <div className='generated-text__loader'><img src={logo} className="app-logo app-logo_loader" alt="logo" /></div> */}
        {showResult ? <Result resultProps={resultProps} /> : ''}
      </main >
    </div >
  );
}

export default App;

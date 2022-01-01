import logo from './logo.svg';
import './App.css';
import getRandomText from './services/textGenerator';
import useKeyPress from './hooks/useKeyPress';
import React, { useState, useEffect } from 'react';

function App() {
  
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState('');
  const [incomingChars, setIncomingChars] = useState('');

  useEffect(() => {
    (async () => {
      let text = await getRandomText();
      text = text.toString();
      setCurrentChar(text.charAt(0))
      setIncomingChars(text.slice(1))
    })();
  },[])
  
  console.log('current: ', currentChar)

  useKeyPress(key => {
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
    }
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

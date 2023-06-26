import React, {useState, useEffect} from 'react';
import './App.css';
import pomodoro from './pomodoro.png'
import Timer from '../Timer/Timer'

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [isRunning, setIsRunning] = useState(false);


  const incrementSession = () => {
    if(sessionTime < 60){
      setSessionTime(prevState => prevState + 1);
    }
  }

  const decrementSession = () => {
    if(sessionTime > 1){
      setSessionTime(prevState => prevState - 1);
    }
  }

  const incrementBreak = () => {
    if(breakTime < 60){
      setBreakTime(prevState => prevState + 1);
    }
  }

  const decrementBreak = () => {
    if(breakTime > 1){
      setBreakTime(prevState => prevState - 1);
    }
  }

  const disableButtons = value => {
    setIsRunning(value);
  }

  const reset = () => {
    setSessionTime(25);
    setBreakTime(5);
  }

  const checkInput = (time) => {
    /*DISCLAIMER: This function is only needed because there is a problem in the FCC tests 
    that input negative time, due to a duplicated line of code. This sanitize the input.
    */
    return time < 1 ? 1 : time;
  }


  return (
    <div className="App">
      <img src={pomodoro}></img>
      <div id="timer ">
        <Timer 
          sessionTime={checkInput(sessionTime)}
          breakTime={checkInput(breakTime)}
          disableButtons={disableButtons}
          reset={reset}
        />
      </div>
      <div className='controls'>
        <div id="session">
          <p id='session-label'>Session Length</p>
          <p id="session-length">{sessionTime}</p>
          <div className="controls">
            <button id="session-increment" onClick={incrementSession} disabled={isRunning}>
              <span className="material-symbols-rounded">add</span>
            </button>
            <button id="session-decrement" onClick={decrementSession} disabled={isRunning}>
              <span className="material-symbols-rounded">remove</span>
            </button>
          </div>
        </div>
        <div id="break">
          <p id='break-label'>Break Length</p>
          <p id="break-length">{breakTime}</p>
          <div className="controls">
            <button id="break-increment" onClick={incrementBreak} disabled={isRunning}>
              <span className="material-symbols-rounded">add</span>
            </button>
            <button id="break-decrement" onClick={decrementBreak} disabled={isRunning}>
              <span className="material-symbols-rounded">remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

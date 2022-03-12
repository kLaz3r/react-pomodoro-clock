import React, { useState, useEffect } from 'react';
import beep from '../../assets/sounds/beep.wav';

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(sessionLength);
  const [timerStarted, setTimerStarted] = useState(false);
  const [session, setSession] = useState('Session');
  const tick = () => {
    console.log('tick');
    if (session === 'Session') {
      sessionTick();
    } else {
      breakTick();
    }
  };
  const changeSession = (session) => {
    setTimerStarted(false);
    const beep = document.getElementById('beep');
    beep.play();
    if (session === 'Session') {
      setMinutes(sessionLength);
      setSeconds(0);
      setSession('Session');
      setTimerStarted(true);
    } else if (session === 'Break') {
      setMinutes(breakLength);
      setSeconds(0);
      setSession('Break');
      setTimerStarted(true);
    }
  };
  const sessionTick = () => {
    const beep = document.getElementById('beep');

    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(60);
        setMinutes(minutes - 1);
      } else {
        changeSession('Break');
        beep.play();
      }
    } else {
      setSeconds(seconds - 1);
    }
  };
  const breakTick = () => {
    const beep = document.getElementById('beep');
    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(60);
        setMinutes(minutes - 1);
      } else {
        changeSession('Session');
        beep.play();
      }
    } else {
      setSeconds(seconds - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const beep = document.getElementById('beep');
      if (timerStarted) {
        tick();
        if (minutes === 0) {
          beep.play();
        }
      } else {
        console.log('rick');
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [tick]);
  const startStop = () => {
    setTimerStarted(!timerStarted);
  };
  const timerReset = () => {
    const beep = document.getElementById('beep');
    beep.pause();
    beep.load();
    setTimerStarted(false);
    setBreakLength(5);
    setSessionLength(25);
    setMinutes(25);
    setSeconds(0);
    setSession('Session');
  };

  const buttonPressed = (e) => {
    switch (e.target.id) {
      case 'session-increment':
        if (sessionLength < 60) {
          setSessionLength(sessionLength + 1);
          setMinutes(sessionLength + 1);
        }
        break;
      case 'session-decrement':
        if (sessionLength >= 2) {
          setSessionLength(sessionLength - 1);
          setMinutes(sessionLength - 1);
        }

        break;
      case 'break-increment':
        if (breakLength < 60) {
          setBreakLength(breakLength + 1);
        }
        break;
      case 'break-decrement':
        if (breakLength >= 2) {
          setBreakLength(breakLength - 1);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className='Clock'>
      <h1>Pomodoro Timer</h1>
      <div className='Controls'>
        <div>
          <h3 id='session-label'>Session Length</h3>
          <button onClick={buttonPressed} id='session-increment'>
            +
          </button>
          <p id='session-length'>{sessionLength}</p>
          <button onClick={buttonPressed} id='session-decrement'>
            -
          </button>
        </div>
        <div>
          <h3 id='break-label'>Break Length</h3>
          <button onClick={buttonPressed} id='break-increment'>
            +
          </button>
          <p id='break-length'>{breakLength}</p>
          <button onClick={buttonPressed} id='break-decrement'>
            -
          </button>
        </div>
      </div>
      <div className='ClockDisplay'>
        <h2 id='timer-label'>{session}</h2>
        <p id='time-left'>
          <span>{('0' + minutes).slice(-2)}</span>:
          <span>{('0' + seconds).slice(-2)}</span>
        </p>
      </div>
      <button id='start_stop' onClick={startStop} className='buttons'>
        Start/Stop
      </button>
      <button id='reset' onClick={timerReset} className='buttons'>
        Reset
      </button>
      <audio id='beep' src={beep}></audio>
    </div>
  );
};

export default Clock;

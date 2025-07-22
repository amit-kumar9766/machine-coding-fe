import React, { useState, useRef, useEffect } from 'react';
import './style.css';

export default function StopWatch() {
  const [sec, setSec] = useState(0);
  const [started, setStarted] = useState(false);
  let timerRef = useRef(null);

  const handleStartStop = () => {
    if (!started) {
      setStarted(true);
      timerRef.current = setInterval(() => {
        setSec((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef?.current);
      setStarted(false);
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <>
      <div>Seconds {sec % 60}</div>
      <div>Minutes {parseInt(sec / 60) % 60}</div>
      <div>Hours {parseInt(sec / 3600)}</div>
      <button onClick={handleStartStop}> {!started ? 'Start' : 'Stop'}</button>
      <button
        onClick={() => {
          setSec(0);
          clearInterval(timerRef?.current);
          setStarted(false);
        }}
      >
        Reset{' '}
      </button>
    </>
  );
}

// 3700 -> 3700 % 3600 / 100 % 60
